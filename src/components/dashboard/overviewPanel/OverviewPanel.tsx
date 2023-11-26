import {
    Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel,
    Grid, Box, Text, useMediaQuery
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import OverviewGridItem from './OverviewGridItem';
import Dashboard from '../../../api/Dashboard/Dashboard';
import { toast } from 'react-hot-toast';
import LoadingGraphic from '../../layout/LoadingGraphic';
import { get } from 'http';
import { timeRangeAtom } from '../../../components/dashboard/logPanel/atoms/timeRangeAtom';
import { useRecoilValue } from 'recoil';

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
    const timeRange = useRecoilValue(timeRangeAtom);

    const LG_COLS = 4;
    const SM_COLS = 3;

    const getSensors = async () => {
        try {
            console.log("Time is " + timeRange)
            const data = await Dashboard.getSensors("device");
            console.log('OverviewPanel.tsx - getSensors() - data:', data);
            const sensorDataArray: SensorData[] = [];
            for (let i = 0; i < data.length; i++) {
                let sensor = data[i].sensor_name;
                let values = await Dashboard.getCachedHighLowHistorical("device", sensor, timeRange);
                let min = values.min;
                let max = values.max;
                let sensorValue: SensorData = {
                    sensorName: sensor,
                    min: min,
                    max: max
                }
                sensorDataArray.push(sensorValue);
                console.log("sensor: ", sensor);
                console.log("min: ", min);
                console.log("max: ", max);
            }
            setSensorData(sensorDataArray);
            createOverviewGridItems();

            // console.log(data[0].sensor_name)

        } catch (error) {
            console.error('OverviewPanel.tsx - getSensors() - error:', error);
            toast.error('There was an error fetching overview data - please refresh and try again.');
        }
    }

    const getData = async () => {
        try {
            const data = await Dashboard.getData("device", timeRange);
            console.log('OverviewPanel.tsx - getData() - data:', data);
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
            // if (data) {
            //     const value: DeviceSensorDataType = {
            //         deviceName: data.device_name,
            //         sensorUnit: data.sensor_unit,
            //         sensorName: data.sensor_name,
            //         measureValue: data.measure_value,
            //         time: data.time
            //     }
            //     deviceSensorValueArray.push(value);
            // }
            setDeviceSensorValue(deviceSensorValueArray);

        } catch (error) {
            console.error('OverviewPanel.tsx - getData() - error:', error);
            toast.error('There was an error fetching overview data - please refresh and try again.');
        }
    }

    const getHistoricalHighLow = async () => {

        try {
            const data = await Dashboard.getCachedHighLowHistorical("device", "co2", "1d");
            console.log('OverviewPanel.tsx - getHistoricalHighLow() - data:', data);



            if (data) {
                setDeviceData(data);

            } else {
                toast.error('There was an error fetching overview data - please refresh and try again.');
            }

        } catch {
            toast.error('There was an error fetching overview data - please refresh and try again.');
        }

    };

    const createOverviewGridItems = async () => {
        if (deviceSensorValue && sensorData) {
            const gaugeDataArray: GaugeDataType[] = [];
            deviceSensorValue.forEach((measure) => {
                const sensor = sensorData.find((sensor) => sensor.sensorName === measure.sensorName);
                if (sensor) {
                    // console.log("~~~~~~~~~~~~~~~~~");
                    const item: GaugeDataType = {
                        metric: sensor.sensorName,
                        low: sensor.min,
                        high: sensor.max,
                        current: Number(measure.measureValue),
                        unit: measure.sensorUnit
                    };
                    gaugeDataArray.push(item);
                    // return (
                    //     <OverviewGridItem
                    //         key={uuid()}
                    //         item={item}
                    //     />
                    // );
                }

            });
            // console.log("!!!!!!!!!!!!!! " + JSON.stringify(gaugeDataArray));
            setGaugeData(gaugeDataArray);
        }
    };

    useEffect(() => {
        // getHistoricalHighLow();
        // getData();
        // getSensors();
        // createOverviewGridItems();
        const fetchAndSetupData = async () => {
            getHistoricalHighLow();
            await getData();
            await getSensors();
            await createOverviewGridItems();
        }

        fetchAndSetupData();

        // const fetchAndSetupData = async () => {
        //     await Promise.all([getHistoricalHighLow(), getData(), getSensors()]);
        //     await createOverviewGridItems();
        // }

        // fetchAndSetupData();
    }, [timeRange]);

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
            {/* <Box>
                <Text fontSize="xl" fontWeight="bold">Sensors:</Text>
                <ul>
                    {sensors.map(sensor => (
                        <li key={sensor}>{sensor}</li>
                    ))}
                </ul>
            </Box> */}




            {/* {
                deviceData ?
                    <>
                        {
                            Object.keys(deviceData).map((key) => {

                                return (
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
                                                        {`Device ${key} Overview`}
                                                    </Text>
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                            <AccordionPanel pb={4}>
                                                <Grid templateColumns={`repeat(${isLargeScreen ?
                                                    LG_COLS : SM_COLS}, 1fr)`} gap={3}>
                                                    {
                                                        deviceData[key].map((item) => {
                                                            console.log(`Key: ${key}, Item:`, item)
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


                                )

                            })

                        }
                    </>
                    :
                    <LoadingGraphic />
            } */}
        </>
    );
};

export default OverviewPanel;