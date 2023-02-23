import { Box, Flex, Text, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import DashboardTopNav from '../components/dashboard/DashboardTopNav';
import DashboardTopSelect from '../components/dashboard/DashboardTopSelect';
import BaseLayout from "../components/layout/BaseLayout";

const Dashboard: React.FC = () => {

    const [isLargeScreen] = useMediaQuery('(min-width: 1600px)');

    return (
        <BaseLayout isNavbarVisible={true}>
            <Flex
                w='100%'
                minH='100vh'
            >
                <Box
                    w='25%'
                    borderRightColor='gray.200'
                    borderRightWidth='0.1rem'
                >
                    <Box
                        py='2rem'
                    >
                        <Text
                            fontSize={isLargeScreen ? '3xl' : '2xl'}
                            fontWeight='bold'
                        >
                            Monitor
                        </Text>

                    </Box>

                </Box>
                <Box
                    py='2rem'
                    px='1rem'
                    w='75%'

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

                </Box>

            </Flex>
        </BaseLayout>
    );
};

export default Dashboard;