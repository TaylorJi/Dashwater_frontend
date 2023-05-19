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
import uuid from 'react-uuid';
import { toast } from 'react-hot-toast';
import colors from '../../../../theme/foundations/colours';

import { buoySensorTags } from '../../../../theme/metrics/buoySensorTags';
import ThresholdSettingsRow from './ThresholdSettingsRow';
import ManageDevices from '../../../../api/ManageDevices/ManageDevices';
import { defaultThresholds } from '../../../wrappers/DeviceDetailsWrapper/deviceManagerAtoms';
import { userDataAtom } from '../../../dashboard/atoms/globalDashboardAtoms';

type thresholdSettingsPanelProps = {
    buoy: deviceSettingsType;
}


const ThresholdSettingsPanel: React.FC<thresholdSettingsPanelProps> = ({ buoy }) => {
    const userData = useRecoilValue(userDataAtom);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const defaultMetricThresholds = useRecoilValue<defaultThresholdType[]>(defaultThresholds);
    const [updatedThresholds, setUpdatedThresholds] = useState<updatedThresholdType[]>([]);
    const [userThresholds, setUserThresholds] = useState<userThresholdType[]>([]);

    const getThresholdMin = (sensorId: number, metric: string) => {
        const userThreshold = userThresholds.find(threshold => threshold.sensorId === sensorId);
        const defaultThreshold = defaultMetricThresholds.find(threshold => threshold.metric === metric);
        return userThreshold ? userThreshold.minVal : defaultThreshold? defaultThreshold.defaultMin : 0;
    }

    const getThresholdMax = (sensorId: number, metric: string) => {
        const userThreshold = userThresholds.find(threshold => threshold.sensorId === sensorId);
        const defaultThreshold = defaultMetricThresholds.find(threshold => threshold.metric === metric);
        return userThreshold ? userThreshold.maxVal : defaultThreshold? defaultThreshold.defaultMax : 0;
    }

    const getAlertStatus = (sensorId: number) => {
        const userThreshold = userThresholds.find(threshold => threshold.sensorId === sensorId);
        return userThreshold? userThreshold.alert : false;
    }

    const saveThresholdSettings = async () => {
        setIsLoading(true);
        const res = await ManageDevices.saveThresholdSettings();
        if (res) {
            toast.success('Threshold settings saved!');
        } else {
            toast.error('There was a problem saving your device threshold settings. Please try again.')
        }
        setIsLoading(false);
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
            <Table>

                <Thead>
                    <Tr>
                        <Th color={colors.main.usafaBlue}>Metric</Th>
                        <Th color={colors.main.usafaBlue}>Min</Th>
                        <Th color={colors.main.usafaBlue}>Max</Th>
                        <Th color={colors.main.usafaBlue}>Unit</Th>
                        <Th color={colors.main.usafaBlue}>Alert</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        buoy.sensors.map((sensor => {
                            return (
                                <ThresholdSettingsRow
                                    key={sensor.id}
                                    deviceId={buoy.id}
                                    metric={buoySensorTags[sensor.metric].label}
                                    minVal={getThresholdMin(sensor.id, sensor.metric)}
                                    maxVal={getThresholdMax(sensor.id, sensor.metric)}
                                    alert={getAlertStatus(sensor.id)}
                                    defaultUnit={sensor.defaultUnit}
                                    setUpdatedThresholds={setUpdatedThresholds}
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
                    onClick={async () => await saveThresholdSettings()}
                    _hover={{
                        bg: colors.main.ceruBlue
                    }}
                    loadingText='Saving'
                >
                    Save Thresholds
                </Button>
            </Flex>
        </>
    );
}

export default ThresholdSettingsPanel;