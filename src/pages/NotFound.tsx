import React from 'react';
import { Image, Button, Center, Text, VStack, useMediaQuery } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import colors from '../theme/foundations/colours';
import notFoundImage from "../assets/images/404_graphic.svg";

const NotFound: React.FC = () => {
    const [isLargeScreen] = useMediaQuery('(min-width: 1600px)');
    const navigate = useNavigate()

    return (
        <Center w='100vw'>
            <VStack spacing="30px">
                <Image src={notFoundImage} />

                <Text fontSize={isLargeScreen ? '3xl' : '2xl'}>
                    404: The requested page could not be found.
                </Text>

                <Button 
                    size='lg'
                    colorScheme='main'
                    _hover={{
                        bg: colors.main.ceruBlue
                    }}
                    onClick={() => {
                        navigate('/dashboard');
                    }}
                >
                    Return to Dashboard
                </Button>
            </VStack>
        </Center>
    );
};

export default NotFound;