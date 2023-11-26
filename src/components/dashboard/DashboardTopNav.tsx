import { Box, Flex, Text, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { topNavItems } from './dashboardTopNavItems';
import uuid from 'react-uuid';
import colors from '../../theme/foundations/colours';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { deviceDataAtom } from './atoms/intervalPanelAtoms';
import toast from 'react-hot-toast';
import Dashboard from '../../api/Dashboard/Dashboard';
import { logDataAtom, paginationMultipleAtom } from './logPanel/atoms/logPanelAtoms';
import CustomRangeModal from './customRange/CustomRangeModal';
import { timeRangeAtom } from '../../../src/components/dashboard/logPanel/atoms/timeRangeAtom';

const DashboardTopNav: React.FC = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [active, setActive] = useState<number>(0);

    const setGlobalDeviceData = useSetRecoilState(deviceDataAtom);
    const setLogData = useSetRecoilState(logDataAtom);

    const resetPagination = useResetRecoilState(paginationMultipleAtom);

    const setTimeRange = useSetRecoilState(timeRangeAtom);

    const getDevice = async () => {
        try {
            console.log("Interval panel call getDevice")
            const data = await Dashboard.getAllDevice();
            if (data) {
                setGlobalDeviceData(data);
            } else {
                toast.error('There was an error fetching device data - please refresh and try again.');
            }
        } catch {
            toast.error('There was an error fetching device data - please refresh and try again.');
        }   
    }

    const getDeviceData = async (end: string) => {

        try {
            // const data = await Dashboard.getCachedData(end);
            const devices = getDevice();
            console.log(devices);
            const data = await Dashboard.getData('device', end);

            if (data) {
                setGlobalDeviceData(data);
            } else {
                toast.error('There was an error fetching device data - please refresh and try again.');
            }

        } catch {
            toast.error('There was an error fetching device data - please refresh and try again.');
        }

    };

    const getLogData = async (end: string) => {

        try {
            const data = await Dashboard.getCachedLogData(end);

            if (data) {
                setLogData(data);
            } else {
                toast.error('There was an error fetching log data - please refresh and try again.');
            }

        } catch {
            toast.error('There was an error fetching log data - please refresh and try again.');
        }

    };

    useEffect(() => {
        const end = '12h'
        getLogData(end);

    }, []);

    return (
        <Flex>
            <CustomRangeModal isOpen={isOpen} onClose={onClose} />
            {
                Object.keys(topNavItems).map((item, index) => {
                    return (
                        <Box
                            mr='1rem'
                            py='0.5rem'
                            px='1rem'
                            borderRadius='0.25rem'
                            key={uuid()}
                            transition={'all 0.2s ease-in-out'}
                            bgColor={index === active ? colors.main.activeTopNav : ''}
                            color={index === active ? colors.main.usafaBlue : colors.main.ceruBlue}
                            onClick={async () => {
                                console.log(topNavItems[item])
                                localStorage.setItem("timeRange", topNavItems[item]);
                                setTimeRange(topNavItems[item])
                               

                                resetPagination();
                                setActive(index);
                                if (item !== 'Custom') {
                                    toast.success('Now displaying data for new date range.');
                                    // this is where we create corresdoning page 
                                    await getDeviceData(topNavItems[item]);
                                    // await getLogData(topNavItems[item]);
                                } else {
                                    onOpen();
                                }
                            }} 
                            _hover={{
                                transform: 'scale(1.05)',
                                cursor: 'pointer',
                                color: colors.main.usafaBlue
                            }}
                        >
                            <Text
                                fontWeight='semibold'
                            >
                                {item}
                            </Text>
                        </Box>
                    );
                })
            }
        </Flex>
    );
};

export default DashboardTopNav;