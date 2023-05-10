import { Text, Box, Grid, GridItem, useMediaQuery, Center, Image, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';

const DevicePanel: React.FC = () => {
    return (
        <Box my="0.5rem">
            {/* <Center
                px="2rem" pt="1rem" pb="1rem"
            > */}
                <Image 
                    src='device-status.png' alt='Device Status Table'
                />
            {/* </Center> */}
        </Box>
    );
};

export default DevicePanel;