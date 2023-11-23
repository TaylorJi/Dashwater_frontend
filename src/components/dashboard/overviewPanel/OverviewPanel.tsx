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


const OverviewPanel: React.FC = () => {

    const [deviceData, setDeviceData] = useState<RawGaugeDataType | null>(null);
    const [isLargeScreen] = useMediaQuery('(min-width: 1600px)');

    const LG_COLS = 4;
    const SM_COLS = 3;

    const getSensors = async () => {
        let sensorMinMax = [];
        try {
            const data = await Dashboard.getSensors("device");
            console.log('OverviewPanel.tsx - getSensors() - data:', data);
            for (let i = 0; i < data.length; i++) {
                let sensor = data[i].sensor_name;
                let values = await Dashboard.getCachedHighLowHistorical("device", sensor, "12h");
                let min = values.min;
                let max = values.max;
                console.log("sensor: ", sensor);
                console.log("min: ", min);
                console.log("max: ", max);
            }



            console.log(data[0].sensor_name)


        } catch (error) {
            console.error('OverviewPanel.tsx - getSensors() - error:', error);
            toast.error('There was an error fetching overview data - please refresh and try again.');
        }
    }

    const getData = async () => {
        try{
            const data = await Dashboard.getData("device", "12h");
            console.log('OverviewPanel.tsx - getData() - data:', data);
        } catch (error) {
            console.error('OverviewPanel.tsx - getData() - error:', error);
            toast.error('There was an error fetching overview data - please refresh and try again.');
        }
    }




    const getHistoricalHighLow = async () => {

        try {
            const data = await Dashboard.getCachedHighLowHistorical("device", "co2", "12h");
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

    useEffect(() => {
        getHistoricalHighLow();
        getSensors();
        getData();
    }, []);

    return (
        <>
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