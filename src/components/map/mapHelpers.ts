export const getBuoyMapData = (buoyData: buoyInfo) => {
    let mapData: { name: string; id: number; x: number; y: number }[] = [];
    buoyData.buoys?.map((buoy) => {
      mapData.push({
        name: buoy.name,
        id: Number(buoy.id),
        x: buoy.location.x,
        y: buoy.location.y,
      });
    });
    if (!mapData) return [];
    return mapData;
  };

