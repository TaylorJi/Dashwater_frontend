import React from 'react';
import colors from '../../../../theme/foundations/colours';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
} from '@chakra-ui/react';
import CalibrationPointRow from './CalibrationPointRow';

type calibrationTableProp = {
    calibrationPoints: calibrationPointType[];
    unit: string;
    setUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>;
}

const CalibrationTable: React.FC<calibrationTableProp> = ({ calibrationPoints, unit, setUnsavedChanges }) => {

    return (
        <>
            <Table>

                <Thead>
                    <Tr>
                        <Th color={colors.main.usafaBlue}>Calibration Point</Th>
                        <Th color={colors.main.usafaBlue}>Physical Value</Th>
                        <Th color={colors.main.usafaBlue}>Digital Value</Th>
                        <Th color={colors.main.usafaBlue}>Unit</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {calibrationPoints.length > 0 ?
                        calibrationPoints.sort((a, b) => {
                            return a.id - b.id;
                        }).map((point, index) => {
                            return (
                                <CalibrationPointRow
                                    number={index + 1}
                                    point={point}
                                    unit={unit}
                                    setUnsavedChanges={setUnsavedChanges}
                                    key={index}
                                />
                            )
                        }) : <></>
                    }
                </Tbody>
            </Table>

            
        </>
    );
}

export default CalibrationTable;