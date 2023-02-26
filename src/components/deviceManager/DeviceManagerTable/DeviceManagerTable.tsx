import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, Table, Thead, Tbody, Th, Tr, Td } from '@chakra-ui/react';
import buoyData from '../../../mockData/mockBuoyData.json'
import BuoySettingsRow from './DeviceManagerRow';

const DeviceManagerTable: React.FC = () => {
    const [ buoySettingsData, setBuoySettingsData ] = useState<deviceManagerDataType | null>(buoyData);


    return (
        <>
            <Table >
                <Thead>
                    <Th>Device Name</Th>
                    <Th>Device ID</Th>
                    <Th>Location</Th>
                    <Th>Sensors</Th>
                    <Th>Settings</Th>
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