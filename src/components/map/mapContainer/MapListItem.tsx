import { Checkbox, HStack, Text } from "@chakra-ui/react";
import React, { useEffect, useContext, useState } from "react";
import { SelectContext } from "../SelectContext";

type listItemProps = {
  deviceName: string;
  id: number;
};

const MapListItem: React.FC<listItemProps> = ({ deviceName, id }) => {
  const { ids, updateSelected, updateIds } = useContext(SelectContext);
  const [checked, setChecked] = useState<boolean>(false);

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    updateSelected(isChecked, id);
    if (isChecked) updateIds([...ids, id]);
    else updateIds(ids.filter((currentId) => currentId !== id));
  };

  useEffect(() => {
    if (ids.includes(id)) setChecked(true);
    else setChecked(false);
  }, [ids, id]);

  return (
    <HStack spacing={"10%"}>
      <Checkbox
        value={deviceName}
        size={"lg"}
        onChange={handleSelect}
        isChecked={checked}
      />
      <Text size={"lg"}>{`${deviceName} (device ${id})`}</Text>
    </HStack>
  );
};

export default MapListItem;
