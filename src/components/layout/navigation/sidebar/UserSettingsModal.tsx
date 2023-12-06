import {
    Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Icon,
    Flex,
    Divider,
    useDisclosure
} from '@chakra-ui/react';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { userDataAtom, userDataSelector } from '../../../dashboard/atoms/globalDashboardAtoms';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Sessions from '../../../../api/Sessions/Sessions';
// import { editUser } from '../../../../../src/components/adminPortal/userPanel/CrudButtons';
import AdminPortal from '../../../../../src/api/AdminPortal/AdminPortal';
import EditModal from '../../../../../src/components/adminPortal/editModal/EditModal';

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
                localStorage.setItem("userRole", "");
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
    const editModal = useDisclosure();

<<<<<<< HEAD
    // const handleEditUserData = async() => {
    //     console.log("Edit user");
    //     // editUser(['yvruser@gmail.com'], editModal);
        // const aaa = localStorage.getItem('userEmail');
        // const bbb = [aaa];
        // await AdminPortal.getSingleUser(bbb);
        // await AdminPortal.getSingleUser(localStorage.getItem('userEmail'));
    //     await AdminPortal.getSingleUser(['yvruser@gmail.com']);
    //     editModal.onOpen();
    // };

    // const handleEditUserData = async (idArray: string[]) => {
    //     if (idArray === undefined) {
    //         idArray = [];
    //     }
    //     if (idArray.length !== 1) {
    //         toast.error('You should select only one user');
    //     } else {
    //         await AdminPortal.getSingleUser(idArray);
    //         console.log("idArray: ", idArray);
    //         editModal.onOpen()
    //     }
    // };

=======
>>>>>>> source-repo/main
    const handleEditUserData = async () => {
        const userEmail = localStorage.getItem('userEmail');
        let idArray: string[] = [];
    
        if (userEmail) {
            idArray = [userEmail];
        }
    
        if (idArray.length !== 1) {
            toast.error('You should select only one user');
        } else {
            await AdminPortal.getSingleUser(idArray);
            editModal.onOpen();
        }
    };
    

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
                    <Flex width="100%" justifyContent="space-between">
                        <Button
                            colorScheme='green'
                            rightIcon={<Icon as={FontAwesomeIcon} color='white' icon={faEdit} />}
                            onClick={async () => await handleEditUserData()}
                        >
                            Edit
                        </Button>
                        <Button
                            colorScheme='red'
                            rightIcon={<Icon as={FontAwesomeIcon} color='white' icon={faRightFromBracket} />}
                            onClick={async () => await handleLogout()}
                        >
                            Sign Out
                        </Button>
                        <EditModal isOpen={editModal.isOpen} onClose={editModal.onClose} />
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default UserSettingsModal;