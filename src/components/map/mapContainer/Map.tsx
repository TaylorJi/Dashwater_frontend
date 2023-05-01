import React from "react";
import L from "leaflet";
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
import { cardIcon } from "../mapConstants";
import { LayerEvent } from "leaflet";

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
  isSettings?: boolean;
  settingsCoords?: [number, number];
  handleMapZoom?: () => void;
};

const Map: React.FC<mapProps> = (props: mapProps) => {
  const {
    buoys,
    zoomVal,
    zoomSet,
    center,
    tilePath,
    drawable,
    mapId,
    isModal,
    isSettings,
    settingsCoords,
  } = props;
  const [map, setMap] = React.useState<any>(); 
  const editableFG = React.useRef<L.FeatureGroup | null>(null);
  const [bounds, setBounds] = React.useState<any>(null);

  const handleDrawCreated = (event: any) => {
    const { layerType, layer } = event;

    if (layerType === "rectangle") {
      setBounds(layer.getBounds());
    }

  };

  const onCreated = (event: LayerEvent) => {
    handleDrawCreated(event);

    const drawnItems = editableFG.current?.getLayers();

    if (drawnItems && Object.keys(drawnItems).length > 0) {
      Object.keys(drawnItems).forEach((layerid) => {
        const layer = drawnItems[Number(layerid)];
        editableFG.current?.removeLayer(layer);
      });
    }
  };

  React.useEffect(() => {
    setBounds(null);
  }, [bounds])

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
        <FeatureGroup ref={editableFG}>
          <ZoomControl position="bottomright" />
          <BoxSelector
            onCreated={onCreated}
            featureGroup={editableFG}
            bounds={bounds}
            buoys={buoys}
          />
        </FeatureGroup>
      ) : (
        <></>
      )}

      <TileLayer url={tilePath} />

      {buoys && isModal ? (
        buoys.map((buoy) => (
          <MapMarker buoyId={buoy.id} coords={[buoy.x, buoy.y]} />
        ))
      ) : buoys && !isModal ? (
        buoys.map((buoy) => (
          <Marker icon={cardIcon} position={[buoy.x, buoy.y]} />
        ))
      ) : isSettings ? (
        
        <Marker
          icon={cardIcon}
          position={settingsCoords ? settingsCoords : [0, 0]}
        />

      ) : (
        <></>
      )}

    </MapContainer>
  );
};

export default Map;
