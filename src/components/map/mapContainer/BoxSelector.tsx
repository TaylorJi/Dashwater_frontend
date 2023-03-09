import React from "react";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import "../mapStyles.css";
import { ControlPosition, LayerEvent, Control } from "leaflet";
import colors from "../../../theme/foundations/colours";

//TODO: Add functionality for handlers
//TODO: Fix drawbox; limit drawing to single rectangle each time
//TODO: Change the layout and design of edit controls


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
            color: colors.main.acidGreen,
          },
          repeatMode: false,
          allowIntersection: false,
          drawError: {
            color: "blue",
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
