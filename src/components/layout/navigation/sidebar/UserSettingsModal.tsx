import {
    Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Icon,
    Divider
} from '@chakra-ui/react';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type UserSettingsModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

const UserSettingsModal: React.FC<UserSettingsModalProps> = ({ isOpen, onClose }) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>User Settings</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>
                        <Text as={'span'} fontWeight='semibold'>Email:</Text> testytesttest@my.bcit.ca
                    </Text>
                    <Text>
                        <Text as={'span'} fontWeight='semibold'>Access Level:</Text> Admin
                    </Text>
                    <Divider mt='1rem' />
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme='red'
                        rightIcon={<Icon as={FontAwesomeIcon} color='white' icon={faRightFromBracket} />}
                    >
                        Sign Out
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default UserSettingsModal;