import axios from 'axios';
// import axios, { AxiosResponse } from "axios";
// import { API_URL, USER_URL } from "../Environments";
// import { Navigate } from 'react-router';
// const axios = require('axios');

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


const sessionId = localStorage.getItem('sessionId');


const getUser = () => {
    console.log("calling getUser");
    const USER_URL = 'https://c5hn9pagt5.execute-api.us-west-2.amazonaws.com/prod/user';
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', USER_URL);
    
    xhr.setRequestHeader("Authorization", `Bearer ${sessionId}`);
    
    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            console.log(response);
        } else {
            console.error("Error in getUser: HTTP status " + xhr.status);
        }
    };
    
    xhr.onerror = function () {
        console.error("Network error occurred.");
    };
    
    xhr.send();
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

// const getUser = async () => {
//     try {
//         const response = await axios.post(USER_URL, {
//             headers: {
//                 "Authorization": `Bearer ${sessionId}`
//             },
//             operation: "scan"
//         },
//         {
//             headers: { Authorization: `${sessionId}` },
//         }
//         );

//         if (response.status === 200) {
//             // const users = response.data.items.map((item: { email: { S: string }, password: { S: string }, role: { S: string } }, index: number) => ({
//             const users = response.data.items.map((item: { email: string, role: string }, index: number) => ({
//                 _id: index, // Temporarily use index as an ID
//                 email: item.email,
//                 role: item.role,
//             }));

//             return users;
//         }

//         return null;

//     } catch (_err) {
//         console.error("Error in getUser:", _err);
//         return null;
//     }
// };


// const getUser = async () => {
//     const currentUrl = window.location.href;
//     console.log(`Current URL: ${currentUrl}`);
//     console.log("getUser called");
//     console.log(`sessionId: ${sessionId}`);
    // const headers = {
    //     headers: {
    //         'Content-Type': 'text/plain',
    //         'Authorization': `Bearer ${sessionId}`
    //     }
    // };

    // // const response = await axios.get(USER_URL, headers);
    // // const response = axios.get(USER_URL, headers);
    // // const response = await axios.get(USER_URL, headers);
    // // const response: any = await axios.get<any, AxiosResponse<string[]>>(`${USER_URL}`, { withCredentials: true });
    // const response: any = await axios.post<any, any>(USER_URL, headers);

    // const response = await axios.post(
    //     `${API_URL}/device/getAllDevicesSettings`,
    //     { token: sessionId },
    //     { withCredentials: true }
    // );

    
    // try {
    //     const headers = {
    //         headers: {
    //             "Authorization": `Bearer ${sessionId}`
    //         }
    //     };

    //     const response = await axios.get(USER_URL2, headers);

    //     // if (response.status === 200) {
    //     //     console.log(response.data);
    //     //     const users = response.data.items.map((item: { email: string, role: string }, index: number) => ({
    //     //         _id: index,
    //     //         email: item.email,
    //     //         role: item.role,
    //     //     }));

    //     //     return users;
    //     // }

    //     return null;

    // } catch (_err) {
    //     console.error("Error in getUser:", _err);
    //     return null;
    // }
// };





const createUser = async (user: any) => {
    console.log("creasteUser called");
    // try {
    //     const sessionId = localStorage.getItem('sessionId');
    //     const response: any = await axios.post(USER_URL,
    //         {
    //             operation: "add",
    //             email: user.email,
    //             password: user.password,
    //             role: user.role
    //         },
    //         {
    //             headers: { Authorization: `${sessionId}` },
    //         }
    //     );

    //     if (response.status === 200) {
    //         window.location.reload();
    //     } else {
    //         console.log("Response Status:", response.status);
    //         console.log("Response Data:", response.data);
    //     }

    // } catch (error) {
    //     console.error("Error in createUser:", error);
    // }
};

const deleteUser = async (idArray: string[]) => {
    console.log("deleteUser called");
    // try {
    //     const sessionId = localStorage.getItem('sessionId');
    //     const request: any = await axios.post(USER_URL,
    //         {
    //             operation: "delete",
    //             emails: idArray
    //         },
    //         {
    //             headers: { Authorization: `${sessionId}` },
    //         }
    //         );
    //     if (request.status === 200) {
    //         window.location.reload();
    //     }
    // } catch (_err) {
    //     console.error("Error in deleteUser:", _err);
    // }
    // for (let i = 0; i < idArray.length; i++) {
    //     const request: any = await axios.delete<deleteUserResponse>(`${API_URL}/user/deleteUser/${idArray[i]}`)
    // }
    // window.location.reload();
};

const getSingleUser = async (idArray: string[]) => {
    console.log("getSingleUser called");
    // try {
    //     const sessionId = localStorage.getItem('sessionId');
    //     // const response: any = await axios.get<any, AxiosResponse<string>>(`https://ma93xudga3.execute-api.us-east-1.amazonaws.com/prod/data/?email=${idArray[0]}`)
    //     const response: any = await axios.get<any, AxiosResponse<string>>(USER_URL + `/?email=${idArray[0]}`)
    //     if (response.status === 200) {
    //         console.log(response.data);
    //         global.email = response.data["email"];
    //         global.password = response.data["password"];
    //         global.role = response.data["role"];
    //         return response.data;
    //     }
    //     return null;

    // } catch (_err) {
        // return null;
    // }
};

const updateUser = async (user: any) => {
    // const response: any = await axios.put<updateUserResponse>(`${API_URL}/user/updateUser/${user._id}`,
    //     { email: user.email, password: user.password, role: user.role },
    //     {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Accept: 'application/json',
    //         },
    //     },);
    // if (response.status === 200) {
    //     window.location.reload();
    // }
    console.log("updateUser called");
    // try {
    //     const sessionId = localStorage.getItem('sessionId');
    //     const response: any = await axios.post(USER_URL,
    //         {
    //             operation: "update",
    //             "old email": user.oldEmail,
    //             "new email": user.email,
    //             password: user.password,
    //             role: user.role
    //         },
    //         {
    //             headers: { Authorization: `${sessionId}` },
    //         }
    //     );

    //     if (response.status === 200) {
    //         window.location.reload();
    //     } else {
    //         console.log("Response Status:", response.status);
    //         console.log("Response Data:", response.data);
    //     }

    // } catch (error) {
    //     console.error("Error in createUser:", error);
    // }
};

const AdminPortal = {
    getUser,
    createUser,
    deleteUser,
    getSingleUser,
    updateUser,
};

export default AdminPortal;