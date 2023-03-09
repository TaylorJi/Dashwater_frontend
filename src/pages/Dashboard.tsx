import { Box, color, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import DashboardTabs from '../components/dashboard/DashboardTabs';
import DashboardTopNav from '../components/dashboard/DashboardTopNav';
import DashboardTopSelect from '../components/dashboard/DashboardTopSelect';
import TideCard from '../components/dashboard/tide/TideCard';
import WeatherCard from '../components/dashboard/weather/WeatherCard';
import BaseCard from '../components/layout/BaseCard';
import BaseLayout from "../components/layout/BaseLayout";
import colors from '../theme/foundations/colours';

const Dashboard: React.FC = () => {

    const [isLargeScreen] = useMediaQuery('(min-width: 1600px)');

    return (
        <BaseLayout isNavbarVisible={true}>
            <Flex
                w='100%'
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

                    </Box>

                </Box>

                {/* Devices panel */}
                <Box
                    py='2rem'
                    px='1rem'
                    w={isLargeScreen ? '75%' : '70%'}

                >
                    <Flex
                        flexDir={isLargeScreen ? 'row' : 'column'}
                    >
                        <Flex
                            mr={isLargeScreen ? '3rem' : '0'}
                        >
                            <DashboardTopSelect />

                        </Flex>

                        <DashboardTopNav />

                    </Flex>

                    <DashboardTabs />

                </Box>

            </Flex>
        </BaseLayout>
    );
};

export default Dashboard;