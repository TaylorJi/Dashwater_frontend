//     const getSensors = async () => {
//         try {
//             const data = await Dashboard.getSensors("device");
//             console.log('OverviewPanel.tsx - getSensors() - data:', data);
//             const sensorDataArray: SensorData[] = [];
//             for (let i = 0; i < data.length; i++) {
//                 let sensor = data[i].sensor_name;
//                 let values = await Dashboard.getCachedHighLowHistorical("device", sensor, "72h");
//                 let min = values.min;
//                 let max = values.max;
//                 let sensorValue: SensorData = {
//                     sensorName: sensor,
//                     min: min,
//                     max: max
//                 }
//                 sensorDataArray.push(sensorValue);
//             }
//             setSensorData(sensorDataArray);
//             // setTimeout(createOverviewGridItems, 1000);
//         } catch (error) {
//             console.error('OverviewPanel.tsx - getSensors() - error:', error);
//             toast.error('There was an error fetching overview data - please refresh and try again.');
//         }
//     }

//     const getData = async () => {
//         try {
//             const data = await Dashboard.getData("device", "72h");
//             console.log('OverviewPanel.tsx - getData() - data:', data);
//             const deviceSensorValueArray: DeviceSensorDataType[] = [];
//             let keys = Object.keys(data);
//             for (let i = 0; i < keys.length; i++) {
//                 let deviceSensorValue: DeviceSensorDataType = {
//                     sensorUnit: data[keys[i]].sensorUnit,
//                     sensorName: keys[i],
//                     measureValue: data[keys[i]].measureValue
//                 }
//                 deviceSensorValueArray.push(deviceSensorValue);
//             }
//             setDeviceSensorValue(deviceSensorValueArray);
//             // setTimeout(getSensors, 1000);
//         } catch (error) {
//             console.error('OverviewPanel.tsx - getData() - error:', error);
//             toast.error('There was an error fetching overview data - please refresh and try again.');
//         }
//     }

//     const createOverviewGridItems = async () => {
//         console.log("createOverviewGridItems() called. getData() length: " + deviceSensorValue.length + " sensorData length: " + sensorData.length );
//         if (deviceSensorValue.length > 0 && sensorData.length > 0) {
//             const gaugeDataArray: GaugeDataType[] = [];
//             deviceSensorValue.forEach((measure) => {
//                 const sensor = sensorData.find((sensor) => sensor.sensorName === measure.sensorName);
//                 if (sensor) {
//                     const item: GaugeDataType = {
//                         metric: sensor.sensorName,
//                         low: sensor.min,
//                         high: sensor.max,
//                         current: Number(measure.measureValue),
//                         unit: measure.sensorUnit
//                     };
//                     gaugeDataArray.push(item);
//                 }

//             });
//             console.log("!!!!!!!!!!!!!! " + JSON.stringify(gaugeDataArray));
//             setGaugeData(gaugeDataArray);
//         }
//     };

//     useEffect(() => {
//         getData();
//         getSensors();
//     }, []);

//     useEffect(() => {
//         createOverviewGridItems();
//     }, [deviceSensorValue, sensorData]);

import {
    Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel,
    Grid, Box, Text, useMediaQuery
} from '@chakra-ui/react';
import React, { useEffect, useState, useCallback } from 'react';
import uuid from 'react-uuid';
import OverviewGridItem from './OverviewGridItem';
import Dashboard from '../../../api/Dashboard/Dashboard';
import { toast } from 'react-hot-toast';
import LoadingGraphic from '../../layout/LoadingGraphic';


interface SensorData {
    sensorName: string;
    min: number;
    max: number;
}

