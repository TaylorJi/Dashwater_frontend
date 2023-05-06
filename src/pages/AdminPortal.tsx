import React from 'react';
import Icon from '@chakra-ui/icon';
import { Select } from '@chakra-ui/select';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Flex, Text, useMediaQuery, Center, useDisclosure } from '@chakra-ui/react';
import BaseLayout from '../components/layout/BaseLayout';
import colors from '../theme/foundations/colours';
import UserTable from '../components/adminPortal/user/UserTable';
import CrudButtons from '../components/adminPortal/user/CrudButtons';


const AdminPortal: React.FC = () => {
    const [isLargeScreen] = useMediaQuery("(min-width: 1600px)");
    

    return (
        <BaseLayout isNavbarVisible={true}>
            <Flex w="100%" minH="100vh" py="2rem" pr="1rem" flexDirection="column">
                <Text fontSize={isLargeScreen ? "3xl" : "2xl"} fontWeight="bold">
                    Admin Portal
                </Text>
                <Text fontSize='2xl' fontWeight='bold' pl="4rem" pt="2rem">
                    User Table
                </Text>
                <Center px="4rem" pt="1rem" pb="1rem">
                    <UserTable />
                </Center>
                <CrudButtons />
            </Flex>
            
        </BaseLayout>
    );
};

export default AdminPortal;