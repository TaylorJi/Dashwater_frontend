import { Box } from "@chakra-ui/react";
import React from "react";
import Map from "../../map/mapContainer/Map";
import { tileServer, mapCardSpecs } from "../../map/mapConstants";

import { getAllDeviceInfo } from "../../map/mapHelpers";

const MapCard: React.FC = () => {

  // const propData = getBuoyMapData(mockBuoyData);

  const [propData, setData] = React.useState<any>(null)


  //TODO: This is a temp fix; will need to replace with data from AWS gateway
  const getDeviceData = async () => {
    try {
      const data = await getAllDeviceInfo();
      if (data) {
        setData(data);
      }
    } catch (_err) {
      console.log(_err);
    }
  };

  React.useEffect(() => {
    getDeviceData();
  }, []);

  const { long, lat, zVal, zSet, cLat, cLong } = mapCardSpecs;

  return (
    <Box my="0.5rem">
      <Map
        long={long}
        lat={lat}
        zoomVal={zVal}
        zoomSet={zSet}
        center={[cLat, cLong]}
        tilePath={tileServer.CARTO_MAP}
        drawable={false}
        mapId={"mapCardId"}
        isModal={false}
        buoys={propData}
      />
    </Box>
  );
};

export default MapCard;
