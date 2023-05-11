import axios from "axios";
import { useRecoilState } from "recoil";
import { deviceDataAtom } from "../../components/dashboard/atoms/intervalPanelAtoms";
import { API_URL } from "../Environments";
// Get cached data, 
// get device settings, 
// and return array of objects in format of mockBuoyData

export const getDeviceInfo = async () => {

 
    try {
        const response = await axios.get(`${API_URL}/device/getAllDevices`);
        const data = response.data;
        console.log(data);
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
        return [];
      }
    

}
 
 
 export default getDeviceInfo;
 