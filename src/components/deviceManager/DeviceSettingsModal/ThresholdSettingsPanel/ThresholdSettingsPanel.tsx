import React from 'react';
import { Table, Thead, Tbody, Tr, Th } from '@chakra-ui/react';
import { buoySensorTags } from '../../../../theme/metrics/buoySensorTags';
import ThresholdSettingsRow from './ThresholdSettingsRow';


type thresholdSettingsPanelProps = {
    sensors: {
        [key: string]: metricSettingsType;
    }
}


const ThresholdSettingsPanel: React.FC<thresholdSettingsPanelProps> = ({ sensors }) => {
    return (
        <Table>

            <Thead>
                <Tr>
                    <Th>Metric</Th>
                    <Th>Min</Th>
                    <Th>Max</Th>
                    <Th>Available</Th>
                    <Th>Alert</Th>
                </Tr>
            </Thead>
            <Tbody>
                { 
                    Object.keys(sensors).map((metricSensor => {
                        return(
                            <ThresholdSettingsRow 
                                metric={buoySensorTags[metricSensor].label}
                                metricSensor={sensors[metricSensor]}
                                />
                        );
                    }))
                }
            </Tbody>

        </Table>
    );
}

export default ThresholdSettingsPanel;