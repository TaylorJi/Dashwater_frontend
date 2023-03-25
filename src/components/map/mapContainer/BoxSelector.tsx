import React from "react";
import {MutableRefObject} from "react";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import "../mapStyles.css";
import { ControlPosition, LayerEvent, Control, featureGroup, FeatureGroup } from 'leaflet';
import colors from "../../../theme/foundations/colours";
import L from "leaflet";
import "leaflet-draw";
import { SelectContext } from '../SelectContext';
import { getBuoyMapData } from '../mapHelpers';

interface EditControlProps {
  position?: ControlPosition;
  onCreated?: (e: LayerEvent) => void;
  onEdited?: (e: LayerEvent) => void;
  onDeleted?: (e: LayerEvent) => void;
  onEditMove?: (e: LayerEvent) => void;
  onDrawStop?: (e: LayerEvent) => void;
  featureGroup?: MutableRefObject<L.FeatureGroup<any> | null>;
  bounds?: any;
  buoys?: {
    name: string;
    id: number;
    x: number;
    y: number;
  }[];
}

const BoxSelector: React.FC<EditControlProps> = (props) => {
  const { onCreated,  featureGroup, bounds, buoys} = props;
  const { ids, updateSelected, updateIds } = React.useContext(SelectContext);
  const [markerBounds, setMarkerBounds] = React.useState<any>([])
  
  React.useEffect(() => {
    if (bounds && buoys) {
      const markersWithinBounds = buoys.filter(
        buoy => bounds.contains([buoy.x, buoy.y])
      );
      setMarkerBounds(markersWithinBounds);
    }
  }, [bounds, buoys]);
  
  React.useEffect(() => {
    if (markerBounds) {
      const selectedIds = markerBounds.map((buoy: { id: any; }) => buoy.id);
      if (selectedIds.length > 0) updateIds(selectedIds)
    }
  }, [markerBounds]);

  const handleCreated = (e: LayerEvent) => {
    const rectangleBounds = bounds;
    const markersWithinBounds = buoys?.filter(
      buoy => rectangleBounds.contains([buoy.x, buoy.y])
    );
    setMarkerBounds(markersWithinBounds);
    if (onCreated) onCreated(e);
  };
  
  return (
    <EditControl
      position="bottomleft"
      draw={{
        rectangle: {
          shapeOptions: {
            color: "yellow",
          },
          repeatMode: false,
          metric: true,
        },
        circle: false,
        marker: false,
        circlemarker: false,
        polyline: false,
        polygon: false,
      }}
      edit={{  featureGroup: featureGroup, remove: true, edit: false}}
      onCreated={onCreated}
    />
  );
};
export default BoxSelector;
