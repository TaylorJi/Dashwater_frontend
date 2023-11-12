import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Flex,
    Button
} from '@chakra-ui/react';
import { toast } from 'react-hot-toast';
import colors from '../../../../theme/foundations/colours';

import { buoySensorTags } from '../../../../theme/metrics/buoySensorTags';
import ThresholdSettingsRow from './ThresholdSettingsRow';
import ManageDevices from '../../../../api/ManageDevices/ManageDevices';
import { defaultThresholds } from '../../../wrappers/DeviceDetailsWrapper/deviceManagerAtoms';
import { userDataAtom } from '../../../dashboard/atoms/globalDashboardAtoms';
import uuid from 'react-uuid';

type thresholdSettingsPanelProps = {
    buoy: deviceSettingsType;
}


const ThresholdSettingsPanel: React.FC<thresholdSettingsPanelProps> = ({ buoy }) => {
    const userData = useRecoilValue(userDataAtom);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const defaultMetricThresholds = useRecoilValue<defaultThresholdType[]>(defaultThresholds);
    const [updatedThresholds, setUpdatedThresholds] = useState<updatedThresholdType[]>([]);
    const [userThresholds, setUserThresholds] = useState<userThresholdType[] | null>(null);

    const getAlertStatus = (sensorId: number) => {
        if (userThresholds) {
            const userThreshold = userThresholds.find(threshold => threshold.sensorId === sensorId);
            if (!userThreshold) {
                return false;
            }
            return userThreshold.alert;
        }
        return false;
    }

    const getPowerStatus = (sensorId: number) => {
        if (userThresholds) {
            const userThreshold = userThresholds.find(threshold => threshold.sensorId === sensorId);
            if (!userThreshold) {
                return false;
            }
            return userThreshold.power; // Make sure this is power, not alert
        }
        return false;
    }

    const saveThresholdSettings = async () => {
        if (!updatedThresholds.length) {
            return toast("There are no new changes to save.", { icon: '🤔' })
        }
        try {
            setIsLoading(true);
            const deviceSettings: deviceSettingsType = {
                id: buoy.id,
                name: buoy.name,
                description: buoy.description,
                locationX: buoy.locationX,
                locationY: buoy.locationY,
                active: buoy.active,
                sensors: buoy.sensors.map(sensor => ({
                    id: sensor.id,
                    deviceId: sensor.deviceId,
                    lastCalibrationDate: sensor.lastCalibrationDate,
                    metric: sensor.metric,
                    defaultUnit: sensor.defaultUnit,
                    alerts: getAlertStatus(sensor.id),
                    power: getPowerStatus(sensor.id),
                    minVal: sensor.minVal,
                    maxVal: sensor.maxVal,
                    physicalValues: sensor.physicalValues,
                    calibratedValues: sensor.calibratedValues
                })),
                sensor_ids: buoy.sensors.map(sensor => sensor.id) // Assuming buoy.sensors contains all sensors
            };
            const response = await ManageDevices.saveDeviceSettings(deviceSettings);
            if (response) {
                toast.success('Threshold settings saved!');
                setUpdatedThresholds([]);
                fetchUserThresholds();
            } else {
                toast.error('There was a problem saving your device threshold settings. Please try again.');
            }
        } catch (_err) {
            toast.error('There was a problem saving your device threshold settings. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUserThresholds = async () => {
        const userThresholds = await ManageDevices.getUserThresholdsByDevice(userData?.userId, buoy.id);
        setUserThresholds(userThresholds);
    };



    useEffect(() => {
        fetchUserThresholds();
    }, []);

    return (
        <>
            {
                userThresholds &&
                <>
                    <Table>

                        <Thead>
                            <Tr>
                                <Th color={colors.main.usafaBlue}>Metric</Th>
                                <Th color={colors.main.usafaBlue}>Min</Th>
                                <Th color={colors.main.usafaBlue}>Max</Th>
                                <Th color={colors.main.usafaBlue}>Unit</Th>
                                <Th color={colors.main.usafaBlue}>Alert</Th>
                                <Th color={colors.main.usafaBlue}>Power</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                buoy.sensors.map((sensor => {
                                    console.log(sensor);
                                    return (
                                        <ThresholdSettingsRow
                                            key={uuid()}
                                            sensorId={sensor.id}
                                            deviceId={buoy.id}
                                            metric={buoySensorTags[sensor.metric].label}
                                            // minVal={getThresholdMin(sensor.id, sensor.metric)}
                                            // maxVal={getThresholdMax(sensor.id, sensor.metric)}
                                            minVal={sensor.minVal}
                                            maxVal={sensor.maxVal}
                                            alert={getAlertStatus(sensor.id)}
                                            power={getPowerStatus(sensor.id)}
                                            defaultUnit={sensor.defaultUnit}
                                            setUpdatedThresholds={setUpdatedThresholds}
                                            updatedThresholds={updatedThresholds}
                                        />
                                    );
                                }))
                            }
                        </Tbody>
                    </Table>
                    <Flex
                        mt='2rem'
                        justifyContent='flex-end'
                    >
                        <Button
                            bg={colors.main.usafaBlue}
                            color='white'
                            isLoading={isLoading}
                            loadingText='Saving'
                            onClick={saveThresholdSettings}
                            _hover={{
                                bg: colors.main.ceruBlue
                            }}
                        >
                            Save Thresholds
                        </Button>
                    </Flex>
                </>
            }
        </>
    );
}

export default ThresholdSettingsPanel;