import React, { useState, useEffect } from 'react';
import {
    Tr,
    Td,
    NumberInput,
    NumberInputField
} from '@chakra-ui/react';

type calibrationPointRowProps = {
    number: number;
    unit: string;
    point: calibrationPointType;
    setUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>;
    setSensorCalibrationPoints: React.Dispatch<React.SetStateAction<calibrationPointType[]>>;
    sensorCalibrationPoints: calibrationPointType[];
}

const CalibrationPointRow: React.FC<calibrationPointRowProps> = ({ number, point, unit, setUnsavedChanges, setSensorCalibrationPoints, sensorCalibrationPoints }) => {
    const [digitalValue, setDigitalValue] = useState<number | string>(point.digitalValue);

    useEffect(() => {
        setDigitalValue(point.digitalValue);
    }, [point])

    const updateCalibrationPoints = (val: string) => {
        setSensorCalibrationPoints(
            sensorCalibrationPoints.map(p => {
                if (p.id === point.id) {
                    return {
                        ...p,
                        digitalValue: +val
                    }
                }
                return p;
            })
        ) 
    }

    return (
        <Tr>
            <Td>
                {number}
            </Td>
            <Td>
                {point.physicalValue}
            </Td>
            <Td>
                <NumberInput
                    precision={2}
                    value={digitalValue}
                    onChange={val => {
                        updateCalibrationPoints(val);
                        setUnsavedChanges(true);
                    }}
                    onBlur={e => {
                        if (e.target.value === "") {
                            updateCalibrationPoints("0");
                            setUnsavedChanges(true);
                        } 
                      }}
                >
                    <NumberInputField />
                </NumberInput>
            </Td>
            <Td>
                {unit}
            </Td>
        </Tr>
    )
}

export default CalibrationPointRow;
