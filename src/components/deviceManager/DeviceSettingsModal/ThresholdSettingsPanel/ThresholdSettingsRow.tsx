import React, { useState } from 'react';
import colors from '../../../../theme/foundations/colours';
import { Tr, Td, NumberInput, Switch } from '@chakra-ui/react';

type thresholdSettingRowProps = {
    metric: string;
    metricSensor: metricSettingsType;
}

const ThresholdSettingsRow: React.FC<thresholdSettingRowProps> = ({ metric, metricSensor }) => {
    const [isAvailable, setIsAvailable] = useState(metricSensor.available);
    const [isAlert, setIsAlert] = useState(metricSensor.alert);

    return (
        <Tr>
            <Td>{metric}</Td>
            <Td>
                <NumberInput></NumberInput>
            </Td>
            <Td>

            </Td>
            <Td>
                <Switch
                    aria-label='Metric availability'
                    color={colors.main.acidGreen}
                    isChecked={isAvailable}
                    onChange={ _e => {
                        setIsAvailable(!isAvailable);
                    }
                    }
                />
            </Td>
            <Td>
                <Switch
                    aria-label='Metric alert state'
                    isChecked={isAlert}
                    isDisabled={!isAvailable}
                    onChange={ _e => {
                        setIsAlert(!isAlert);
                    }}
                />
            </Td>
        </Tr>
    );
};

export default ThresholdSettingsRow;