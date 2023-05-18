import { Box } from "@chakra-ui/react";
import React from "react";
import Map from "../../map/mapContainer/Map";
import { tileServer, mapCardSpecs } from "../../map/mapConstants";
import { useRecoilState } from 'recoil'
import { getDeviceDetailInfo } from "../../map/mapHelpers";

//TODO: For next teams:
//      Commented out code is the implementation
//      for data from deviceManager atom but each call
//      to cloud takes ~10 s so team used mock data.
//      This needs to be changed to read from the atom
//      once the devices API is fixed on the Cloud

import { mockData } from './../../../mockData/mockMapData';

// import { allDevicesDetails } from "../../wrappers/DeviceDetailsWrapper/deviceManagerAtoms";

const MapCard: React.FC = () => {
  const { long, lat, zVal, zSet, cLat, cLong } = mapCardSpecs;
  // const deviceDetails = useRecoilState(allDevicesDetails)
  const mapBuoyInfo = getDeviceDetailInfo(mockData);
  const [buoyInfo, _setBuoyInfo] = React.useState<buoyInfo>(mapBuoyInfo)

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
        buoys={buoyInfo}
      />
    </Box>
  );
};

export default MapCard;