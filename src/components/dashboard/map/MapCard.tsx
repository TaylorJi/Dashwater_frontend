import { Box } from "@chakra-ui/react";
import React from "react";
import Map from "../../map/mapContainer/Map";
import { tileServer, mapCardSpecs } from "../../map/mapConstants";
import { useRecoilState } from 'recoil'
import { getDeviceDetailInfo } from "../../map/mapHelpers";
import { allDevicesDetails } from "../../wrappers/DeviceDetailsWrapper/deviceManagerAtoms";

const MapCard: React.FC = () => {

  const { long, lat, zVal, zSet, cLat, cLong } = mapCardSpecs;

  const deviceDetails = useRecoilState(allDevicesDetails)
  const data = getDeviceDetailInfo(deviceDetails[0]);
 
  const [propData, setPropData] = React.useState<any>(data)


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

