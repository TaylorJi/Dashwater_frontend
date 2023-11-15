import React, { useEffect, useState } from 'react';
import {
    Text,
    Select,
    Divider,
} from '@chakra-ui/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import colors from '../../../../theme/foundations/colours';
import { buoySensorTags } from '../../../../theme/metrics/buoySensorTags';
import uuid from 'react-uuid';
import CalibrationTable from './CalibrationTable';
import { calibrationPoints } from '../../../wrappers/DeviceDetailsWrapper/deviceManagerAtoms';
import ManageDevices from '../../../../api/ManageDevices/ManageDevices';
import { userDataAtom } from '../../../dashboard/atoms/globalDashboardAtoms';

type calibrationSettingsPanelProps = {
    sensors: sensorType[];
}

const CalibrationSettingsPanel: React.FC<calibrationSettingsPanelProps> = ({ sensors }) => {
    const userData = useRecoilValue(userDataAtom);
    const [currentMetric, setCurrentMetric] = useState<string>("");
    const [currentSensor, setCurrentSensor] = useState<sensorType>({} as sensorType);
    const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
    const [allCalibrationPoints, setAllCalibrationPoints] = useRecoilState(calibrationPoints);

    const fetchCalibrationPoints = async () => {
        if (userData?.userId) {
            const devicesSettings = await ManageDevices.getDevicesSettings();
            if (devicesSettings) {
                const calibrationPoints = devicesSettings.find((setting: { deviceId: number; }) => setting.deviceId === sensors[0].deviceId).calibrationPoints;
                setAllCalibrationPoints(calibrationPoints);
            }
        }
    };

    useEffect(() => {
        fetchCalibrationPoints();
    }, [sensors]);

    const saveChanges = async () => {
        if (unsavedChanges) {
            const newSettings: deviceSettingsType = {
                id: currentSensor.deviceId,
                name: '',
                description: '',
                locationX: 0,
                locationY: 0,
                active: true,
                sensors: sensors.map(sensor =>
                    sensor.id === currentSensor.id ?
                        { ...sensor, calibratedValues: allCalibrationPoints[currentSensor.id] } :
                        sensor
                ),
                sensor_ids: sensors.map(sensor => sensor.id)
            };
            const saveStatus = await ManageDevices.saveDeviceSettings(newSettings);
            if (saveStatus) {
                setUnsavedChanges(false);
            }
        }
    };


    return (
        <>
            <Text fontWeight='semibold' mb={1}>
                Metric
            </Text>
            <Select
                isDisabled={unsavedChanges}
                size='sm'
                borderRadius='0.25rem'
                w='15rem'
                placeholder='Select metric'
                value={currentMetric}
                borderColor={colors.main.usafaBlue}
                onChange={e => {
                    let sensor = sensors.find(sensor => sensor.metric === e.target.value)
                    if (sensor) {
                        setCurrentMetric(e.target.value);
                        setCurrentSensor(sensor);
                    }
                }}
            >
                {
                    sensors.map(sensor => {
                        return (
                            <option
                                value={sensor.metric}
                                key={uuid()}
                            >
                                {buoySensorTags[sensor.metric].label}
                            </option>
                        )
                    })
                }
            </Select>

            <Text
                as={unsavedChanges ? 'b' : 'span'}
                mb={4}
                fontSize='sm'
                color={unsavedChanges ? colors.main.mossGreen : 'gray.600'}
            >
                {
                    !unsavedChanges ?
                        'Select a metric to add calibration value points.'
                        :
                        'Save or revert changes before selecting a new metric.'}
            </Text>

            <Divider
                my={4}
            />

            {
                currentMetric !== "" &&
                <CalibrationTable
                    sensor={currentSensor}
                    setUnsavedChanges={setUnsavedChanges}
                    unsavedChanges={unsavedChanges}
                    saveChanges={saveChanges}
                />
            }
        </>
    );
};

export default CalibrationSettingsPanel;