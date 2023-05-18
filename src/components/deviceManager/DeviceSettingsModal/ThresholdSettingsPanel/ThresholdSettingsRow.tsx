import React, { useState } from 'react';
import { Tr, Td, NumberInput, NumberInputField, Switch } from '@chakra-ui/react';

type thresholdSettingRowProps = {
    metric: string;
    metricSensor: sensorType;
}

const ThresholdSettingsRow: React.FC<thresholdSettingRowProps> = ({ metric, metricSensor }) => {
    const [isAlert, setIsAlert] = useState<boolean>(true);
    const [metricMin, setMetricMin] = useState<number | string>(metricSensor.minVal);
    const [metricMax, setMetricMax] = useState<number | string>(metricSensor.maxVal);

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
                {metricSensor.defaultUnit}
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