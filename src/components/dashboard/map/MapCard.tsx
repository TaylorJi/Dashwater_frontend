import { Box } from "@chakra-ui/react";
import React from "react";
import Map from "../../map/mapContainer/Map";
import BaseCard from "../../layout/BaseCard";
import { tileServer,  } from "../../map/mapConstants";

const MapCard: React.FC = () => {
  return (
    <Box my="0.5rem">
      <BaseCard>
      {/* <Map></Map> */}
      </BaseCard>
    </Box>
  );
};

export default MapCard;
