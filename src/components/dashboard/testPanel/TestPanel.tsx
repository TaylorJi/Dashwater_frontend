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

  interface SensorData {
    sensor_name: string;
    'measure_value::double': number;
    time: string;
  }

const TestPanel: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);

  // const [deviceData, setDeviceData] = useState<RawGaugeDataType | null>(null);
  const [isLargeScreen] = useMediaQuery("(min-width: 1600px)");
  const [buoyIds, setBuoyIds] = useState<string[]>([]); // Add state for buoy IDs

  const LG_COLS = 4;
  const SM_COLS = 3;

  // const getTest = async () => {
  //   try {
  //     console.log("Test")
  //     const response = await Dashboard.test();
  //     console.log(response.length);
  //     console.log(typeof response);
  //     if (response && Array.isArray(response)) {
  //       // Assuming response is the array of sensor data
  //       setSensorData(response);
  //     }
   
  //   } catch (error) {
  //     console.error("Error fetching buoy IDs:", error);
  //     toast.error("There was an error fetching the buoy IDs - please refresh and try again.");
  //   }
  // };

  // const getTest = async () => {
  //   try {
  //     const response = await Dashboard.test();
  //     if (response && Array.isArray(response)) {
  //       // Flatten the array of objects into an array of SensorData
  //       const flattenedData = response.flatMap((item) =>
  //         Object.keys(item).map((key) => ({
  //           sensor_name: key,
  //           // Access the property with bracket notation due to special characters
  //           'measure_value::double': item[key]['measure_value::double'],
  //         }))
  //       );
  //       setSensorData(flattenedData);
  //     } else {
  //       console.error("Unexpected response data structure:", response);
  //       toast.error("Unable to retrieve sensor data.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching sensor data:", error);
  //     toast.error("There was an error fetching the sensor data - please refresh and try again.");
  //   }
  // };

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

           <Box>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Sensor Data:
        </Text>
        <ul>
          {sensorData.map((data, index) => (
            // <li key={index}>
            //   {data.sensor_name}: {data['measure_value::double']}
            // </li>
            <li key={uuid()}>
              Time: {data.time} <br />
            {data.sensor_name}: {data['measure_value::double']}
          </li>
          ))}
        </ul>
      </Box>
      

 
    </>
  );
};

export default TestPanel;
