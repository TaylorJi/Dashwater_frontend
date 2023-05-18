import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { 
    Table, 
    Thead, 
    Tbody, 
    Tr, 
    Th, 
    Flex 
} from '@chakra-ui/react';
import uuid from 'react-uuid';
import { toast } from 'react-hot-toast';
import colors from '../../../theme/foundations/colours';

import BuoySettingsRow from './BuoySettingsRow';
import DeviceManagerPagination from './DeviceManagerPagination';
import DeviceManagerTableSkeleton from './DeviceManagerTableSkeleton/DeviceManagerTableSkeleton';
import ManageDevices from "../../../api/ManageDevices/ManageDevices";
import { allDevicesDetails } from '../../wrappers/DeviceDetailsWrapper/deviceManagerAtoms';



const DeviceManagerTable: React.FC = () => {
    const [allDevices, setAllDevices] = useRecoilState(allDevicesDetails);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [displayedDevices, setDisplayedDevices] = useState([]);


    const fetchData = async () => {
        setIsLoading(true);
        try {
            const data = await ManageDevices.getDevicesSettings();
            if (data) {
                setAllDevices(data);
            } else {
                toast.error('There was an error fetching device data - please refresh and try again.');
            }
        } catch (_err) {

            return null;

        }
        setIsLoading(false);
    }

    useEffect(() => {
        if (allDevices.length === 0) {
            fetchData();
        }

        return () => {
            // cleanup
        };
    }, []);


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
                                    key={uuid()}
                                />
                            )
                        }) 
                    }
                    {isLoading && <DeviceManagerTableSkeleton />}
                </Tbody>
            </Table>
            <DeviceManagerPagination
                setDisplayedDevices={setDisplayedDevices}
            />
        </Flex>
    );
};

export default DeviceManagerTable;
