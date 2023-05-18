import axios, { AxiosResponse } from "axios";
import { API_URL } from "../Environments";

export const getAllDeviceInfo = async () => {
    try {
        const response: any = await axios.get<any, AxiosResponse<string[]>>(`${API_URL}/device/getAllDevices`)
        if(response.status === 200) {
          const rawData = response.data.text
          let buoyData: { name: string; id: number; x: number; y: number }[] = [];
          rawData.map( (buoy: any) => {
            buoyData.push({
              name: `Device ${buoy.deviceId}`, 
              id: Number(buoy.deviceId),
              x: buoy.location.coordinates[1],
              y: buoy.location.coordinates[0],
            })
          })
          return buoyData
        }
    } catch (_err) {
        return null;
    }
}