const OverviewPanel: React.FC = () => {

    const [deviceData, setDeviceData] = useState<RawGaugeDataType | null>(null);
    const [deviceSensorValue, setDeviceSensorValue] = useState<DeviceSensorDataType[]>([]);
    const [sensorData, setSensorData] = useState<SensorData[]>([]);
    const [gaugeData, setGaugeData] = useState<GaugeDataType[]>([]);
    const [isLargeScreen] = useMediaQuery('(min-width: 1600px)');

    const LG_COLS = 4;
    const SM_COLS = 3;

    const getSensors = useCallback(async () => {
        try {
            const data = await Dashboard.getSensors("device");
            const sensorDataArray: SensorData[] = [];
            for (let i = 0; i < data.length; i++) {
                let sensor = data[i].sensor_name;
                let values = await Dashboard.getCachedHighLowHistorical("device", sensor, "72h");
                let min = values.min;
                let max = values.max;
                let sensorValue: SensorData = {
                    sensorName: sensor,
                    min: min,
                    max: max
                }
                sensorDataArray.push(sensorValue);
            }
            setSensorData(sensorDataArray);
        } catch (error) {
            console.error('OverviewPanel.tsx - getSensors() - error:', error);
            toast.error('There was an error fetching overview data - please refresh and try again.');
        }
    }, []);

    const getData = useCallback(async () => {
        try {
            const data = await Dashboard.getData("device", "72h");
            const deviceSensorValueArray: DeviceSensorDataType[] = [];
            let keys = Object.keys(data);
            for (let i = 0; i < keys.length; i++) {
                let deviceSensorValue: DeviceSensorDataType = {
                    sensorUnit: data[keys[i]].sensorUnit,
                    sensorName: keys[i],
                    measureValue: data[keys[i]].measureValue
                }
                deviceSensorValueArray.push(deviceSensorValue);
            }
            setDeviceSensorValue(deviceSensorValueArray);
        } catch (error) {
            console.error('OverviewPanel.tsx - getData() - error:', error);
            toast.error('There was an error fetching overview data - please refresh and try again.');
        }
    }, []);

    const createOverviewGridItems = useCallback(() => {
        if (deviceSensorValue.length > 0 && sensorData.length > 0) {
            const gaugeDataArray: GaugeDataType[] = [];
            deviceSensorValue.forEach((measure) => {
                const sensor = sensorData.find((sensor) => sensor.sensorName === measure.sensorName);
                if (sensor) {
                    const item: GaugeDataType = {
                        metric: sensor.sensorName,
                        low: sensor.min,
                        high: sensor.max,
                        current: Number(measure.measureValue),
                        unit: measure.sensorUnit
                    };
                    gaugeDataArray.push(item);
                }
            });
            setGaugeData(gaugeDataArray);
        }
    }, [deviceSensorValue, sensorData]);

    useEffect(() => {
        getData();
        getSensors();
    }, [getData, getSensors]);

    useEffect(() => {
        createOverviewGridItems();
    }, [createOverviewGridItems]);

    return (
        <>
            {
                gaugeData ?
                    <>
                        {
                            // gaugeData.map((item) => {
                            //     return (

                            //         <OverviewGridItem
                            //             key={uuid()}
                            //             item={item}
                            //         />
                            //     );
                            // })
                            <Accordion
                                key={uuid()}
                                allowMultiple
                            >
                                <AccordionItem>
                                    <AccordionButton>
                                        <Box
                                            as='span'
                                            flex='1'
                                            textAlign='left'
                                        >
                                            <Text
                                                fontSize='xl'
                                                fontWeight='bold'
                                            >
                                                Device Overview
                                            </Text>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                    <AccordionPanel pb={4}>
                                        <Grid templateColumns={`repeat(${isLargeScreen ?
                                            LG_COLS : SM_COLS}, 1fr)`} gap={3}>
                                            {
                                                gaugeData.map((item) => {
                                                    return (

                                                        <OverviewGridItem
                                                            key={uuid()}
                                                            item={item}
                                                        />
                                                    );
                                                })
                                            }

                                        </Grid>
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>

                        }
                    </>
                    :
                    <LoadingGraphic />
            }
        </>
    );
 };

 export default OverviewPanel;