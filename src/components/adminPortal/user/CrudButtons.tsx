import React, { useEffect, useState } from 'react';
import Icon from '@chakra-ui/icon';
import { toast } from 'react-hot-toast';
import { Button, Stack, Text } from '@chakra-ui/react';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import colors from '../../../theme/foundations/colours';
import AdminPortal from '../../../api/AdminPortal/AdminPortal';

const CrudButtons: React.FC = () => {

    global.idArray = [];

    const checkIdArrayForDelete = (idArray: string[]) => {
        if (idArray.length <= 0) {
            toast.error('You should select user first');
        } else {
            AdminPortal.deleteUser(idArray);
        }
    };

    const checkIdArrayForEdit = (idArray: string[]) => {
        if (idArray.length !== 1) {
            toast.error('You should select only one user');
        } else {
            AdminPortal.editUser(idArray);
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
                    onClick={AdminPortal.createUser}
                >
                    Create
                </Button>
            </Stack>
    );
};

export default CrudButtons;