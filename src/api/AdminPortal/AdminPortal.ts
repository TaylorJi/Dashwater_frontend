import axios, { AxiosResponse } from "axios";
import { type } from "os";
import { API_URL } from "../Environments";
import { toast } from 'react-hot-toast';



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

//20230505 EJ - created AdminPortal.ts
const getUser = async () => {
    try {

        const response: any = await axios.get<any, AxiosResponse<string[]>>(`${API_URL}/user/getUser`);

        if (response.status === 200) {
            // console.log('data: ' + response.data.data);
            return response.data.data;
        }

        return null;

    } catch (_err) {
        return null;
    }
};


const createUser = async () => {
    // show up the new component allowing admin to create a new user 
    // currently hardcoded test user account create when create button is clicked 
    // update email, password part 
    console.log("create is clicked")
    const request: any = await axios.post<createUserResponse>(`${API_URL}/user/createUser`,
    {email: "test23@test.ca", password: "testPass1#", role: "User"}, 
    {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },);
    console.log(request)
};
      

const deleteUser = async (idArray: string[]) => {
    for (let i = 0; i < idArray.length; i++) {
        console.log(idArray[i]);
        const request: any = await axios.delete<deleteUserResponse>(`${API_URL}/user/deleteUser/${idArray[i]}`)
        if (request != null) {
            console.log(request)
        } else {
            console.log("wrong")
        }
    }
    window.location.reload();
};

const getSingleUser = async (idArray: string[]) => {
    try {
        const response: any = await axios.get<any, AxiosResponse<string>>(`${API_URL}/user/getSingleUser/${idArray[0]}`)
        if (response.status === 200) {
            console.log('Get single user data: ' + response.data);
            global._id = response.data["_id"];
            global.email = response.data["email"];
            global.password = response.data["password"];
            global.role = response.data["role"];
            console.log('global._email: ' + global.email);
            console.log("global._id: " + global._id);
            return response.data;
        }

        console.log("try")
        return null;

    } catch (_err) {
        console.log("error")
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
        // return true;
    } else {
        // return false;
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