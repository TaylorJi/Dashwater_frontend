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
import { Styles } from '@chakra-ui/theme-tools';

type mapProps = {
  long: number;
  lat: number;
  zoomVal: number;
  zoomSet: number;
  center: [number, number];
  tilePath: string;
  buoys: {
    name: string;
    id: number;
    x: number;
    y: number;
  }[];
  drawable?: boolean;
};

const Map: React.FC<mapProps> = (props: mapProps) => {
  const [map, setMap] = React.useState<any>();



  return (
    <MapContainer
      id="mapId"
      doubleClickZoom={false}
      zoom={props.zoomVal}
      zoomSnap={props.zoomSet}
      center={props.center}
      ref={setMap}
      zoomControl={false}
      bounceAtZoomLimits={true}
    >

      { props.drawable ? 
      <FeatureGroup >
        <ZoomControl position="bottomright" />
        <BoxSelector />
      </FeatureGroup>
      : <></>
      }

      <TileLayer url={props.tilePath} />

      {props.buoys
        ? props.buoys.map((b, index) => (
            <MapMarker buoyId={b.id} key={index} coords={[b.x, b.y]} />
          ))
        : <></>} 
        

    </MapContainer>

  );
};

export default Map;
