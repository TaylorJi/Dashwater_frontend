import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
    Tr,
    Td,
    NumberInput,
    NumberInputField,
    Switch
} from '@chakra-ui/react';
import { userDataAtom } from '../../../dashboard/atoms/globalDashboardAtoms';

type thresholdSettingRowProps = {
    deviceId: number;
    sensorId: number;
    metric: string;
    minVal: number;
    maxVal: number;
    alert: boolean;
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

    const setAlert = () => {
        setThresholdSettings({ ...thresholdSettings, 'alert': !thresholdSettings.alert });
        const i = updatedThresholds.findIndex(element => element.sensorId === thresholdSettings.sensorId);
        const newThresholds = updatedThresholds;
        if (i > -1) {
            newThresholds[i] = thresholdSettings;
        } else {
            newThresholds.push(thresholdSettings);
        }
        setUpdatedThresholds(newThresholds);
    }

    return (
        <Tr rowGap={0.25}>
            <Td>{metric}</Td>
            <Td>
                <NumberInput
                    value={thresholdSettings.minVal}
                    onChange={i => {
                            setMinVal(+i);
                       }}
                >
                    <NumberInputField />
                </NumberInput>
            </Td>
            <Td>
                <NumberInput
                    value={thresholdSettings.maxVal}
                    onChange={i => {
                            setMaxVal(+i);
                    }}
                >
                    <NumberInputField />
                </NumberInput>
            </Td>
            <Td>
                {defaultUnit}
            </Td>
            <Td>
                <Switch
                    aria-label='Metric alert state'
                    isChecked={thresholdSettings.alert}
                    onChange={setAlert}
                />
            </Td>
        </Tr>
    );
};

export default ThresholdSettingsRow;