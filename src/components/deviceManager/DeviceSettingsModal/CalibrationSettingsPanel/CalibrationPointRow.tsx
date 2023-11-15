import React, { useState, useEffect } from 'react';
import {
    Tr,
    Td,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
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
    const [digitalValues, setDigitalValues] = useState<number[]>(point.digitalValue);

    useEffect(() => {
        setDigitalValues(point.digitalValue);
    }, [point])

    const updateCalibrationPoints = (index: number, val: string) => {
        setSensorCalibrationPoints(
            sensorCalibrationPoints.map(p => {
                if (p.id === point.id) {
                    let newDigitalValues = [...p.digitalValue];
                    newDigitalValues[index] = +val;
                    return {
                        ...p,
                        digitalValue: newDigitalValues
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
                {point.physicalValue.join(', ')}
            </Td>
            {digitalValues.map((digitalValue, index) => (
                <Td key={index}>
                    <NumberInput
                        precision={2}
                        step={0.01}
                        value={digitalValue}
                        onChange={val => {
                            updateCalibrationPoints(index, val);
                            setUnsavedChanges(true);
                        }}
                        onBlur={e => {
                            if (e.target.value === "") {
                                updateCalibrationPoints(index, "0");
                                setUnsavedChanges(true);
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
            ))}
            <Td>
                {unit}
            </Td>
        </Tr>
    )
}

export default CalibrationPointRow;