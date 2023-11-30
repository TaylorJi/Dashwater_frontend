import { Box } from '@chakra-ui/react';
import React from 'react';

type baseCardProps = {
    children?: React.ReactNode;
};

const BaseCard: React.FC<baseCardProps> = ({ children }) => {

    return (
        <Box
            p='1rem'
            borderRadius='0.5rem'
            w='100%'
            h='fit-content'
            borderWidth='0.1rem'
            borderColor='gray.300'
        >
            {children}
        </Box>
    );
};

export default BaseCard;