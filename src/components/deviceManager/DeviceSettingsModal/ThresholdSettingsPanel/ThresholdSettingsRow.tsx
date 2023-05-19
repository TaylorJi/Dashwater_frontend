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
    key: number;
    deviceId: number;
    metric: string;
    minVal: number;
    maxVal: number;
    alert: boolean;
    defaultUnit: string;
    setUpdatedThresholds: React.Dispatch<React.SetStateAction<updatedThresholdType[]>>
}

const ThresholdSettingsRow: React.FC<thresholdSettingRowProps> = ({ key, deviceId, metric, minVal, maxVal, defaultUnit, alert, setUpdatedThresholds }) => {
    const userId = useRecoilValue(userDataAtom)?.userId
    const [thresholdSettings, setThresholdSettings] = useState({
        userId: userId,
        sensorId: key,
        deviceId: deviceId,
        minVal: minVal,
        maxVal: maxVal,
        alert: alert,
    })

    return (
        <Tr rowGap={0.25}>
            <Td>{metric}</Td>
            <Td>
                <NumberInput
                    value={thresholdSettings.minVal}
                    onChange={i => {
                            setThresholdSettings({ ...thresholdSettings, 'minVal': +i });
                       }}
                >
                    <NumberInputField />
                </NumberInput>
            </Td>
            <Td>
                <NumberInput
                    value={thresholdSettings.maxVal}
                    onChange={i => {
                            setThresholdSettings({ ...thresholdSettings, 'maxVal': +i });
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
                    onChange={_e => {
                        setThresholdSettings({ ...thresholdSettings, 'alert': !thresholdSettings.alert });
                    }}
                />
            </Td>
        </Tr>
    );
};

export default ThresholdSettingsRow;