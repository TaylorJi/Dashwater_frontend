import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
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
import { userDataAtom } from '../../../dashboard/atoms/globalDashboardAtoms';
import { allDevicesDetails } from "../../../wrappers/DeviceDetailsWrapper/deviceManagerAtoms";
import uuid from 'react-uuid';

type thresholdSettingsPanelProps = {
    buoy: deviceSettingsType;
}


const ThresholdSettingsPanel: React.FC<thresholdSettingsPanelProps> = ({ buoy }) => {
    // const userData = useRecoilValue(userDataAtom);

    const [deviceSettings, setDevicesSettings] = useState<deviceSettingsType>({} as deviceSettingsType);
    const [allDevicesAtomContent, setAllDevicsAtomContent] = useRecoilState<deviceSettingsType[]>(allDevicesDetails);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [updatedThresholds, setUpdatedThresholds] = useState<updatedThresholdType[]>([]);
    // const [userThresholds, setUserThresholds] = useState<userThresholdType[] | null>(null);

    // const getAlertStatus = (sensorId: number) => {
    //     if (userThresholds) {
    //         const userThreshold = userThresholds.find(threshold => threshold.sensorId === sensorId);
    //         if (!userThreshold) {
    //             return false;
    //         }
    //         return userThreshold.alerts;
    //     }
    //     return false;
    // }

    // const getPowerStatus = (sensorId: number) => {
    //     if (userThresholds) {
    //         const userThreshold = userThresholds.find(threshold => threshold.sensorId === sensorId);
    //         if (!userThreshold) {
    //             return false;
    //         }
    //         return userThreshold.power; // Make sure this is power, not alert
    //     }
    //     return false;
    // }

    useEffect(() => {
        setDevicesSettings(buoy)
    }, [buoy]);


    const saveThresholdSettings = async () => {
        setIsLoading(true);
    
        // Create an array of updated sensors
        const updatedSensors = deviceSettings.sensors.map(sensor => {
            const updatedSensor = updatedThresholds.find(updated => updated.sensorId === sensor.id);
            if (updatedSensor) {
                // If an updated threshold exists for this sensor, merge its properties into the sensor object
                return { ...sensor, ...updatedSensor };
            }
            // If no updated threshold exists for this sensor, use the sensor object as is
            return sensor;
        });
    
        const deviceSettingsWithSensorIds = {
            ...deviceSettings,
            sensors: updatedSensors, // Use the array of updated sensors
            sensor_ids: updatedSensors.map(sensor => sensor.id) // Take the ids from the updated sensors
        };
    
        const response = await ManageDevices.saveDeviceSettings(deviceSettingsWithSensorIds);
        if (response) {
            toast.success("Device settings saved!");
            const i = allDevicesAtomContent.findIndex(element => element.id === buoy.id);
            const devicesArray = [...allDevicesAtomContent];
            devicesArray[i] = { ...allDevicesAtomContent[i], ...deviceSettingsWithSensorIds };
            setAllDevicsAtomContent(devicesArray);
        } else {
            toast.error("There was a problem saving your device settings. Please try again.");
        }
        setIsLoading(false);
    };

    // const fetchUserThresholds = async () => {
    //     const userThresholds = await ManageDevices.getUserThresholdsByDevice(userData?.userId, buoy.id);
    //     setUserThresholds(userThresholds);
    // };

    // useEffect(() => {
    //     fetchUserThresholds();
    // }, []);

    return (
        <>
            {
                // userThresholds &&
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
                                            minVal={sensor.minVal}
                                            maxVal={sensor.maxVal}
                                            alerts={sensor.alerts}
                                            power={sensor.power}
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
                            Save Threshsolds
                        </Button>
                    </Flex>
                </>
            }
        </>
    );
}

export default ThresholdSettingsPanel;