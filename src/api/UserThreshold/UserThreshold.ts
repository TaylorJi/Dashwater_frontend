import axios, { AxiosResponse } from "axios";
import { API_URL } from "../Environments";

const UserThresholdCreate = async (msg: string) => {
  try {
    const response: any = await axios.get<any, AxiosResponse<string[]>>(
      `${API_URL}/userThreshold/createUserThreshold`
    );
    if (response.status === 200) {
      return response.data.text;
    }

    return null;
  } catch (_err) {
    return null;
  }
};

const UserThresholdUpdate = async (msg: string) => {
  try {
    const response: any = await axios.get<any, AxiosResponse<string[]>>(
      `${API_URL}/userThreshold/updateUserThreshold`
    );
    if (response.status === 200) {
      return response.data.text;
    }

    return null;
  } catch (_err) {
    return null;
  }
};

const UserThreshold = {
  UserThresholdCreate,
  UserThresholdUpdate,
};

export default UserThreshold;
