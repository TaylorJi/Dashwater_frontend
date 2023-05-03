import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th } from '@chakra-ui/react';
import buoyData from '../../../mockData/mockBuoyData.json'
import BuoySettingsRow from './BuoySettingsRow';
import colors from '../../../theme/foundations/colours';
import uuid from 'react-uuid';


const DeviceManagerTable: React.FC = () => {
    const buoySettingsData = useState<deviceManagerDataType | null>(buoyData)[0]; // eventual unpack setState

    return (
        <>
            <Table >

                <Thead bg={colors.main.lavender} h="3rem">
                    <Tr>
                        <Th color={colors.main.usafaBlue}>Name</Th>
                        <Th color={colors.main.usafaBlue}>ID</Th>
                        <Th color={colors.main.usafaBlue}>Location</Th>
                        <Th color={colors.main.usafaBlue}>Sensors</Th>
                        <Th color={colors.main.usafaBlue}>Settings</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {buoySettingsData ?
                        buoyData['buoys'].map(buoy => {
                            return (
                                <BuoySettingsRow 
                                buoy={buoy}
                                units={buoyData['units']} 
                                key={uuid()}/>
                            )
                        }) : <></>
                    }
                </Tbody>
            </Table>
        </>
    );
};

export default DeviceManagerTable;
