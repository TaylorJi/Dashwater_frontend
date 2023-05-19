import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  RadioGroup,
  Radio,
  Input,
  FormControl,
  FormLabel,
  ModalBody,
  ModalCloseButton,
  Button,
  Divider,
  HStack,
  useMediaQuery,
} from "@chakra-ui/react";
import colors from "../../../theme/foundations/colours";
import typography from "../../../theme/foundations/typography";
import AdminPortal from "../../../api/AdminPortal/AdminPortal";
import { toast } from 'react-hot-toast';


type CreateModalProps = {
    isOpen: boolean;
    onClose: () => void;
  };


const CreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose }) => {
    const [isLargeScreen] = useMediaQuery("(min-width: 800px)");

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }; 

    const bcrypt = require('bcryptjs');

    const hashPassword = async (password: string) => {
        try {
            const salt = await bcrypt.genSalt(10); // version of hashing
            const hashedPassword =  await bcrypt.hash(password, salt); // hash password
            return hashedPassword;
    
        } catch (err) {
            console.error("Error retrieving user.");
            return null;
        }
    }

    var role = "User";

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data: any) => {
        data.role = role;
        let validation: boolean = true;
        if (!checkEmail(data.email)) {
            toast.error('Wrong email format');
            validation = false;
        } 
        if (!checkPassword(data.password)) {
            toast.error('Password length should be between 8 to 20 which contains one uppercase, one numeric digit and one special character');
            validation = false;
        }
        // let hashedPW = hashPassword(data.password);
        // if (hashedPW) {
        //     data.password = hashedPW;
        // }
        if (validation) {
            AdminPortal.createUser(data);
        }
    }

    const checkEmail = (email: string): boolean => {
        let regexp: any = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        return regexp.test(email);
    }

    const checkPassword = (pw: string): boolean => {
        let regexp: any = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/);
        return regexp.test(pw);
    }


    return (
        <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset={"slideInBottom"}
        size={"xl"}
        >
            <ModalOverlay />
            <ModalContent maxW={isLargeScreen ? "45%" : "60%"}>
                <ModalHeader ml={"0.5%"}>
                    <Text
                        fontFamily={typography.fonts.heading}
                        fontSize={typography.fontSizes.xl}
                    >
                        Create User 
                    </Text>
                </ModalHeader>
                <Divider ml={"1rem"} maxW={"95%"} marginBottom={"1.5rem"} />
                <ModalCloseButton onClick={onClose} />
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl isRequired mb={'12px'}>
                            <FormLabel>Email</FormLabel>
                            <Input id="email" placeholder='Email' {...register('email', { shouldUnregister: true })} />
                        </FormControl>
                        <FormControl isRequired mb={'12px'}>
                            <FormLabel>Password</FormLabel>
                            <Input id="password" type={showPassword ? "text" : "password"} placeholder="Password" defaultValue=""
                            {...register('password', { shouldUnregister: true })} />
                        <Button onClick={togglePasswordVisibility} mt="2" size="sm">
                        {showPassword ? 'Hide' : 'Show'} Password
                        </Button>
                        </FormControl>
                        <FormControl isRequired mb={'1px'}>
                            <FormLabel>Role</FormLabel>
                            <RadioGroup id="role" defaultValue="User"
                                onChange={
                                    function(value) {
                                        role = value;
                                    }
                                } >
                                <HStack spacing='20px'>
                                    <Radio value='User'>User</Radio>
                                    <Radio value='Admin'>Admin</Radio>
                                </HStack>
                            </RadioGroup>
                        </FormControl>

                        <HStack
                        spacing={isLargeScreen ? "1.5rem" : "0.5rem"}
                        mr={isLargeScreen ? "1rem" : "0.5rem"}
                        mt={"1rem"}
                        justify="end"
                        mb={"1rem"}
                        >
                            <Button 
                            minW={isLargeScreen ? "7rem" : "3rem"}
                            color={colors.main.usafaBlue}
                            bg={"white"}
                            border={`2px solid ${colors.main.usafaBlue}`}
                            onClick={onClose}>
                                Cancel
                            </Button>
                            <Button 
                            minW={isLargeScreen ? "7rem" : "3rem"}
                            color={"white"}
                            bg={colors.main.usafaBlue}
                            _hover={{
                            bg: colors.main.ceruBlue,}}
                            type="submit"
                            isLoading={isSubmitting} >
                                Create
                            </Button>
                        </HStack>
                    </form>
                </ModalBody>
            </ModalContent>

        </Modal>
    );
};

export default CreateModal;