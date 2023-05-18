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
}

const CalibrationSettingsPanel: React.FC<calibrationSettingsPanelProps> = ({ sensors }) => {
    const [currentMetric, setCurrentMetric] = useState<string>("");
    const [currentSensor, setCurrentSensor] = useState<sensorType>({} as sensorType);
    const [allCalibrationPoints, setAllCalibrationPoints] = useRecoilState(calibrationPoints);

    const fetchCalibrationPoints = async () => {
        const calibrationPoints: {
            [key: string]: calibrationPointType[];
        } = {};
        sensors.forEach((sensor: sensorType) => {
            calibrationPoints[sensor.id] = mockCalibrationData[sensor.id]
        });
        setAllCalibrationPoints(calibrationPoints);
    };

    useEffect(() => {
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
                mb={4}
                as='span'
                fontSize='sm'
                color='gray.500'
            >
                Select a metric to add calibration value points.
            </Text>

            <Divider
                my={4}
            />

            {
                currentMetric !== "" &&
                <CalibrationTable
                    sensor={currentSensor}
                />
            }
        </>
    );
};

export default CalibrationSettingsPanel;
