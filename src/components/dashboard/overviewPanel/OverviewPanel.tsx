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
import { timeRangeAtom } from '../../../components/dashboard/logPanel/atoms/timeRangeAtom';
import { useRecoilValue } from 'recoil';
import { MISSING_VALUE } from '../dashboardHelpers';

interface SensorData {
    sensorName: string;
    min: number;
    max: number;
}


interface DeviceDataType {
    [key: string]: {
      sensors: SensorData[];
      deviceData: DeviceSensorDataType[];
      gaugeData: GaugeDataType[];
    };
  }

const OverviewPanel: React.FC = () => {

    const [deviceData, setDeviceData] = useState<RawGaugeDataType | null>(null);
    const [deviceSensorValue, setDeviceSensorValue] = useState<DeviceSensorDataType[]>([]);
    const [sensorData, setSensorData] = useState<SensorData[]>([]);
    const [gaugeData, setGaugeData] = useState<GaugeDataType[]>([]);
    const [deviceDataType, setDeviceDataType] = useState<DeviceDataType>({});
    const [isLargeScreen] = useMediaQuery('(min-width: 1600px)');
    const timeRange = useRecoilValue(timeRangeAtom);

    const LG_COLS = 4;
    const SM_COLS = 3;

    const getSensors = useCallback(async () => {
        try {
            console.log("Time is " + localStorage.getItem("timeRange"));
            const devices = await Dashboard.getAllDevice();
            await Promise.all(devices.map(async (device: any) => {
                const data = await Dashboard.getSensors(device.device_name);
                const sensorDataArray: SensorData[] = [];
                for (let i = 0; i < data.length; i++) {
                    let sensor = data[i].sensor_name;
                    let values = await Dashboard.getCachedHighLowHistorical(device.device_name, sensor, localStorage.getItem("timeRange") || "12h");
                    let min = values.min;
                    let max = values.max;
                    let sensorValue: SensorData = {
                        sensorName: sensor,
                        min: min,
                        max: max
                    }
                    sensorDataArray.push(sensorValue);
                }
                if (!deviceDataType[device.device_name]) {
                    deviceDataType[device.device_name] = {
                        sensors: [],
                        deviceData: [],
                        gaugeData: []
                    };
                }
                deviceDataType[device.device_name]["sensors"] = sensorDataArray;
                console.log("deviceDataType after getSensors is " + JSON.stringify(deviceDataType));
                setSensorData(sensorDataArray);
            }));
        } catch (error) {
            console.error('OverviewPanel.tsx - getSensors() - error:', error);
            toast.error('There was an error fetching overview data - please refresh and try again.');
        }
    }, []);

    const getData = useCallback(async () => {
        try {
            const devices = await Dashboard.getAllDevice();
            await Promise.all(devices.map(async (device: any) => {
                const data = await Dashboard.getData(device.device_name, localStorage.getItem("timeRange") || "12h");
                let keys = Object.keys(data);
                if (keys.length === 0) {
                    const emptyArray: GaugeDataType[] = [];
                    setGaugeData(emptyArray);
                    return;
                }
                const deviceSensorValueArray: DeviceSensorDataType[] = [];
                for (let i = 0; i < keys.length; i++) {
                    let deviceSensorValue: DeviceSensorDataType = {
                        sensorUnit: data[keys[i]].sensorUnit,
                        sensorName: keys[i],
                        measureValue: data[keys[i]].measureValue
                    }
                    deviceSensorValueArray.push(deviceSensorValue);
                }
                deviceDataType[device.device_name]["deviceData"] = deviceSensorValueArray;
                console.log("deviceDataType after getData is " + JSON.stringify(deviceDataType));
                setDeviceSensorValue(deviceSensorValueArray);
                
            }));
        } catch (error) {
            console.error('OverviewPanel.tsx - getData() - error:', error);
            toast.error('There was an error fetching overview data - please refresh and try again.');
        }
    }, []);

    const createOverviewGridItems = useCallback(() => {
        if (deviceSensorValue.length > 0 && sensorData.length > 0) {
            Object.keys(deviceDataType).forEach(device => {
                const gaugeDataArray: GaugeDataType[] = [];
                const tempSensorData = deviceDataType[device]["sensors"];
                const tempDeviceSensorValue = deviceDataType[device]["deviceData"];
                tempDeviceSensorValue.forEach((measure: any) => {
                    const sensor = tempSensorData.find((sensor: any) => sensor.sensorName === measure.sensorName);
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
                deviceDataType[device]["gaugeData"] = gaugeDataArray;
                console.log("deviceDataType after createOverviewGridItems is " + JSON.stringify(deviceDataType));
                setGaugeData(gaugeDataArray);
            })
        }

    }, [deviceSensorValue, sensorData]);

    useEffect(() => {
        getData();
        getSensors();
    }, [getData, getSensors, localStorage.getItem("timeRange")]);

    useEffect(() => {
        createOverviewGridItems();
    }, [createOverviewGridItems, localStorage.getItem("timeRange")]);

    return (
        <>
            {
                deviceDataType ?
                    <>
                        {
                            Object.keys(deviceDataType).map((key: any) => {
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
                                                        deviceDataType[key]["gaugeData"].map((item: any) => {
                                                            if (item.high === undefined && item.low === undefined) {
                                                                item.current = MISSING_VALUE;
                                                            } 
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
            }
        </>
    );
 };

 export default OverviewPanel;