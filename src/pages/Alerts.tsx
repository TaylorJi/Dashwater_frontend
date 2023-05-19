import React from 'react';
import Icon from '@chakra-ui/icon';
import { Select } from '@chakra-ui/select';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Flex, Text, useMediaQuery, Center, useDisclosure, Box, Spacer } from '@chakra-ui/react';
import BaseLayout from '../components/layout/BaseLayout';
import colors from '../theme/foundations/colours';
import AlertsTable from '../components/alerts/AlertsTable/AlertsTable';
import MapModal from '../components/map/mapModal/MapModal';
import DashboardTopSelect from '../components/dashboard/DashboardTopSelect';


const Alerts: React.FC = () => {
    const [isLargeScreen] = useMediaQuery('(min-width: 1600px)');
    const { isOpen, onOpen, onClose } = useDisclosure();


    return (
        <BaseLayout isNavbarVisible={true}>
            <Flex w='100%' minH='100vh' py='2rem' pr='1rem' flexDirection='column'>

                <Flex
                    alignItems='center'
                    px='4rem'
                >
                    <Text
                        fontSize={isLargeScreen ? "3xl" : "2xl"}
                        fontWeight="bold"
                    >
                        Alerts
                    </Text>
                    <Spacer />
                    <Box>
                        <DashboardTopSelect />
                    </Box>
                </Flex>

                <Center px="4rem" pt="2rem">
                    <AlertsTable />
                </Center>

            </Flex>
        </BaseLayout>
    );
};

export default Alerts;