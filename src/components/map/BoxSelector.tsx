import React from "react";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import "./mapStyles.css";
import { ControlPosition, LayerEvent, Control } from "leaflet";

//TODO: Add functionality for handlers

interface EditControlProps {
  position?: ControlPosition;

  onCreated?: (e: LayerEvent) => void;
  onEdited?: (e: LayerEvent) => void;
  onDeleted?: (e: LayerEvent) => void;
  onEditMove?: (e: LayerEvent) => void;
  onDrawStop?: (e: LayerEvent) => void;
}

const BoxSelector: React.FC = () => {
  return (
    <EditControl
      position="bottomleft"
      draw={{
        rectangle: {
          shapeOptions: {
            color: "red",
          },
          repeatMode: false,
          allowIntersection: false,
          drawError: {
            color: "red",
            message: "Draw Error",
          },
          showArea: true,
          metric: true,
          feet: true,
          nautic: true,
        },
        circle: false,
        marker: false,
        circlemarker: false,
        polyline: false,
        polygon: false,
      }}
      edit={null}
      onCreated={(e: LayerEvent) => console.log(e)}
      onMounted={(control: Control) => console.log(control)}
    />
  );
};

export default BoxSelector;
