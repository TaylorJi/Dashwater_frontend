import React, { useState } from 'react';
import colors from '../../../../theme/foundations/colours';
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
import { buoySensorTags } from '../../../../theme/metrics/buoySensorTags';
import ThresholdSettingsRow from './ThresholdSettingsRow';
import ManageDevices from '../../../../api/ManageDevices/ManageDevices';


type thresholdSettingsPanelProps = {
    sensors: sensorType[];
    units: buoySettingsUnitsType;
}


const ThresholdSettingsPanel: React.FC<thresholdSettingsPanelProps> = ({ sensors, units }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

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

    return (
        <>
            <Table>

                <Thead>
                    <Tr>
                        <Th>Metric</Th>
                        <Th>Min</Th>
                        <Th>Max</Th>
                        <Th>Unit</Th>
                        <Th>Alert</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        sensors.map((sensor => {
                            return (
                                <ThresholdSettingsRow
                                    metric={buoySensorTags[sensor.metric_type].label}
                                    metricSensor={sensor}
                                    units={units}
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