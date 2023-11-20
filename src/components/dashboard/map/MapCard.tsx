import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import Map from "../../map/mapContainer/Map";
import { tileServer, mapCardSpecs } from "../../map/mapConstants";
import { useRecoilValue } from 'recoil'
// import { getDeviceDetailInfo } from "../../map/mapHelpers";
import { allDevicesDetails } from "../../wrappers/DeviceDetailsWrapper/deviceManagerAtoms";

const MapCard: React.FC = () => {
  const { long, lat, zVal, zSet, cLat, cLong } = mapCardSpecs;
  const deviceDetails = useRecoilValue(allDevicesDetails)
  // const mapBuoyInfo = getDeviceDetailInfo(deviceDetails);
  // const [buoyInfo, _setBuoyInfo] = useState<buoyInfo>(mapBuoyInfo);

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
        // buoys={buoyInfo}
      />
    </Box>
  );
};

export default MapCard;