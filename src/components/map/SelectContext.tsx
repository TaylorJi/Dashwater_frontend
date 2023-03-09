/**
 * This module contains the context to enable the checkboxes to set marker colors
 *  TODO: and vice versa. 
 * This allows for functions to be passed directly to/from MapListItem and MapMarker 
 * of the map modal without having to pass props to/from MapBuoyList and Map.
 */
import React from "react";

type selectedContextType = {
  selected: boolean;
  ids: number[];
  updateSelected: (select: boolean, id: number) => void;
  updateIds: (ids: number[]) => void;
};

export const SelectContext = React.createContext<selectedContextType>({
  selected: false,
  ids: [],
  updateSelected: () => {},
  updateIds: () => {}
});