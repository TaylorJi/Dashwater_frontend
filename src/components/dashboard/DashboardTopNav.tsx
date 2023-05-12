import { Box, Flex, Text, useMediaQuery } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { topNavItems } from './dashboardTopNavItems';
import uuid from 'react-uuid';
import colors from '../../theme/foundations/colours';
import { useSetRecoilState } from 'recoil';
import { deviceDataAtom } from './atoms/intervalPanelAtoms';
import toast from 'react-hot-toast';
import Dashboard from '../../api/Dashboard/Dashboard';
import { logDataAtom } from './logPanel/atoms/logPanelAtoms';

const DashboardTopNav: React.FC = () => {

    const [active, setActive] = useState<number>(0);
    const [isLargeScreen] = useMediaQuery('(min-width: 1600px)');

    const setGlobalDeviceData = useSetRecoilState(deviceDataAtom);
    const setLogData = useSetRecoilState(logDataAtom);

    const getDeviceData = async (end: string) => {

        try {
            const data = await Dashboard.getCachedData(end);

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
        const end = new Date(new Date().setHours(new Date().getHours() - 12)).toISOString();
        getLogData(end);

    }, []);

    return (
        <Flex
            mt={isLargeScreen ? '0' : '1rem'}
        >
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
                                setActive(index);
                                if (item !== 'Custom') {
                                    await getDeviceData(topNavItems[item]);
                                    await getLogData(topNavItems[item]);
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