import React, { useEffect, useState } from 'react';
import colors from '../../../../theme/foundations/colours';
import {
    Divider,
    Text,
    Select,
} from '@chakra-ui/react';
import { buoySensorTags } from '../../../../theme/metrics/buoySensorTags';
import uuid from 'react-uuid';
import CalibrationTable from './CalibrationTable';
import { mockCalibrationData } from '../../../../mockData/mockCalibrationData';
import { useRecoilState } from 'recoil';
import { calibrationPoints } from '../../../wrappers/DeviceDetailsWrapper/deviceManagerAtoms';

type calibrationSettingsPanelProps = {
    sensors: sensorType[];
    buoy: deviceSettingsType;
}

const CalibrationSettingsPanel: React.FC<calibrationSettingsPanelProps> = ({ sensors, buoy }) => {
    const [currentMetric, setCurrentMetric] = useState<string>("");
    const [currentSensor, setCurrentSensor] = useState<sensorType>({} as sensorType);
    const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
    const [_allCalibrationPoints, setAllCalibrationPoints] = useRecoilState(calibrationPoints);

    const fetchCalibrationPoints = async () => {
        const calibrationPoints: {
            [key: number]: calibrationPointType[];
        } = {};
        let calibrationPointId = 0;
        sensors.forEach((sensor: sensorType) => {
            // calibrationPoints[sensor.id] = mockCalibrationData[sensor.id]
            const newSensorType1: calibrationPointType = {
                id: calibrationPointId++,
                physicalValue: sensor.physicalValues[0],
                digitalValue: sensor.calibratedValues[0],
                sensorId: sensor.id
            }
            const newSensorType2: calibrationPointType = {
                id: calibrationPointId++,
                physicalValue: sensor.physicalValues[1],
                digitalValue: sensor.calibratedValues[1],
                sensorId: sensor.id
            }
            calibrationPoints[sensor.id] = [newSensorType1, newSensorType2];

        });
        setAllCalibrationPoints(calibrationPoints);
    };

    useEffect(() => {
        // load all sensor calibration points on panel open
        fetchCalibrationPoints();
        return () => {
            // cleanup
        };
    }, []);

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
                    sensors={sensors}
                    buoy={buoy}
                    setUnsavedChanges={setUnsavedChanges}
                    unsavedChanges={unsavedChanges}
                />
            }
        </>
    );
};

export default CalibrationSettingsPanel;
