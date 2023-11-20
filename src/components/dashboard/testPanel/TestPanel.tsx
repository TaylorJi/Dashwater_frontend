import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Grid,
  Box,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import uuid from "react-uuid";

import Dashboard from "../../../api/Dashboard/Dashboard";
import { toast } from "react-hot-toast";
import LoadingGraphic from "../../layout/LoadingGraphic";

interface Buoy {
    buoy_id: number | string;
  }

const TestPanel: React.FC = () => {
  const [deviceData, setDeviceData] = useState<RawGaugeDataType | null>(null);
  const [isLargeScreen] = useMediaQuery("(min-width: 1600px)");
  const [buoyIds, setBuoyIds] = useState<string[]>([]); // Add state for buoy IDs

  const LG_COLS = 4;
  const SM_COLS = 3;

  const getTest = async () => {
    try {
      console.log("Test")
      const response = await Dashboard.test();


      // If response.data is an object with numeric keys, convert it to an array
      // if (response && typeof response.data === 'object') {
      //   // Convert the object values to an array and then map to get buoy_id
      //   const ids = Object.values(response.data).map((buoyData: any) => buoyData.buoy_id);
      //   setBuoyIds(ids);
      // } else {
      //   console.error("Unexpected response data structure:", response.data);
      //   toast.error("Unable to retrieve buoy IDs.");
      //   setBuoyIds([]);
      // }
    } catch (error) {
      console.error("Error fetching buoy IDs:", error);
      toast.error("There was an error fetching the buoy IDs - please refresh and try again.");
    }
  };

  const getAllBuoyIds = async () => {
    try {
      const response = await Dashboard.getAllBuoyIds();
      console.log(response.data.length);
      
      // If response.data is an object with numeric keys, convert it to an array
      if (response && typeof response.data === 'object') {
        // Convert the object values to an array and then map to get buoy_id
        const ids = Object.values(response.data).map((buoyData: any) => buoyData.buoy_id);
        setBuoyIds(ids);
      } else {
        console.error("Unexpected response data structure:", response.data);
        toast.error("Unable to retrieve buoy IDs.");
        setBuoyIds([]);
      }
    } catch (error) {
      console.error("Error fetching buoy IDs:", error);
      toast.error("There was an error fetching the buoy IDs - please refresh and try again.");
    }
  };


  useEffect(() => {
    // getHistoricalHighLow();
    getTest();
  }, []);

  return (
    <>
      {/* <Box>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Buoy IDs:
        </Text>
        <ul>
          {buoyIds.map((id) => (
            <li key={id}>Buoy ID: {id}</li>
          ))}
        </ul>
      </Box> */}

      <Accordion allowMultiple>
        {buoyIds.map((id) => (
          <AccordionItem key={id}>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Buoy ID: {id}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              {/* Additional details or data related to the buoy ID can be rendered here */}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default TestPanel;
