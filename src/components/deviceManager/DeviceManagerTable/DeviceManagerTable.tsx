import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Flex } from '@chakra-ui/react';
import BuoySettingsRow from './BuoySettingsRow';
import colors from '../../../theme/foundations/colours';
import uuid from 'react-uuid';
import DeviceManagerPagination from './DeviceManagerPagination';
import DeviceManagerTableSkeleton from './DeviceManagerTableSkeleton/DeviceManagerTableSkeleton';


const DeviceManagerTable: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [displayedDevices, setDisplayedDevices] = useState([]);

    return (
        <Flex
            w='100%'
            flexDirection='column'
        >
            <Table layout='fixed'>
                <Thead bg={colors.main.lavender} h="3rem" whiteSpace='nowrap'>
                    <Tr>
                        <Th color={colors.main.usafaBlue} w='15%'>Name</Th>
                        <Th color={colors.main.usafaBlue} w='15%'>ID</Th>
                        <Th color={colors.main.usafaBlue} w='60%'>Sensors</Th>
                        <Th color={colors.main.usafaBlue} w='10%'>Settings</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {displayedDevices &&
                        displayedDevices.map(buoy => {
                            return (
                                <BuoySettingsRow
                                    buoy={buoy}
                                    key={uuid()} />
                            )
                        }) 
                    }
                    {isLoading && <DeviceManagerTableSkeleton />}
                </Tbody>
            </Table>
            <DeviceManagerPagination
                setDisplayedDevices={setDisplayedDevices}
                setIsLoading={setIsLoading}
            />
        </Flex>
    );
};

export default DeviceManagerTable;
