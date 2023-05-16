import React from 'react';
import { Flex, Text, useMediaQuery, Box } from '@chakra-ui/react';
import BaseLayout from '../components/layout/BaseLayout';
import AdminPortalTabs from '../components/adminPortal/AdminPortalTabs';


const AdminPortal: React.FC = () => {
    const [isLargeScreen] = useMediaQuery("(min-width: 1600px)");
    

    return (
        <BaseLayout isNavbarVisible={true}>
            <Flex w="100%" minH="100vh" py="2rem" pr="1rem" flexDirection="column">
                <Text fontSize={isLargeScreen ? "3xl" : "2xl"} fontWeight="bold">
                    Admin Portal
                </Text>
                <Box
                    py='2rem'
                    px='1rem'
                    w={isLargeScreen ? '100%' : '95%'}
                >
                    <AdminPortalTabs />
                </Box>
                
            </Flex>
            
        </BaseLayout>
    );
};

export default AdminPortal;