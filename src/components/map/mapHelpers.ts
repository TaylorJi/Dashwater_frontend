
export const getDeviceDetailInfo = (info: deviceSettingsType[]) => {
  const deviceInfo = info;


    let buoyData: { name: string; id: number; x: number; y: number }[] = [];

    info.map((buoy: any) => {
      buoyData.push({
        name: buoy.name,
        id: Number(buoy.id),
        x: buoy.location.y,
        y: buoy.location.x,
      });
    });

    
  
  return buoyData;
};
