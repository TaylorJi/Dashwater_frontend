export const getDeviceDetailInfo = (info: deviceSettingsType[]) => {
  let buoyData: { name: string; id: number; x: number; y: number }[] = [];
  info.map((buoy: any) => {
    buoyData.push({
      name: buoy.name,
      id: Number(buoy.id),
      x: buoy.locationY,
      y: buoy.locationX,
    });
  });

  return buoyData;
};