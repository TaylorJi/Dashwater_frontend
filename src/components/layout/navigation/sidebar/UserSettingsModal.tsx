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
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { userDataAtom, userDataSelector } from '../../../dashboard/atoms/globalDashboardAtoms';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Sessions from '../../../../api/Sessions/Sessions';

type UserSettingsModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

const UserSettingsModal: React.FC<UserSettingsModalProps> = ({ isOpen, onClose }) => {

    const resetUserData = useResetRecoilState(userDataAtom);
    const navigate = useNavigate();
    const userData = useRecoilValue(userDataSelector);

    const handleLogout = async () => {
        try {
            const logOutResponse = await Sessions.deleteSession();

            if (logOutResponse) {
                resetUserData();
                document.cookie = 'sessionCookie= ; expires = Thu, 01 Jan 1970 00:00:00 GMT'
                navigate('../')
            } else {
                toast.error('There was a problem logging out. Try again.');
            }
        } catch (_err) {
            toast.error('There was a problem logging out. Try again.');
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>User Settings</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>
                        <Text as={'span'} fontWeight='semibold'>Email:</Text> {localStorage.getItem("userEmail")}
                    </Text>
                    <Text>
                        <Text as={'span'} fontWeight='semibold'>Access Level:</Text> {localStorage.getItem("userRole")}
                    </Text>
                    <Divider mt='1rem' />
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme='red'
                        rightIcon={<Icon as={FontAwesomeIcon} color='white' icon={faRightFromBracket} />}
                        onClick={async () => await handleLogout()}
                    >
                        Sign Out
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default UserSettingsModal;