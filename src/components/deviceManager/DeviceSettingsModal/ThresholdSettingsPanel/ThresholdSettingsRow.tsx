import React, { useState } from 'react';
import colors from '../../../../theme/foundations/colours';
import { Tr, Td, NumberInput, NumberInputField, Switch } from '@chakra-ui/react';

type thresholdSettingRowProps = {
    metric: string;
    metricSensor: sensorType;
}

const ThresholdSettingsRow: React.FC<thresholdSettingRowProps> = ({ metric, metricSensor }) => {
    const [isAlert, setIsAlert] = useState<boolean>(metricSensor.alert);
    const [metricMin, setMetricMin] = useState<number | string>(metricSensor.min);
    const [metricMax, setMetricMax] = useState<number | string>(metricSensor.max);

    return (
        <Tr rowGap={0.25}>
            <Td>{metric}</Td>
            <Td>
                <NumberInput
                    value={metricMin}
                    onChange={i => {
                        if (i === '-') {
                            setMetricMin('-');
                        }
                        if (i === '') {
                            setMetricMin('');
                        }
                        let newMin = parseInt(i);
                        if (!isNaN(newMin))
                            setMetricMin(newMin);
                    }}
                >
                    <NumberInputField />
                </NumberInput>
            </Td>
            <Td>
                <NumberInput
                    value={metricMax}
                    onChange={i => {
                        if (i === '-') {
                            setMetricMax('-');
                        }
                        if (i === '') {
                            setMetricMax('');
                        }
                        let newMax = parseInt(i);
                        if (!isNaN(newMax))
                            setMetricMax(newMax);
                    }}
                >
                    <NumberInputField />
                </NumberInput>
            </Td>
            <Td>
                {metricSensor.default_metric_unit}
            </Td>
            <Td>
                <Switch
                    aria-label='Metric alert state'
                    isChecked={isAlert}
                    onChange={_e => {
                        setIsAlert(!isAlert);
                    }}
                />
            </Td>
        </Tr>
    );
};

export default ThresholdSettingsRow;