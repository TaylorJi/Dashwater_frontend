import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
    Tr,
    Td,
    NumberInput,
    NumberInputField,
    Switch,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
} from '@chakra-ui/react';
import { userDataAtom } from '../../../dashboard/atoms/globalDashboardAtoms';

type thresholdSettingRowProps = {
    deviceId: number;
    sensorId: number;
    metric: string;
    minVal: number;
    maxVal: number;
    alert: boolean;
    power: boolean;
    defaultUnit: string;
    setUpdatedThresholds: React.Dispatch<React.SetStateAction<updatedThresholdType[]>>
    updatedThresholds: updatedThresholdType[]
}

const ThresholdSettingsRow: React.FC<thresholdSettingRowProps> = (props) => {
    const {
        deviceId,
        sensorId,
        metric,
        minVal,
        maxVal,
        defaultUnit,
        alert,
        power,
        setUpdatedThresholds,
        updatedThresholds } = props

    const userId = useRecoilValue(userDataAtom)?.userId
    const [thresholdSettings, setThresholdSettings] = useState<updatedThresholdType>({
        userId: userId,
        sensorId: sensorId,
        deviceId: deviceId,
        minVal: minVal,
        maxVal: maxVal,
        alert: alert,
        power: power
    });

    const setMinVal = (newValue: number) => {
        setThresholdSettings({ ...thresholdSettings, 'minVal': newValue });
        const i = updatedThresholds.findIndex(element => element.sensorId === thresholdSettings.sensorId);
        const newThresholds = updatedThresholds;
        if (i > -1) {
            newThresholds[i] = thresholdSettings;
        } else {
            newThresholds.push(thresholdSettings);
        }
        setUpdatedThresholds(newThresholds);
    };

    const setMaxVal = (newValue: number) => {
        setThresholdSettings({ ...thresholdSettings, 'maxVal': newValue });
        const i = updatedThresholds.findIndex(element => element.sensorId === thresholdSettings.sensorId);
        const newThresholds = updatedThresholds;
        if (i > -1) {
            newThresholds[i] = thresholdSettings;
        } else {
            newThresholds.push(thresholdSettings);
        }
        setUpdatedThresholds(newThresholds);
    };

    const setAlert = (newValue: boolean) => {
        setThresholdSettings({ ...thresholdSettings, 'alert': newValue });
        const i = updatedThresholds.findIndex(element => element.sensorId === thresholdSettings.sensorId);
        const newThresholds = updatedThresholds;
        if (i > -1) {
            newThresholds[i] = {
                ...thresholdSettings,
                alert: newValue
            };
        } else {
            newThresholds.push({
                ...thresholdSettings,
                alert: newValue
            });
        }
        setUpdatedThresholds(newThresholds);
    };

    const setPower = (newValue: boolean) => {
        setThresholdSettings({ ...thresholdSettings, 'power': newValue });
        const i = updatedThresholds.findIndex(element => element.sensorId === thresholdSettings.sensorId);
        const newThresholds = updatedThresholds;
        if (i > -1) {
            newThresholds[i] = {
                ...thresholdSettings,
                power: newValue
            };
        } else {
            newThresholds.push({
                ...thresholdSettings,
                power: newValue
            });
        }
        setUpdatedThresholds(newThresholds);
    };
    





    return (
        <Tr rowGap={0.25}>
            <Td>{metric}</Td>
            <Td>
                <NumberInput
                    precision={2}
                    step={0.01}
                    value={thresholdSettings.minVal}
                    onChange={i => setMinVal(+i)}
                    onBlur={i => {
                        if (i.target.value === "") {
                            setMinVal(+i)
                        }
                    }}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Td>
            <Td>
                <NumberInput
                    precision={2}
                    step={0.01}
                    value={thresholdSettings.maxVal}
                    onChange={i => { setMaxVal(+i) }}
                    onBlur={i => {
                        if (i.target.value === "") {
                            setMaxVal(+i)
                        }
                    }}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Td>
            <Td>
                {defaultUnit}
            </Td>
            <Td>
                <Switch
                    aria-label='Metric alert state'
                    isChecked={thresholdSettings.alert}
                    onChange={i => { setAlert(i.target.checked) }}
                />
            </Td>
            <Td>
                <Switch
                    aria-label='Power status'
                    isChecked={thresholdSettings.power} // Changed this to thresholdSettings.power
                    onChange={i => { setPower(i.target.checked) }}
                />
            </Td>
        </Tr>
    );
};

export default ThresholdSettingsRow;