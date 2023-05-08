import axios, { AxiosResponse } from "axios";
import { type } from "os";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../Environments";


type createUserResponse = {
    email: string,
    password: string,
    role: string;
}

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
    }
      

const deleteUser = async (idArray: string[]) => {
    console.log(idArray);
};

const editUser = async (idArray: string[]) => {
    console.log(idArray);
};

const AdminPortal = {
    getUser,
    createUser,
    deleteUser,
    editUser
};

export default AdminPortal;