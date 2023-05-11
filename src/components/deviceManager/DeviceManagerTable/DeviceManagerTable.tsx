import React from 'react';
import { Table, Thead, Tbody, Tr, Th } from '@chakra-ui/react';
import BuoySettingsRow from './BuoySettingsRow';
import colors from '../../../theme/foundations/colours';
import uuid from 'react-uuid';
import { allDevicesDetails } from '../../wrappers/DeviceDetailsWrapper/deviceManagerAtoms';
import { useRecoilValue } from 'recoil';


const DeviceManagerTable: React.FC = () => {
    const devicesSettingsData = useRecoilValue(allDevicesDetails);

    return (
        <Table >
            <Thead bg={colors.main.lavender} h="3rem">
                <Tr>
                    <Th color={colors.main.usafaBlue}>Name</Th>
                    <Th color={colors.main.usafaBlue}>ID</Th>
                    <Th color={colors.main.usafaBlue}>Sensors</Th>
                    <Th color={colors.main.usafaBlue}>Settings</Th>
                </Tr>
            </Thead>
            <Tbody>
                {devicesSettingsData ?
                    devicesSettingsData.map(buoy => {
                        return (
                            <BuoySettingsRow
                                buoy={buoy}
                                key={uuid()} />
                        )
                    }) : <></>
                }
            </Tbody>
        </Table>
    );
};

export default DeviceManagerTable;
