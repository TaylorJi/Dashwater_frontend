import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Flex } from '@chakra-ui/react';
import BuoySettingsRow from './BuoySettingsRow';
import colors from '../../../theme/foundations/colours';
import uuid from 'react-uuid';
import { allDevicesDetails } from '../../wrappers/DeviceDetailsWrapper/deviceManagerAtoms';
import { useRecoilValue } from 'recoil';
import DeviceManagerPagination from './DeviceManagerPagination';


const DeviceManagerTable: React.FC = () => {
    const devicesSettingsData = useRecoilValue(allDevicesDetails);

    /////////// NEW (PROP) //////////////////
    const [displayedDevices, setDisplayedDevices] = useState([]);
    ////////////////////////////////////////

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
                    {displayedDevices ?
                        displayedDevices.map(buoy => {
                            return (
                                <BuoySettingsRow
                                    buoy={buoy}
                                    key={uuid()} />
                            )
                        }) : <></>
                    }
                </Tbody>
            </Table>
            <DeviceManagerPagination
                setDisplayedDevices={setDisplayedDevices}
            />
        </Flex>
    );
};

export default DeviceManagerTable;
