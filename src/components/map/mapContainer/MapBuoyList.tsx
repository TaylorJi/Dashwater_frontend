import React from "react";
import MapListItem from "./MapListItem";

import { Text, Stack, Card, CardBody } from "@chakra-ui/react";

const MapBuoyList: React.FC<buoyMapInfo> = (props) => {
  return (
    <Card minW={"30%"} minH={"400px"}>
      <CardBody>
        <Stack>
          {props.buoys ? (
            props.buoys.map((buoy) => (
              <MapListItem deviceName={buoy.name} id={buoy.id} />
            ))
          ) : (
            <Text>No devices currently available</Text>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default MapBuoyList;
