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
import LoadingGraphic from '../../../layout/LoadingGraphic';

type thresholdSettingsPanelProps = {
    buoy: deviceSettingsType;
}


const ThresholdSettingsPanel: React.FC<thresholdSettingsPanelProps> = ({ buoy }) => {
    const userData = useRecoilValue(userDataAtom);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const defaultMetricThresholds = useRecoilValue<defaultThresholdType[]>(defaultThresholds);
    const [updatedThresholds, setUpdatedThresholds] = useState<updatedThresholdType[]>([]);
    const [userThresholds, setUserThresholds] = useState<userThresholdType[] | null>(null);

    const getThresholdMin = (sensorId: number, metric: string) => {
        if (userThresholds) {
            const userThreshold = userThresholds.find(threshold => threshold.sensorId === sensorId);
            if (!userThreshold) {
                const defaultThreshold = defaultMetricThresholds.find(threshold => threshold.metric === metric);
                if (!defaultThreshold) {
                    return 0;
                }
                return defaultThreshold.defaultMin;
            }
            return userThreshold.minVal;
        }
        return 0;
    }

    const getThresholdMax = (sensorId: number, metric: string) => {
        if (userThresholds) {
            const userThreshold = userThresholds.find(threshold => threshold.sensorId === sensorId);
            if (!userThreshold) {
                const defaultThreshold = defaultMetricThresholds.find(threshold => threshold.metric === metric);
                if (!defaultThreshold) {
                    return 0;
                }
                return defaultThreshold.defaultMax;
            }
            return userThreshold.maxVal;
        }
        return 0;
    }

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

    const saveThresholdSettings = async () => {
        try {
            setIsLoading(true);
            const res = await ManageDevices.saveThresholdSettings();
            if (res) {
                toast.success('Threshold settings saved!');
            } else {
                toast.error('There was a problem saving your device threshold settings. Please try again.')
            }
        } catch (_err) {
            toast.error('Trouble saving thresholds, please try again.')
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
                userThresholds ?
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
                    :
                    <LoadingGraphic/>
            }

        </>
    );
}

export default ThresholdSettingsPanel;