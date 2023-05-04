import React, { useEffect, useState } from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import welcomeBgImage from '../assets/images/cristian-palmer-3leBubkp5hk-unsplash.png';
import loginFormBgImage from '../assets/images/login-form-background.png';
import yvrLogo from '../assets/images/yvr-logo.png';
import { Box, Button, Flex, FormControl, FormLabel, Heading, Image, Input, VStack } from '@chakra-ui/react';
import Authentication from '../api/Authentication/Authentication';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()


    const handleLogin = async (e: { preventDefault: () => void; }) => {
        const user = await Authentication.authenticateUser(email, password);
        if (user) {
            console.log(user)
        }
    }

    return (
        <BaseLayout isNavbarVisible={false}>
            <Flex
                w='100%'
                minH='100vh'
            >
                <Box
                    w='50%'
                    bgImage={`url(${welcomeBgImage})`}
                    bgSize='cover'
                    bgRepeat='no-repeat'
                    opacity='0.9'
                >
                </Box>
                <Box
                    w='50%'
                    bgImage={`url(${loginFormBgImage})`}
                    bgSize='100% 100%'
                    bgRepeat='no-repeat'
                >
                    <VStack mt='20%' spacing='5'>
                        <Image
                            boxSize='30%'
                            src={`${yvrLogo}`}
                            alt='YVR LOGO'
                        />
                        <Heading> Sign in to Dashboard </Heading>
                        <FormControl w='30%'>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type='text'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl w='30%'>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type='text'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Button onClick={handleLogin}>Login</Button>
                    </VStack>
                </Box>
            </Flex>
        </BaseLayout>
    );
};

export default Login;