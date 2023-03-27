import { Checkbox, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { SelectContext } from "../SelectContext";

type listItemProps = {
  deviceName: string;
  id: number;
};

const MapListItem: React.FC<listItemProps> = ({ deviceName, id }) => {
  const { ids, updateSelected, updateIds } = React.useContext(SelectContext);
  const [checked, setChecked] = React.useState<boolean>(false);

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    updateSelected(isChecked, id);
    if (isChecked) updateIds([...ids, id]);
    else updateIds(ids.filter((currentId) => currentId !== id));
  };

  React.useEffect(() => {
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
      <Text size={"lg"}>{deviceName}</Text>
    </HStack>
  );
};

export default MapListItem;
