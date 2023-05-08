import axios, { AxiosResponse } from "axios";
import { type } from "os";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../Environments";


type createUserResponse = {
    email: string,
    password: string,
    role: string;
}


type deleteUserResponse = {
    userId: string
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
    console.log(idArray[0]);
    const request: any = await axios.delete<deleteUserResponse>(`${API_URL}/user/deleteUser/${idArray[0]}`)
    if (request != null) {
        console.log(request)
    } else {
        console.log("wrong")
    }
  
    

};

const editUser = async (idArray: string[]) => {
    console.log("AdminPortal editUser called")
    console.log(idArray[0])
    try {
            const response: any = await axios.get<any, AxiosResponse<string>>(`${API_URL}/user/getSingleUser/${idArray[0]}`)
        if (response.status === 200) {
            console.log('Get single user data: ' + response.data);
            return response.data;
        }

        console.log("try")
        return null;

    } catch (_err) {
        console.log("error")
        return null;
    }
};

const AdminPortal = {
    getUser,
    createUser,
    deleteUser,
    editUser,
};

export default AdminPortal;