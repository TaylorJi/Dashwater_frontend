import React from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import DeviceManagerTable from '../components/deviceManager/DeviceManagerTable/DeviceManagerTable';
import { Box, color, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useMediaQuery, Center } from '@chakra-ui/react';



const DeviceManager: React.FC = () => {

    const [isLargeScreen] = useMediaQuery('(min-width: 1600px)');

    return (
        <BaseLayout isNavbarVisible={true}>
            <Flex w='100%' minH='100vh' borderWidth='1px' py='2rem' pr='1rem' flexDirection='column'>

                <Text fontSize={isLargeScreen ? '3xl' : '2xl'} fontWeight='bold' >
                    Manage Devices
                </Text>

                <Center borderWidth='1px'>
                    <DeviceManagerTable/>
                </Center>

            </Flex>
        </BaseLayout>
    );
};

export default DeviceManager;