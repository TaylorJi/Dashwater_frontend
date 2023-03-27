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