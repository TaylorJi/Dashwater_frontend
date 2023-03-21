import L, { Control, ControlPosition, LayerEvent, rectangle } from "leaflet";
import React, { useEffect } from "react";
import "../mapStyles.css";

import {
  MapContainer,
  Marker,
  TileLayer,
  ZoomControl,
  FeatureGroup,
} from "react-leaflet";
import MapMarker from "./MapMarker";
import BoxSelector from "./BoxSelector";
import "leaflet-draw/dist/leaflet.draw.css";
import { Styles } from "@chakra-ui/theme-tools";
import mapMarkerBlue from "../../../assets/images/mapMarkers/marker-icon-2x.png";
import iconRetinaBlue from "../../../assets/images/mapMarkers/marker-icon.png";
import iconShadow from "../../../assets/images/mapMarkers/marker-shadow.png";
import { cardIcon } from "../mapConstants";

type mapProps = {
  long: number;
  lat: number;
  zoomVal: number;
  zoomSet: number;
  center: [number, number];
  tilePath: string;
  buoys?: {
    name: string;
    id: number;
    x: number;
    y: number;
  }[];
  drawable?: boolean;
  isModal?: boolean;
  mapId: string;
};

const Map: React.FC<mapProps> = (props: mapProps) => {
  const [map, setMap] = React.useState<any>();
  const {
    buoys,
    zoomVal,
    zoomSet,
    center,
    tilePath,
    drawable,
    mapId,
    isModal,
  } = props;
  return (
    <MapContainer
      id={mapId}
      doubleClickZoom={false}
      zoom={zoomVal}
      zoomSnap={zoomSet}
      center={center}
      ref={setMap}
      zoomControl={false}
      bounceAtZoomLimits={true}
    >
      {drawable ? (
        <FeatureGroup>
          <ZoomControl position="bottomright" />
          <BoxSelector />
        </FeatureGroup>
      ) : (
        <></>
      )}

      <TileLayer url={tilePath} />

      {buoys && isModal ? (
        buoys.map(buoy => (
          <MapMarker buoyId={buoy.id} coords={[buoy.x, buoy.y]} />
        ))
      ) : buoys && !isModal ? (
        buoys.map(buoy => (
          <Marker icon={cardIcon} position={[buoy.x, buoy.y]} />
        ))
      ) : (
        <></>
      )}
    </MapContainer>
  );
};

export default Map;
