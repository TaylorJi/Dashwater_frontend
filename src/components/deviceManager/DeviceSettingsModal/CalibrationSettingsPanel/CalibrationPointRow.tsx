import React from 'react';
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
}

const CalibrationPointRow: React.FC<calibrationPointRowProps> = ({ number, point, unit }) => {
    return(
        <Tr>
            <Td>
                {number}
            </Td>
            <Td>
                {point.physical_value}
            </Td>
            <Td>
                <NumberInput>
                    <NumberInputField
                        value={point.digital_value}
                    />
                </NumberInput>
            </Td>
            <Td>
                {unit}
            </Td>
        </Tr>
    )
}

export default CalibrationPointRow;