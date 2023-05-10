import { Text, Box, Grid, GridItem, useMediaQuery, Center } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import UserTable from './UserTable';
import CrudButtons from './CrudButtons';

const UserPanel: React.FC = () => {
    return (
        <>
            <Text fontSize='2xl' fontWeight='bold' pl="2rem" pt="2rem">
                User Table
            </Text>
            <Center px="2rem" pt="1rem" pb="1rem">
                <UserTable />
            </Center>
            <CrudButtons />
        </>
    );
};

export default UserPanel;