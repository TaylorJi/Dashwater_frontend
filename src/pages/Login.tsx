import React, { useEffect, useState } from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import welcomeBgImage from '../assets/images/cristian-palmer-3leBubkp5hk-unsplash.png';
import loginFormBgImage from '../assets/images/login-form-background.png';
import yvrLogo from '../assets/images/yvr-logo.png';
import bcitlogo from '../assets/images/bcitlogo.png';
import { Box, Button, Flex, FormControl, FormLabel, Heading, Image, Input, Link, Text, VStack } from '@chakra-ui/react';
import Authentication from '../api/Authentication/Authentication';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import colors from '../theme/foundations/colours';


const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleLogin = async (email: string, password: string) => {
        const user = await Authentication.authenticateUser(email, password);
        if (user) {
            // console.log(user)
            navigate('/dashboard')
        } else {
            toast.error('User with this email and password does not exist.')
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
                    // bgImage={`url(${welcomeBgImage})`}
                    bgImage={welcomeBgImage}
                    bgSize='cover'
                    bgRepeat='no-repeat'
                    opacity='0.9'
                >
                    <Box
                        h='40%'
                        w='80%'
                        mt='35%'
                        ml='10%'
                        // bgColor={colors.main.loginInfoLayer}
                        bgColor='rgba(0, 36, 59, 0.5)'
                        borderRadius='md'
                    >
                        <Heading
                            py='1rem'
                            color='white'
                            textAlign='center'
                        >
                            YVR x BCIT IoT
                        </Heading>
                        <Text
                            mt='3rem'
                            ml='2rem'
                            mr='4rem'
                            mb='5rem'
                            color='white'
                        >
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium quos fugiat sed similique neque reprehenderit nisi facilis, hic quas inventore porro dolores iusto at dolore beatae esse est non cupiditate.
                        </Text>
                        <Link
                            ml='2rem'
                            color='white'
                            textDecoration='underline'
                            href='https://www.bcit.ca/applied-research/centre-for-internet-of-things-iot/'
                            isExternal
                        >
                            Learn more about BCIT IoT
                        </Link>

                    </Box>
                    <Image
                        mt='1rem'
                        ml='10%'
                        src={bcitlogo}
                    />
                </Box>
                <Box
                    w='50%'
                    // bgImage={`url(${loginFormBgImage})`}
                    bgImage={loginFormBgImage}
                    bgSize='100% 100%'
                    bgRepeat='no-repeat'
                >
                    <VStack mt='20%' spacing='6'>
                        <Image
                            boxSize='30%'
                            // src={`${yvrLogo}`}
                            src={yvrLogo}
                            alt='YVR LOGO'
                            borderRadius='lg'
                        />
                        <Heading
                            size='lg'
                        >
                            Sign in to Dashboard
                        </Heading>
                        <Box w='35%'>
                            <Text
                                fontWeight='bold'
                            >
                                Email
                            </Text>
                            <Input
                                type='text'
                                placeholder='Email'
                                border='2px'
                                borderColor={colors.main.ceruBlue}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Box>
                        <Box w='35%'>
                            <Text
                                fontWeight='bold'
                            >
                                Password
                            </Text>
                            <Input
                                type='text'
                                placeholder='Password ...'
                                border='2px'
                                borderColor={colors.main.ceruBlue}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Box>
                        <Button
                            w='20%'
                            bg={colors.main.usafaBlue}
                            color='white'
                            onClick={async () => await handleLogin(email, password)}
                        >
                            Login
                        </Button>
                    </VStack>
                </Box>
            </Flex>
        </BaseLayout>
    );
};

export default Login;