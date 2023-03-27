import React, {useEffect, useContext, useState} from "react";
import {MutableRefObject} from "react";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import "../mapStyles.css";
import { ControlPosition, LayerEvent } from 'leaflet';
import L from "leaflet";
import "leaflet-draw";
import { SelectContext } from '../SelectContext';

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
  const { updateIds } = useContext(SelectContext);
  const [markerBounds, setMarkerBounds] = useState<any>([])
  
  useEffect(() => {
    if (bounds && buoys) {
      const markersWithinBounds = buoys.filter(
        buoy => bounds.contains([buoy.x, buoy.y])
      );
      setMarkerBounds(markersWithinBounds);
    }
  }, [bounds, buoys]);
  
  // Line 49 used to ignore warning as updateIds() does not ever change
  // in the context of map modal. 
  React.useEffect(() => {
    if (markerBounds) {
      const selectedIds = markerBounds.map((buoy: { id: any; }) => buoy.id);
      if (selectedIds.length > 0) updateIds(selectedIds)
    }
    // eslint-disable-next-line
  }, [markerBounds]);

  return (
    <EditControl
      position="bottomright"
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
      edit={{  featureGroup: featureGroup, remove: false, edit: false}}
      onCreated={onCreated}
    />
  );
};
export default BoxSelector;
