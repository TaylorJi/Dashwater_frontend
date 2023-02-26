import React, { useState } from 'react';
import { Table, Thead, Tbody, Th } from '@chakra-ui/react';
import buoyData from '../../../mockData/mockBuoyData.json'
import BuoySettingsRow from './DeviceManagerRow';
import colors from '../../../theme/foundations/colours';


const DeviceManagerTable: React.FC = () => {
    const buoySettingsData = useState<deviceManagerDataType | null>(buoyData)[0]; // eventual unpack setState

    return (
        <>
            <Table >
                <Thead bg={colors.main.lavender} h="3rem">
                    <Th color={colors.main.usafaBlue}>Name</Th>
                    <Th color={colors.main.usafaBlue}>ID</Th>
                    <Th color={colors.main.usafaBlue}>Location</Th>
                    <Th color={colors.main.usafaBlue}>Sensors</Th>
                    <Th color={colors.main.usafaBlue}>Settings</Th>
                </Thead>
                <Tbody>
                    {buoySettingsData ?
                        buoyData['buoys'].map(buoy => {
                            return (
                                <BuoySettingsRow buoy={buoy} />
                            )
                        }) : <></>
                    }
                </Tbody>
            </Table>
        </>
    );
};

export default DeviceManagerTable;
