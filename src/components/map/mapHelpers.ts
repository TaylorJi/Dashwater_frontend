export const getBuoyMapData = (buoyData: buoyInfo) => {
    let mapData: { name: string; id: number; x: number; y: number }[] = [];
    const data = buoyData.buoys?.map((buoy) => {
      mapData.push({
        name: buoy.name,
        id: Number(buoy.id),
        x: buoy.location.x,
        y: buoy.location.y,
      });
      return mapData;
    });
    if (!data) return [];
    return mapData;
  };

