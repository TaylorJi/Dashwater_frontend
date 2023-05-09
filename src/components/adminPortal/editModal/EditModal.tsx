import React, { useState } from "react";
import { useForm } from 'react-hook-form';
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
import CrudButtons from "../user/CrudButtons";

type EditModalProps = {
    isOpen: boolean;
    onClose: () => void;
  };



const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose }) => {
    const [isLargeScreen] = useMediaQuery("(min-width: 800px)");


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
                    <form method="post" action="editUser">
                        <FormControl isRequired mb={'12px'}>
                            <FormLabel>User ID</FormLabel>
                            <Input placeholder='User ID' value={global._id} disabled={true} />
                        </FormControl>
                        <FormControl isRequired mb={'12px'}>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder='Email' value={global.email} />
                        </FormControl>
                        <FormControl isRequired mb={'12px'}>
                            <FormLabel>Password</FormLabel>
                            <Input placeholder='Password' value={global.password} />
                        </FormControl>
                        <FormControl isRequired mb={'12px'}>
                            <FormLabel>Role</FormLabel>
                            <RadioGroup defaultValue={global.role} >
                                <HStack spacing='20px'>
                                    <Radio value='User'>User</Radio>
                                    <Radio value='Admin'>Admin</Radio>
                                </HStack>
                            </RadioGroup>
                        </FormControl>

                        <Button mt={4} size="lg" type="submit" >
                            Update
                        </Button>
                    </form>
                </ModalBody>
            </ModalContent>

        </Modal>
    );
};

export default EditModal;