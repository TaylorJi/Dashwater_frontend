import React, { useState } from 'react';
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

}

const CalibrationPointRow: React.FC<calibrationPointRowProps> = ({ number, point, unit, setUnsavedChanges }) => {
    const [digitalValue, setDigitalValue] = useState<number | string>(point.digitalValue);

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
                    value={point.digitalValue}
                    onChange={i => {
                        setUnsavedChanges(true);
                        if (i === '-') {
                            setDigitalValue('-');
                        }
                        if (i === '') {
                            setDigitalValue('');
                        }
                        let newMax = parseInt(i);
                        if (!isNaN(newMax))
                            setDigitalValue(newMax);

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
