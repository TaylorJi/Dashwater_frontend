import axios, { AxiosResponse } from "axios";
import { API_URL } from "../Environments";
import { Navigate } from 'react-router';

type createUserResponse = {
    email: string,
    password: string,
    role: string;
};

type updateUserResponse = {
    email: string,
    password: string,
    role: string;
};


type deleteUserResponse = {
    userId: string
};

// const getUser = async () => {
//     try {
//         // const response: any = await axios.get<any, AxiosResponse<string[]>>(`${API_URL}/user/getUser`);
//         const response = await axios.post("https://ma93xudga3.execute-api.us-east-1.amazonaws.com/prod/data/", {
//             operation: "scan"
//         });

//         if (response.status === 200) {
//             return response.data.data;
//         }

//         return null;

//     } catch (_err) {
//         return null;
//     }
// };

const getUser = async () => {
    try {
        const response = await axios.post("https://ma93xudga3.execute-api.us-east-1.amazonaws.com/prod/data/", {
            operation: "scan"
        });

        console.log("Response Status:", response.status);
        console.log("Response Data:", response.data);

        if (response.status === 200) {
            const users = response.data.items.map((item: { email: { S: string }, password: { S: string }, role: { S: string } }, index: number) => ({
                _id: index, // Temporarily use index as an ID
                email: item.email.S,
                password: item.password.S,
                role: item.role.S,
            }));

            console.log("Mapped Users:", users);
            return users;
        }

        return null;

    } catch (_err) {
        console.error("Error in getUser:", _err);
        return null;
    }
};

const createUser = async (user: any) => {
    // show up the new component allowing admin to create a new user 
    // currently hardcoded test user account create when create button is clicked 
    // update email, password part 
    const response: any = await axios.post<createUserResponse>(`${API_URL}/user/createUser`,
    {email: user.email, password: user.password, role: user.role}, 
    {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },);
    if (response.status === 200) {
        window.location.reload();
    } else {
    }
};



const deleteUser = async (idArray: string[]) => {

    for (let i = 0; i < idArray.length; i++) {
        const request: any = await axios.delete<deleteUserResponse>(`${API_URL}/user/deleteUser/${idArray[i]}`)
    }
    window.location.reload();
};

const getSingleUser = async (idArray: string[]) => {
    try {
        const response: any = await axios.get<any, AxiosResponse<string>>(`https://ma93xudga3.execute-api.us-east-1.amazonaws.com/prod/data/?email=${idArray[0]}`)
        if (response.status === 200) {
            global.email = response.data["email"];
            global.password = response.data["password"];
            global.role = response.data["role"];
            return response.data;
        }
        return null;

    } catch (_err) {
        return null;
    }
};

const updateUser = async (user: any) => {
    const response: any = await axios.put<updateUserResponse>(`${API_URL}/user/updateUser/${user._id}`,
    {email: user.email, password: user.password, role: user.role}, 
    {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },);
    if (response.status === 200) {
        window.location.reload();
    }
};

const AdminPortal = {
    getUser,
    createUser,
    deleteUser,
    getSingleUser,
    updateUser,
};

export default AdminPortal;