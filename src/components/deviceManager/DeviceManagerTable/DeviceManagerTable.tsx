import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, Table, Thead, Tbody, Th, Tr, Td } from '@chakra-ui/react';
import buoyData from '../../../mockData/mockBuoyData.json'
import BuoySettingsRow from './DeviceManagerRow';
import colors from '../../../theme/foundations/colours';
import radii from '../../../theme/foundations/radius';



const DeviceManagerTable: React.FC = () => {
    const [ buoySettingsData, setBuoySettingsData ] = useState<deviceManagerDataType | null>(buoyData);


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
                    { buoySettingsData ? 
                        buoyData['buoys'].map( buoy => {
                            return (
                                <BuoySettingsRow buoy={buoy}/>
                            )
                        }) : <></>    
                    }
                </Tbody>
            </Table>
        </>
    )
}

export default DeviceManagerTable;
