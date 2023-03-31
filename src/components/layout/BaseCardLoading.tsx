import { Flex, Spinner } from '@chakra-ui/react';
import React from 'react';

const BaseCardLoading: React.FC = () => {

    return (
        <Flex
            h='5rem'
            w='100%'
            justifyContent='space-evenly'
            alignItems='center'
        >
            <Spinner size='lg' />
        </Flex>
    );
};

export default BaseCardLoading;