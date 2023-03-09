import { Checkbox, HStack, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { SelectContext } from "../SelectContext";

type listItemProps = {
  deviceName: string;
  id: number;
};

const MapListItem: React.FC<listItemProps> = ({ deviceName, id }) => {
  const { updateSelected, ids, updateIds } = React.useContext(SelectContext);

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    updateSelected(isChecked, id);
    if (isChecked) updateIds([...ids, id]);
    else updateIds(ids.filter((currentId) => currentId !== id));
  };

  return (
    <HStack spacing={"10%"}>
      <Checkbox value={deviceName} size={"lg"} onChange={handleSelect} />
      <Text size={"lg"}>{deviceName}</Text>
    </HStack>
  );
};

export default MapListItem;
