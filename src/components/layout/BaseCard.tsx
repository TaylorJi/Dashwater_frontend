import { Box } from '@chakra-ui/react';
import React from 'react';
import colors from '../../theme/foundations/colours';

type baseCardProps = {
    children?: React.ReactNode;
};

const BaseCard: React.FC<baseCardProps> = ({ children }) => {

    return (
        <Box
            p='1rem'
            borderRadius='0.5rem'
            w='auto'
            h='fit-content'
            borderWidth='0.1rem'
            borderColor='gray.300'
        >
            {children}
        </Box>
    );
};

export default BaseCard;