import React from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import { Image, Button, Center, Text, VStack, useMediaQuery } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import colors from '../theme/foundations/colours';
import notFoundImage from "../assets/images/404_graphic.svg";

const NotFound: React.FC = () => {
    const [isLargeScreen] = useMediaQuery('(min-width: 1600px)');
    const navigate = useNavigate()

    return (
        <BaseLayout isNavbarVisible={false}>
            <Center w='100vw'>
                <VStack spacing="2.5rem">
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
        </BaseLayout>
    );
};

export default NotFound;