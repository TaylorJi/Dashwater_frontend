import React, { useState } from "react";
import { useForm, Controller } from 'react-hook-form';
// import { Form } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
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

type EditModalProps = {
    isOpen: boolean;
    onClose: () => void;
  };



const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose }) => {
    const [isLargeScreen] = useMediaQuery("(min-width: 800px)");

    const {
        handleSubmit,
        register,
        control,
        formState: { errors, isSubmitting },
    } = useForm();

    // function onSubmit(values) {
    //     return new Promise((resolve) => {
    //       setTimeout(() => {
    //         alert(JSON.stringify(values, null, 2))
    //         resolve()
    //       }, 3000)
    //     })
    // }

    //method="post" action="editUser"

    const onSubmit = async (data: any) => {
        data._id = global._id;
        data.role = global.role;
        console.log(data);
        AdminPortal.updateUser(data);
        // let response: Promise<boolean> = AdminPortal.updateUser(data);
        // if (await response) {
        //     toast.success("Successfully updated user!");
        // }
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
                        Edit User Info
                    </Text>
                </ModalHeader>
                <Divider ml={"1rem"} maxW={"95%"} marginBottom={"1.5rem"} />
                <ModalCloseButton onClick={onClose} />
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl isRequired mb={'12px'}>
                            <FormLabel>User ID</FormLabel>
                            <Input id="_id" placeholder='User ID' defaultValue={global._id} disabled={true} />
                        </FormControl>
                        <FormControl isRequired mb={'12px'}>
                            <FormLabel>Email</FormLabel>
                            <Input id="email" placeholder='Email' defaultValue={global.email} {...register('email', { shouldUnregister: true })} />
                        </FormControl>
                        <FormControl isRequired mb={'12px'}>
                            <FormLabel>Password</FormLabel>
                            <Input id="password" placeholder='Password' defaultValue={global.password} {...register('password', { shouldUnregister: true })} />
                        </FormControl>
                        <FormControl isRequired mb={'1px'}>
                            <FormLabel>Role</FormLabel>
                            <RadioGroup id="role" defaultValue={global.role} name="role"
                                onChange={
                                    function(value) {
                                        global.role = value;
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
                                Update
                            </Button>
                        </HStack>
                    </form>
                </ModalBody>
            </ModalContent>

        </Modal>
    );
};

export default EditModal;