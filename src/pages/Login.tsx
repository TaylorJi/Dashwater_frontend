import React, { useEffect, useState } from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import loginFormBgImage from '../assets/images/login-form-background.png';
import yvrLogo from '../assets/images/yvr-logo.png';
import bcitlogo from '../assets/images/bcitlogo.png';
import { Box, Button, Flex, Heading, Image, Input, Link, Text, VStack } from '@chakra-ui/react';
import Authentication from '../api/Authentication/Authentication';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import colors from '../theme/foundations/colours';
import Sessions from '../api/Sessions/Sessions';
import { useResetRecoilState } from 'recoil';
import { sidebarOpenAtom } from '../components/layout/navigation/atoms/sidebarAtoms';


const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const resetSidebarOpen = useResetRecoilState(sidebarOpenAtom);

    useEffect(() => {
        resetSidebarOpen();
    }, []);

    const handleLogin = async (email: string, password: string) => {
        try {
            setIsLoading(true);

            const user = await Authentication.authenticateUser(email, password);
            if (user) {
                const isSessionCreated = await Sessions.createSession(user._id);
                if (isSessionCreated) {
                    navigate('/dashboard');
                } else {
                    setIsLoading(false);
                    toast.error('There was a problem creating a session. Try again.');
                }
            } else {
                setIsLoading(false);
                toast.error('User with this email and password does not exist.');
            }
        } catch (err) {
            setIsLoading(false);
            toast.error('There was a problem logging in. Try again.');
        }

    }

    return (
        <BaseLayout isNavbarVisible={false}>
            <Flex
                w='100%'
                minH='100vh'
            >
                <Flex
                    w='50%'
                    bgImage="https://i.imgur.com/s9rWIHK.jpg"
                    bgSize='cover'
                    bgRepeat='no-repeat'
                    opacity='0.9'
                    alignItems='center'
                    justifyContent='center'
                    direction='column'
                >
                    <Box
                        h='30%'
                        w='80%'
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
                            mx='2rem'
                            mb='2rem'
                            color='white'
                        >
                            The YVR International Airport collaborates with BCIT Internet of Things to
                            introduce the smart devices water monitoring project. This project is built by
                            students from end-to-end. The dashboard provides real-time data on water
                            metrics by leveraging in-house built devices with sensors and data visualization.
                            This project delivers actionable insights that improve safety, reliability, and
                            sustainability of YVR's water infrastructure.
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
                        ml='10%'
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
                                type='password'
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
                            isDisabled={isLoading}
                            _hover={{
                                bg: colors.main.activeMainButton
                            }}
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