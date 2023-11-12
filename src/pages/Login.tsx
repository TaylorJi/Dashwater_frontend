import React, { useEffect, useState } from "react";
import BaseLayout from "../components/layout/BaseLayout";
import loginFormBgImage from "../assets/images/login-form-background.png";
import yvrLogo from "../assets/images/yvr-logo.png";
import bcitlogo from "../assets/images/bcitlogo.png";
// import { Box, Button, Flex, Heading, Image, Input, Link, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Link,
  Text,
  VStack,
  useMediaQuery,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Spacer,
  PopoverHeader,
  Icon,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import Authentication from "../api/Authentication/Authentication";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import colors from "../theme/foundations/colours";
import Sessions from "../api/Sessions/Sessions";
import { useResetRecoilState } from "recoil";
import { sidebarOpenAtom } from "../components/layout/navigation/atoms/sidebarAtoms";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../components/helpers/userPool";
// import { randomBytes } from 'crypto';
// import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

const Login: React.FC = () => {
    // for faster testing purpose
    const [email, setEmail] = useState("testAdmin29@email.com");
    const [password, setPassword] = useState("Testing123!");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const resetSidebarOpen = useResetRecoilState(sidebarOpenAtom);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const [isLargeScreen] = useMediaQuery("(min-width: 1600px)");

  useEffect(() => {
    resetSidebarOpen();
  }, []);

  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === "failedLoginAttempts") {
      localStorage.setItem("failedLoginAttempts", `${event.oldValue}`);
    } else {
      localStorage.removeItem(`${event.key}`);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("failedLoginAttempts")) {
      localStorage.setItem(
        "failedLoginAttempts",
        JSON.stringify({ count: 0, lastFailedLoginAttemptDate: null })
      );
    }

    window.addEventListener("storage", handleStorageChange); // Event listener to prevent user from deleting or changing local storage item through browser

    const failedLoginAttempts = localStorage.getItem("failedLoginAttempts");

    let failedLoginAttemptsJSON: failedLoginAttempt = {};
    if (failedLoginAttempts !== null) {
      failedLoginAttemptsJSON = JSON.parse(failedLoginAttempts);
    }

    if (
      failedLoginAttemptsJSON.count &&
      failedLoginAttemptsJSON.lastFailedLoginAttemptDate &&
      failedLoginAttemptsJSON.count === 5 &&
      Date.now() - failedLoginAttemptsJSON.lastFailedLoginAttemptDate <=
        5 * 60 * 1000
    ) {
      setIsDisabled(true);
    } else if (
      failedLoginAttemptsJSON.lastFailedLoginAttemptDate &&
      Date.now() - failedLoginAttemptsJSON.lastFailedLoginAttemptDate >
        5 * 60 * 1000
    ) {
      localStorage.setItem(
        "failedLoginAttempts",
        JSON.stringify({ count: 0, lastFailedLoginAttemptDate: null })
      );
    }

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleFailedLoginAttempt = () => {
    const failedLoginAttempts = localStorage.getItem("failedLoginAttempts");

    let failedLoginAttemptsJSON: failedLoginAttempt = {};
    if (failedLoginAttempts !== null) {
      failedLoginAttemptsJSON = JSON.parse(failedLoginAttempts);
    }

    failedLoginAttemptsJSON.count += 1;
    localStorage.setItem(
      "failedLoginAttempts",
      JSON.stringify({
        count: failedLoginAttemptsJSON.count,
        lastFailedLoginAttemptDate: Date.now(),
      })
    );

    if (failedLoginAttemptsJSON.count === 5) {
      setIsDisabled(true);

      const disableDuration = 5 * 60 * 1000; // User will be blocked for 5 minutes if they try to login using wrong email/password

      setTimeout(() => {
        setIsDisabled(false);
        localStorage.setItem(
          "failedLoginAttempts",
          JSON.stringify({ count: 0, lastFailedLoginAttemptDate: null })
        );
      }, disableDuration);

      toast.error("You've tried too many times to log in - wait 5 minutes");
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
      });

      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      // auth function is from Cognito
      user.authenticateUser(authDetails, {
        onSuccess: async (data) => {
          console.log("Cognito Response: ", data);
          console.log(data.getIdToken().getJwtToken());
          localStorage.setItem('idToken', data.getIdToken().getJwtToken());

          const idToken = data.getIdToken().getJwtToken();
            try {
              const response = await fetch("http://localhost:8085/api/session/createSession", {
                // Replace with your backend API endpoint
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${idToken}`,
                },
                body: JSON.stringify({ userId: email }), // Replace with the payload you need to send
              });

              const sessionResponse = await response.json();
              console.log(sessionResponse);
              if (sessionResponse.success) {
                // Handle successful session creation
                navigate("/dashboard");
              } else {
                // Handle failure
                toast.error("There was a problem creating a session. Try again.");
                
              }
            } catch (error) {
              console.error("Error creating session:", error);
              toast.error("There was a problem with the server. Try again.");
            }
    
            setIsLoading(false);
    



          // handle the session

          // const isSessionCreated = await Sessions.createSession(
          //     "64647e0fd22c80b2bec73cad"
          //   ); // it's hardcoded as we don't have user id which is a string of 12 bytes or a string of 24 hex characters or an integer
          //   if (isSessionCreated) {
          //     localStorage.setItem(
          //       "failedLoginAttempts",
          //       JSON.stringify({ count: 0, lastFailedLoginAttemptDate: null })
          //     );
          //     localStorage.setItem("userEmail", email);
          //     // localStorage.setItem("userRole", user["role"]);
          //     // global.userRole = user["role"];
          //     localStorage.setItem("authenticated", "true");
          //     navigate("/dashboard");
          //   } else {
          //     setIsLoading(false);
          //     toast.error("There was a problem creating a session. Try again.");
          //   }
        },
        onFailure: (err) => {
          console.error("Cognito Response: ", err);
        //   handleFailedLoginAttempt();
          setIsLoading(false);
          toast.error("User with this email and password does not exist.");
        },
      });
    } catch (err) {
      setIsLoading(false);
      toast.error("There was a problem logging in. Try again.");
    }
  };

  // const handleLogin = async (email: string, password: string) => {
  //     try {
  //         setIsLoading(true);

  //         const user = await Authentication.authenticateUser(email, password);
  //         if (user) {
  //             // const isSessionCreated = await Sessions.createSession(user.email);
  //             const isSessionCreated = await Sessions.createSession("64647e0fd22c80b2bec73cad"); // it's hardcoded as we don't have user id which is a string of 12 bytes or a string of 24 hex characters or an integer
  //             if (isSessionCreated) {
  //                 localStorage.setItem('failedLoginAttempts', JSON.stringify({'count': 0, 'lastFailedLoginAttemptDate': null}));
  //                 localStorage.setItem('userEmail', user["email"]);
  //                 localStorage.setItem('userRole', user["role"]);
  //                 global.userRole = user["role"];
  //                 localStorage.setItem('authenticated', 'true');
  //                 navigate('/dashboard');
  //             } else {
  //                 setIsLoading(false);
  //                 toast.error('There was a problem creating a session. Try again.');
  //             }
  //         } else {
  //             handleFailedLoginAttempt();
  //             setIsLoading(false);
  //             toast.error('User with this email and password does not exist.');
  //         }
  //     } catch (err) {
  //         setIsLoading(false);
  //         toast.error('There was a problem logging in. Try again.');
  //     }

  // }

  return (
    <BaseLayout isNavbarVisible={false}>
      <Flex w="100%" minH="100vh">
        <Flex
          w="50%"
          bgImage="https://i.imgur.com/s9rWIHK.jpg"
          bgSize="cover"
          bgRepeat="no-repeat"
          opacity="0.9"
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Box
            h={isLargeScreen ? "35%" : "55%"}
            w="80%"
            bgColor="rgba(0, 36, 59, 0.5)"
            borderRadius="md"
          >
            <Heading py="1rem" color="white" textAlign="center">
              YVR x BCIT IoT
            </Heading>
            <Text
              mt="1rem"
              mx="2rem"
              mb="2rem"
              color="white"
              fontSize={isLargeScreen ? "md" : "sm"}
            >
              The YVR International Airport collaborates with BCIT Internet of
              Things to introduce the smart devices water monitoring project.
              This project is built by students from end-to-end. The dashboard
              provides real-time data on water metrics by leveraging in-house
              built devices with sensors and data visualization. This project
              delivers actionable insights that improve safety, reliability, and
              sustainability of YVR's water infrastructure.
            </Text>
            <Link
              ml="2rem"
              color="white"
              textDecoration="underline"
              href="https://www.bcit.ca/applied-research/centre-for-internet-of-things-iot/"
              isExternal
            >
              Learn more about BCIT IoT
            </Link>
          </Box>
          <Image mt="1rem" mr="auto" ml="10%" src={bcitlogo} />
        </Flex>
        <Flex
          w="50%"
          bgImage={loginFormBgImage}
          bgSize="100% 100%"
          bgRepeat="no-repeat"
          alignItems="center"
        >
          <VStack spacing="6">
            <Image
              boxSize="30%"
              src={yvrLogo}
              alt="YVR LOGO"
              borderRadius="lg"
            />
            <Heading size="lg">Sign In to Dashboard</Heading>
            <Box w="35%">
              <Text fontWeight="bold" mb={"0.5rem"}>
                Email
              </Text>
              <Input
                type="text"
                placeholder="Email"
                // value = "testAdmin29@email.com"
                border="2px"
                borderColor={colors.main.ceruBlue}
                isDisabled={isDisabled}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box w="35%">
              {/* <Text
                                fontWeight='bold'
                                mb={'0.5rem'}
                            >
                                Password
                            </Text> */}
              <Flex direction="row">
                <Text fontWeight="bold" mb={"0.5rem"}>
                  Password
                </Text>
                <Spacer />
                <Icon
                  as={FontAwesomeIcon}
                  pt={"0.3rem"}
                  mr={"0.3rem"}
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                  w={5}
                />
              </Flex>
              <Input
                // type='password'
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                // value = "Testing123!"
                border="2px"
                borderColor={colors.main.ceruBlue}
                isDisabled={isDisabled}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Button
              w="20%"
              bg={colors.main.usafaBlue}
              color="white"
              isLoading={isLoading}
              isDisabled={isLoading || isDisabled}
              _hover={{
                bg: colors.main.activeMainButton,
              }}
              onClick={async () => await handleLogin(email, password)}
            >
              Login
            </Button>
            <Popover>
              <PopoverTrigger>
                <Text
                  as="u"
                  textAlign={"center"}
                  mb={"1rem"}
                  _hover={{
                    cursor: "pointer",
                  }}
                >
                  Forgot password?
                </Text>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Contact Information</PopoverHeader>
                <PopoverBody>
                  Please contact 'yvradmin@gmail.com' to change a password.
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </VStack>
        </Flex>
      </Flex>
    </BaseLayout>
  );
};

export default Login;
