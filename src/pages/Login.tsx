import React, { useState } from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import welcomeBgImage from '../assets/images/cristian-palmer-3leBubkp5hk-unsplash.png';
import loginFormBgImage from '../assets/images/login-form-background.png';
import yvrLogo from '../assets/images/yvr-logo.png';
import bcitlogo from '../assets/images/bcitlogo.png';
import { Box, Button, Flex, Heading, Image, Input, Link, Text, VStack } from '@chakra-ui/react';
import Authentication from '../api/Authentication/Authentication';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import colors from '../theme/foundations/colours';


const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    const handleLogin = async (email: string, password: string) => {
        setIsLoading(true);
        setIsDisabled(true);

        const user = await Authentication.authenticateUser(email, password);
        if (user) {
            navigate('/dashboard')
        } else {
            toast.error('User with this email and password does not exist.')
        }
        setIsLoading(false);
        setIsDisabled(false);
    }

    return (
        <BaseLayout isNavbarVisible={false}>
            <Flex
                w='100%'
                minH='100vh'
            >
                <Flex
                    w='50%'
                    bgImage={welcomeBgImage}
                    bgSize='cover'
                    bgRepeat='no-repeat'
                    opacity='0.9'
                    alignItems='center'
                    justifyContent='center'
                    direction='column'
                >
                    <Box
                        h='40%'
                        w='80%'
                        ml='10%'
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
                            mt='1rem'
                            ml='2rem'
                            mr='2rem'
                            mb='3rem'
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
                        mr='auto'
                        ml='15%'
                        src={bcitlogo}
                    />
                </Flex>
                <Flex
                    w='50%'
                    bgImage={loginFormBgImage}
                    bgSize='100% 100%'
                    bgRepeat='no-repeat'
                    alignItems='center'
                >
                    <VStack spacing='6'>
                        <Image
                            boxSize='30%'
                            src={yvrLogo}
                            alt='YVR LOGO'
                            borderRadius='lg'
                        />
                        <Heading
                            size='lg'
                        >
                            Sign In to Dashboard
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
                                placeholder='Password'
                                border='2px'
                                borderColor={colors.main.ceruBlue}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Box>
                        <Button
                            w='20%'
                            bg={colors.main.usafaBlue}
                            color='white'
                            isLoading={isLoading}
                            isDisabled={isDisabled}
                            onClick={async () => await handleLogin(email, password)}
                        >
                            Login
                        </Button>
                    </VStack>
                </Flex>
            </Flex>
        </BaseLayout>
    );
};

export default Login;