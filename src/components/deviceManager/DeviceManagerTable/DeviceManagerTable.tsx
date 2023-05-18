import React from 'react';
import { useRecoilValue } from 'recoil';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Flex
} from '@chakra-ui/react';
import uuid from 'react-uuid';
import colors from '../../../theme/foundations/colours';
import BuoySettingsRow from './BuoySettingsRow';
import { allDevicesDetails } from '../../wrappers/DeviceDetailsWrapper/deviceManagerAtoms';


const DeviceManagerTable: React.FC = () => {
    const allDevices = useRecoilValue(allDevicesDetails);

    // const [displayedDevices, setDisplayedDevices] = useState([]);

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
                    {allDevices &&
                        allDevices.map(buoy => {
                            return (
                                <BuoySettingsRow
                                    buoy={buoy}
                                    key={uuid()}
                                />
                            )
                        })
                    }
                </Tbody>
            </Table>
            {/* <DeviceManagerPagination
                setDisplayedDevices={setDisplayedDevices}
            /> */}
        </Flex>
    );
};

export default DeviceManagerTable;
