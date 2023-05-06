import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Checkbox } from '@chakra-ui/react';
import { toast } from 'react-hot-toast';
import colors from '../../../theme/foundations/colours';
import AdminPortal from '../../../api/AdminPortal/AdminPortal';

const UserTable: React.FC = () => {

    // const [userData, setUserData] = useState<userDataType | null>(null);
    const [userData, setUserData] = useState([]);
    let idArray: string[] = [];

    const getUserData = async () => {
        try {
            const data = await AdminPortal.getUser();
            // console.log(data);
            if (data) {
                setUserData(data);
                // console.log(data);
            } else {
                toast.error('Oh no! There was a problem fetching weather data. Please refresh the page.');
            }

        } catch (_err) {
            toast.error('Oh no! There was a problem fetching weather data. Please refresh the page.');
        }

    };

    const onSelectedChange = (id: string) => {
        if (idArray.includes(id)) {
            let index = idArray.indexOf(id);
            idArray.splice(index, 1);
        } else {
            idArray.push(id);
        }
        global.idArray = idArray;
    }

    useEffect(() => {
        getUserData();
    }, []);

    // console.log(userData[0]);
    // const userSettingsData = useState<userDataType | null>(userData)[0];

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
                                <Tr>
                                    <Td>
                                        <Checkbox
                                            onChange={() => onSelectedChange(user['_id'])}
                                        ></Checkbox>
                                    </Td>
                                    <Td>{user['_id']}</Td>
                                    <Td>{user['email']}</Td>
                                    <Td>{user['password']}</Td>
                                    <Td>{user['role']}</Td>
                                </Tr>
                            )}
                        ) : <></>
                    }

                    
                    {/* {userData ?
                        userData['data'].map(user => {
                            return (
                                <Tr>
                                <Td>{user._id}</Td>
                                <Td>{user.email}</Td>
                                <Td>{user.password}</Td>
                                <Td>{user.role}</Td>
                            </Tr>
                            )
                        }) : <></>
                    } */}
                </Tbody>
            </Table>        
        </>
    )
};

export default UserTable;