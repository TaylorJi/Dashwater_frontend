import React from "react";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
  ScaleControl,
} from "react-leaflet";
import L, { LatLng, divIcon } from "leaflet";
import mapMarkerBlue from "../../assets/images/mapMarkers/marker-icon-2x.png";
import mapMarkerGrey from "../../assets/images/mapMarkers/marker-icon-2x-grey.png";
import iconRetinaBlue from "../../assets/images/mapMarkers/marker-icon.png";
import iconRetinaGrey from "../../assets/images/mapMarkers/marker-icon-grey.png";
import iconShadow from "../../assets/images/mapMarkers/marker-shadow.png";
import "./mapStyles.css";
import { SelectContext } from "./SelectContext";

type markerPropsType = {
  buoyId: number;
  coords: [number, number];
  key: number;
};

const MapMarker: React.FC<markerPropsType> = ({buoyId, key, coords}) => {



  const {selected, ids} = React.useContext(SelectContext);
  const [color, setColor] = React.useState<string>(mapMarkerGrey);
  const [retina, setRetina] = React.useState<string>(mapMarkerBlue);

  

  React.useEffect(() => {
    if (ids.includes(buoyId)) { 
      setColor(mapMarkerBlue);
      setRetina(iconRetinaBlue)
    } else {
      setColor(mapMarkerGrey)
      setRetina(mapMarkerGrey)
    };
  }, [ids]);

  const icon: L.Icon = L.icon({
    iconRetinaUrl: retina,
    iconUrl: color,
    shadowUrl: iconShadow,

    //TODO: move these values to specification file
    iconSize: [25, 30],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
  //TODO: Implement event handlers
  return (
    <>
      <Marker position={coords} icon={icon} eventHandlers={{}}>
      
      </Marker>
    </>
  );
};

export default MapMarker;
