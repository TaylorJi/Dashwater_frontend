import { Box, Flex, Spacer, Text, useMediaQuery } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import DashboardTabs from '../components/dashboard/DashboardTabs';
import DashboardTopNav from '../components/dashboard/DashboardTopNav';
import DashboardTopSelect from '../components/dashboard/DashboardTopSelect';
import MapCard from '../components/dashboard/map/MapCard';
import TideCard from '../components/dashboard/tide/TideCard';
import WeatherCard from '../components/dashboard/weather/WeatherCard';
import BaseLayout from "../components/layout/BaseLayout";
import { timeRangeAtom } from '../components/dashboard/logPanel/atoms/timeRangeAtom';

const Dashboard: React.FC = () => {

    const [isLargeScreen] = useMediaQuery('(min-width: 1600px)');
    const setTimeRange = useSetRecoilState(timeRangeAtom);
    // For some reason, the log table will cause the entire page to overflow unless I 
    // adjust the width it takes up in the first Flex component

    useEffect(() => {
        localStorage.setItem("timeRange", "12h");
        setTimeRange("12h");
    }, []);

    return (
        <BaseLayout isNavbarVisible={true}>
            <Flex
                w={isLargeScreen ? '95%' : '93.25%'}
                minH='100vh'
            >
                {/* Monitor panel */}
                <Box
                    w={isLargeScreen ? '25%' : '30%'}
                    borderRightColor='gray.200'
                    borderRightWidth='0.1rem'
                >
                    <Box
                        py='2rem'
                        pr='1rem'
                    >
                        <Text
                            fontSize={isLargeScreen ? '3xl' : '2xl'}
                            fontWeight='bold'
                        >
                            Monitor
                        </Text>

                        <WeatherCard />
                        <TideCard />
                        <MapCard />

                    </Box>

                </Box>

                {/* Devices panel */}
                <Box
                    py='2rem'
                    px='1rem'
                    w={isLargeScreen ? '75%' : '70%'}

                >
                    <Flex
                        alignItems='center'
                    >

                        <DashboardTopNav />
                        <Spacer />
                        <DashboardTopSelect />

                    </Flex>

                    <DashboardTabs />

                </Box>

            </Flex>
        </BaseLayout>
    );
};

export default Dashboard;