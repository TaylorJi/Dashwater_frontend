import { Center, Image, Flex, Text, useMediaQuery, Spinner } from '@chakra-ui/react';
import React from 'react';
import waterDroplet from '../../assets/images/water-droplet.png';

const LoadingGraphic: React.FC = () => {

    const [isLargeScreen] = useMediaQuery('(min-width: 1600px)');

    return (
        <Center
            flexDir='column'
            mt={isLargeScreen ? '5rem' : '1rem'}
        >
            <Image
                src={waterDroplet}
                w={isLargeScreen ? '15rem' : '10rem'}
                mb={isLargeScreen ? '1rem' : '0'}
            />
            <Flex
                justifyContent='center'
            >
                <Text
                    fontWeight='semibold'
                    color='gray.400'
                    mr='1rem'
                    fontSize={isLargeScreen ? '2xl' : 'md'}
                >
                    Loading...
                </Text>
                <Spinner
                    size={isLargeScreen ? 'lg' : 'md'}
                    color='gray.400'
                />
            </Flex>
        </Center>
    );
};

export default LoadingGraphic;