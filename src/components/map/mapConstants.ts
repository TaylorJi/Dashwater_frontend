import L from "leaflet"
import mapMarkerBlue from "../../assets/images/mapMarkers/marker-icon-2x.png";
import iconRetinaBlue from "../../assets/images/mapMarkers/marker-icon.png";
import iconShadow from "../../assets/images/mapMarkers/marker-shadow.png";

export const tileServer = {
    ARC_MAP: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    CARTO_MAP: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
}

export const mapModalSpecs = {
    long: -123.17557,
    lat: 49.195007,
    zVal: 12.75,
    zSet: 0.25,
    cLong: -123.17557,
    cLat: 49.195007,
}

export const iconSpecs =  {
    xSize: 25,
    ySize: 30,
    xAnchor: 12,
    yAnchor: 41,
    xPopAnchor: 1,
    yPopAnchor: -34 
}

export const mapCardSpecs = {
    long: -123.17557,
    lat: 49.195007,
    zVal: 11.95,
    zSet: 0.25,
    cLong: -123.17557,
    cLat: 49.19701,
}

export const cardIconSpecs =  {
    xSize: 20,
    ySize: 25,
    xAnchor: 10,
    yAnchor: 40,
    xPopAnchor: 1,
    yPopAnchor: -34 
}

export const cardIcon: L.Icon = L.icon({
    iconRetinaUrl: mapMarkerBlue,
    iconUrl: mapMarkerBlue,
    // shadowUrl: iconShadow,
    iconSize: [cardIconSpecs.xSize, cardIconSpecs.ySize],
    iconAnchor: [cardIconSpecs.xAnchor, cardIconSpecs.yAnchor],
    popupAnchor: [cardIconSpecs.xPopAnchor, cardIconSpecs.yPopAnchor],
  });