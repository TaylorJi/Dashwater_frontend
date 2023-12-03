import {
  Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel,
  Grid, Box, Text, useMediaQuery
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import Dashboard from "../../../api/Dashboard/Dashboard";
import { toast } from "react-hot-toast";
import LoadingGraphic from "../../layout/LoadingGraphic";

interface SensorData {
  sensor_name: string;
  'measure_value::double': number;
  time: string;
}

const TestPanel: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [isLargeScreen] = useMediaQuery("(min-width: 1600px)");

  const LG_COLS = 4;
  const SM_COLS = 3;

  const getTest = async () => {
    try {
            const response = await Dashboard.test();
            if (response && Array.isArray(response)) {
              // Map the response to your SensorData structure
              const sensorDataArray: SensorData[] = response.map(sensorItem => ({
                sensor_name: sensorItem.sensor_name,
                'measure_value::double': sensorItem['measure_value::double'],
                time: sensorItem.time
              }));
              setSensorData(sensorDataArray);
            } else {
              console.error("Unexpected response data structure:", response);
              toast.error("Unable to retrieve sensor data.");
            }
          } catch (error) {
            console.error("Error fetching sensor data:", error);
            toast.error("There was an error fetching the sensor data - please refresh and try again.");
          }
  };

  useEffect(() => {
      getTest();
  }, []);

  if (!sensorData.length) {
      return <LoadingGraphic />;
  }

  return (
      <Accordion allowMultiple>
          {sensorData.map((data, index) => (
              <AccordionItem key={uuid()}>
                  <AccordionButton>
                      <Box flex="1" textAlign="left">
                          <Text fontSize="xl" fontWeight="bold">
                              {`Sensor ${index + 1}: ${data.sensor_name}`}
                          </Text>
                      </Box>
                      <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                      <Grid templateColumns={`repeat(${isLargeScreen ? LG_COLS : SM_COLS}, 1fr)`} gap={3}>
                          <Text>
                              Time: {data.time}
                          </Text>
                          <Text>
                              Value: {data['measure_value::double']}
                          </Text>
                      </Grid>
                  </AccordionPanel>
              </AccordionItem>
          ))}
      </Accordion>
  );
};

export default TestPanel;
