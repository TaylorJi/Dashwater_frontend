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


const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const navigate = useNavigate();


    const handleStorageChange = (event: StorageEvent) => {
        if (event.key === 'failedLoginAttempts') {
            localStorage.setItem('failedLoginAttempts', `${event.oldValue}`);
        } else {
            localStorage.removeItem(`${event.key}`);
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('failedLoginAttempts')) {
            localStorage.setItem('failedLoginAttempts', JSON.stringify({'count': 0, 'lastFailedLoginAttemptDate': null}));
        }

        window.addEventListener('storage', handleStorageChange); // Event listener to prevent user from deleting or changing local storage item through browser

        const failedLoginAttempts = localStorage.getItem('failedLoginAttempts');

        let failedLoginAttemptsJSON: failedLoginAttempt = {};
        if (failedLoginAttempts !== null) {
            failedLoginAttemptsJSON = JSON.parse(failedLoginAttempts)
        }

        if (failedLoginAttemptsJSON.count && failedLoginAttemptsJSON.lastFailedLoginAttemptDate && failedLoginAttemptsJSON.count === 5
                                                && (Date.now() - failedLoginAttemptsJSON.lastFailedLoginAttemptDate) <= 5 * 60 * 1000) {
            setIsDisabled(true);
        } else if (failedLoginAttemptsJSON.lastFailedLoginAttemptDate && (Date.now() - failedLoginAttemptsJSON.lastFailedLoginAttemptDate) > 5 * 60 * 1000) {
            localStorage.setItem('failedLoginAttempts', JSON.stringify({'count': 0, 'lastFailedLoginAttemptDate': null}));
        }

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        }

    }, [])

    const handleFailedLoginAttempt = () => {

        const failedLoginAttempts = localStorage.getItem('failedLoginAttempts');

        let failedLoginAttemptsJSON: failedLoginAttempt = {};
        if (failedLoginAttempts !== null) {
            failedLoginAttemptsJSON = JSON.parse(failedLoginAttempts)
        }

        failedLoginAttemptsJSON.count += 1;
        localStorage.setItem('failedLoginAttempts', JSON.stringify({ 'count': failedLoginAttemptsJSON.count, 'lastFailedLoginAttemptDate': Date.now() }));

        if (failedLoginAttemptsJSON.count === 5) {
            setIsDisabled(true);

            const disableDuration = 5 * 60 * 1000; // User will be blocked for 5 minutes if they try to login using wrong email/password

            setTimeout(() => {
                setIsDisabled(false);
                localStorage.setItem('failedLoginAttempts', JSON.stringify({'count': 0, 'lastFailedLoginAttemptDate': null}));
            }, disableDuration);

            toast.error("Too many failed login attempts. Please wait 5 minutes before trying again.");
        }
    }



    const handleLogin = async (email: string, password: string) => {
        try {
            setIsLoading(true);

            const user = await Authentication.authenticateUser(email, password);
            if (user) {
                const isSessionCreated = await Sessions.createSession(user._id);
                if (isSessionCreated) {
                    localStorage.setItem('failedLoginAttempts', JSON.stringify({'count': 0, 'lastFailedLoginAttemptDate': null}));
                    navigate('/dashboard');
                } else {
                    setIsLoading(false);
                    toast.error('There was a problem creating a session. Try again.');
                }
            } else {
                handleFailedLoginAttempt();
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
                        h='40%'
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
                                isDisabled={isDisabled}
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
                                isDisabled={isDisabled}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Box>
                        <Button
                            w='20%'
                            bg={colors.main.usafaBlue}
                            color='white'
                            isLoading={isLoading}
                            isDisabled={isLoading || isDisabled}
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