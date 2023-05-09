//TODO: Delete/replace this after Recoil for device manager is updated


import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../../api/Environments';


//TODO: Replace this with selector to device manager atom
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





//TODO: Remove/refactor after testing the new function that fetches from db
export const getBuoyMapData = (buoyData: buoyInfo) => {
    let mapData: { name: string; id: number; x: number; y: number }[] = [];
    const data = buoyData.buoys?.map((buoy) => {
      mapData.push({
        //TODO: name is not implemented so for now device names are device + id
        name: `Device ${buoy.id}`, 
        id: Number(buoy.id),
        x: buoy.location.x,
        y: buoy.location.y,
      });
      return mapData;
    });
    if (!data) return [];
    return mapData;
  };



