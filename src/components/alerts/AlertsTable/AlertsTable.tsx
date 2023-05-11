import React, { useState } from 'react';
import { Table, Thead, Tbody, Th, Tr } from '@chakra-ui/react';
import colors from '../../../theme/foundations/colours';
import uuid from 'react-uuid';
import mockAlertsData from '../../../mockData/mockAlertData.json';
import AlertsRow from './AlertsRow';


const AlertsTable: React.FC = () => {
    const alertsData = useState<alertsDataType | null>(mockAlertsData)[0]; // eventual unpack setState

    return (
        <>
            <Table >
                <Thead bg={colors.main.lavender} h="3rem">
                    <Tr>
                        <Th color={colors.main.usafaBlue}>Alert</Th>
                        <Th color={colors.main.usafaBlue}>Metric</Th>
                        <Th color={colors.main.usafaBlue}>Status</Th>
                        <Th color={colors.main.usafaBlue}>Device Name</Th>
                        <Th color={colors.main.usafaBlue}>Device ID</Th>
                        <Th color={colors.main.usafaBlue}>Date</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {alertsData ?
                        alertsData['alerts'].map(alert => {
                            return (
                                <AlertsRow
                                    alert={alert}
                                    key={uuid()} />
                            )
                        }) : <></>
                    }
                </Tbody>
            </Table>
        </>
    );
};

export default AlertsTable;
