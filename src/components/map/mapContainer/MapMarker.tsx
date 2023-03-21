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
import mapMarkerBlue from "../../../assets/images/mapMarkers/marker-icon-2x.png";
import mapMarkerGrey from "../../../assets/images/mapMarkers/marker-icon-2x-grey.png";
import iconRetinaBlue from "../../../assets/images/mapMarkers/marker-icon.png";
import iconRetinaGrey from "../../../assets/images/mapMarkers/marker-icon-grey.png";
import iconShadow from "../../../assets/images/mapMarkers/marker-shadow.png";
import "../mapStyles.css";
import { SelectContext } from "../SelectContext";
import { iconSpecs } from "../mapConstants";

type markerPropsType = {
  buoyId: number;
  coords: [number, number];
  key: number;
};

const MapMarker: React.FC<markerPropsType> = ({ buoyId, key, coords }) => {
  // const {selected, ids} = React.useContext(SelectContext);
  const { ids, updateSelected, updateIds } = React.useContext(SelectContext);
  const [color, setColor] = React.useState<string>(mapMarkerGrey);
  const [retina, setRetina] = React.useState<string>(mapMarkerBlue);

  const icon: L.Icon = L.icon({
    iconRetinaUrl: retina,
    iconUrl: color,
    shadowUrl: iconShadow,
    iconSize: [iconSpecs.xSize, iconSpecs.ySize],
    iconAnchor: [iconSpecs.xAnchor, iconSpecs.yAnchor],
    popupAnchor: [iconSpecs.xPopAnchor, iconSpecs.yPopAnchor],
  });

  React.useEffect(() => {
    if (ids.includes(buoyId)) {
      setColor(mapMarkerBlue);
      setRetina(iconRetinaBlue);
    } else {
      setColor(mapMarkerGrey);
      setRetina(iconRetinaGrey);
    }
  }, [ids, buoyId]);

  const handleSelect = () => {
    const isSelected = !ids.includes(buoyId);
    updateSelected(isSelected, buoyId);
    if (isSelected) {
      updateIds([...ids, buoyId]);
      setColor(mapMarkerBlue);
    } else {
      updateIds(ids.filter((id) => id !== buoyId));
      setColor(mapMarkerGrey);
    }
  };

  //TODO: Implement event handlers
  return (
    <>
      <Marker position={coords} icon={icon} eventHandlers={{click: handleSelect}}></Marker>
    </>
  );
};

export default MapMarker;
