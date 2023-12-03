import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Button, Stack, Text, UseDisclosureReturn, useDisclosure } from '@chakra-ui/react';
import colors from '../../../theme/foundations/colours';
import AdminPortal from '../../../api/AdminPortal/AdminPortal';
import EditModal from '../editModal/EditModal';
import CreateModal from '../createModal/CreateModal';
import { useRecoilState } from "recoil";
// import { useNavigate } from "react-router-dom";
import { allUsersDetails } from '../UserDetailsWrapper/userManagerAtoms';

export const editUser = async (idArray: string[], editModal: UseDisclosureReturn) => {
    if (idArray === undefined) {
        idArray = [];
    }
    if (idArray.length !== 1) {
        toast.error('You should select only one user');
    } else {
        await AdminPortal.getSingleUser(idArray);
        editModal.onOpen();
    }
};


const CrudButtons: React.FC = () => {
    // const navigate = useNavigate();
    const [userData, setUserData] = useRecoilState<usersDataType[]>(allUsersDetails);
    const editModal = useDisclosure();
    const createModal = useDisclosure();

    const checkIdArrayForDelete = async (idArray: string[]) => {
        if (idArray === undefined) {
            idArray = [];
        }
        // if (idArray.length <= 0) {
        //     toast.error('You should select user first');
        if (idArray.length !== 1) { // changed it to 1 as AWS accepts only one user at a time
            toast.error('You should select only one user');
        } else {
            let success = await AdminPortal.deleteUser(idArray);
            if (success) {
                const newData = await AdminPortal.getUser();
                if (newData) {
                    setUserData(newData);
                }
                // navigate('/dashboard');
                // navigate("/adminPortal");
            }
            // AdminPortal.deleteUser(idArray);
        }
    };

    const checkIdArrayForEdit = async (idArray: string[]) => {
        if (idArray === undefined) {
            idArray = [];
        }
        if (idArray.length !== 1) {
            toast.error('You should select only one user');
        } else {
            await AdminPortal.getSingleUser(idArray);
            editModal.onOpen()
        }
    };

    return (
            <Stack direction='row' spacing={4} align='center'>
            <Text ml="79%"></Text>
                <Button 
                    size='sm'
                    bg='main.acidGreen'
                    ml='0.5rem'
                    color='white'
                    fontSize='sm'
                    w="5%"
                    _hover={{
                        bg: colors.main.mossGreen
                    }}
                    onClick={() => checkIdArrayForEdit(global.idArray)}
                >
                    Edit
                </Button>
                <Button 
                    size='sm'
                    bg='main.acidGreen'
                    ml='0.5rem'
                    color='white'
                    fontSize='sm'
                    w="5%"
                    _hover={{
                        bg: colors.main.mossGreen
                    }}
                    onClick={() => checkIdArrayForDelete(global.idArray)}
                >
                    Delete
                </Button>
                <Button 
                    size='sm'
                    bg='main.acidGreen'
                    ml='0.5rem'
                    color='white'
                    fontSize='sm'
                    w="5%"
                    _hover={{
                        bg: colors.main.mossGreen
                    }}
                    onClick={createModal.onOpen}
                >
                    Create
                </Button>
                <EditModal isOpen={editModal.isOpen} onClose={editModal.onClose} />
                <CreateModal isOpen={createModal.isOpen} onClose={createModal.onClose} />
            </Stack>
    );
};

export default CrudButtons;