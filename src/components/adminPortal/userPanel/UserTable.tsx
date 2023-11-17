import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Checkbox } from '@chakra-ui/react';
import { toast } from 'react-hot-toast';
import colors from '../../../theme/foundations/colours';
import AdminPortal from '../../../api/AdminPortal/AdminPortal';

const UserTable: React.FC = () => {

    const [userData, setUserData] = useState([]);
    let idArray: string[] = [];

    function isVoid(variable: unknown): variable is void {
        return typeof variable === 'undefined';
    }

    const getUserData = async () => {
        try {
            const data = await AdminPortal.getUser();
            if(!isVoid(data)) {
                if (data) {
                    setUserData(data);
                } else {
                    toast.error('Oh no! There was a problem fetching user data. Please refresh the page.');
                }
            }

        } catch (_err) {
            console.error("Error in getUserData:", _err);
            toast.error('Oh no! There was a problem fetching user data. Please refresh the page.');
        }

    };

    const onSelectedChange = (email: string) => {
        if (idArray.includes(email)) {
            let index = idArray.indexOf(email);
            idArray.splice(index, 1);
        } else {
            idArray.push(email);
        }
        global.idArray = idArray;
    }

    useEffect(() => {
        getUserData();
    }, []);


    return (
        <>
            <Table >

                <Thead bg={colors.main.lavender} h="3rem">
                    <Tr>
                        <Th color={colors.main.usafaBlue}></Th>
                        <Th color={colors.main.usafaBlue}>Id</Th>
                        <Th color={colors.main.usafaBlue}>Email</Th>
                        <Th color={colors.main.usafaBlue}>Password</Th>
                        <Th color={colors.main.usafaBlue}>Role</Th>
                    </Tr>
                </Thead>
                <Tbody>

                    {userData ?
                        userData.map(
                            (user) => {
                                return (
                                    <Tr key={user['_id']}>
                                        <Td>
                                            <Checkbox
                                                onChange={() => onSelectedChange(user['email'])}
                                            ></Checkbox>
                                        </Td>
                                        <Td>{user['_id']}</Td>
                                        <Td>{user['email']}</Td>
                                        <Td>*******</Td>
                                        <Td>{user['role']}</Td>
                                    </Tr>
                                )
                            }
                        ) : <></>
                    }
                </Tbody>
            </Table>
        </>
    )
};

export default UserTable;