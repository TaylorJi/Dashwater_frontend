import { Box, Flex, Text, useMediaQuery, Select, Button, Icon } from '@chakra-ui/react';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DashboardTopNav from '../components/dashboard/DashboardTopNav';
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
                            <Select
                                size='sm'
                                borderRadius='0.25rem'
                                placeholder='Select Devices'
                                w='15rem'
                                borderColor={colors.main.usafaBlue}
                            />
                            <Button
                                size='sm'
                                bg='main.acidGreen'
                                ml='0.5rem'
                                color='white'
                                fontSize='sm'
                                rightIcon={<Icon
                                    as={FontAwesomeIcon}
                                    icon={faChevronRight}
                                    color='white'
                                />}
                                _hover={{
                                    bg: colors.main.mossGreen
                                }}
                            >
                                Select by Map
                            </Button>

                            <Select
                                size='sm'
                                borderRadius='0.25rem'
                                placeholder='Select Metrics'
                                ml='2rem'
                                w='15rem'
                                borderColor={colors.main.usafaBlue}
                            />
                        </Flex>

                        <DashboardTopNav />

                    </Flex>

                </Box>

            </Flex>
        </BaseLayout>
    );
};

export default Dashboard;