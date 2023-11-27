import { Text, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Grid, useMediaQuery } from '@chakra-ui/react';
import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import uuid from 'react-uuid';
import { useRecoilState, useRecoilValue } from 'recoil';
import Dashboard from '../../../api/Dashboard/Dashboard';
import LoadingGraphic from '../../layout/LoadingGraphic';
import { deviceDataAtom, displayedDashboardDataSelector } from '../atoms/intervalPanelAtoms';
import IntervalGridItem from './IntervalGridItem';

const IntervalPanel: React.FC = () => {

    // const [globalDeviceData, setGlobalDeviceData] = useRecoilState(deviceDataAtom);
    // const deviceData = useRecoilValue(displayedDashboardDataSelector);

    const [allDeviceData, setAllDeviceData] = useState<any[]>([]);
    // const [timeRange, setTimeRange] = useState(localStorage.getItem("timeRange"));

    const [isLargeScreen] = useMediaQuery('(min-width: 1600px)');

    const LG_COLS = 3;
    const SM_COLS = 2;

    const getDeviceData = useCallback(async () => {

        try {
            // console.log(await Dashboard.getAllBuoyIds());
            // const data = await Dashboard.getAllBuoyIds();
            console.log("getDeviceData in IntervalPanel is called");
            const end = localStorage.getItem("timeRange");
            const data = await Dashboard.getCachedData(end!);

            if (data) {
                setAllDeviceData(data);
                // setGlobalDeviceData(data);

            } else {
                toast.error('There was an error fetching device data - please refresh and try again.');
            }

        } catch {
            toast.error('There was an error fetching device data - please refresh and try again.');
        }

    }, []);


    // const getDeviceData = async (device: string, end: string) => {
    //     try {
    //         // console.log(await Dashboard.getAllBuoyIds());
    //         // const data = await Dashboard.getAllBuoyIds();
    //         const data = await Dashboard.getData(device, end);

    //         if (data) {
    //             setGlobalDeviceData(data);
    //         } else {
    //             toast.error('There was an error fetching device data - please refresh and try again.');
    //         }

    //     } catch {
    //         toast.error('There was an error fetching device data - please refresh and try again.');
    //     }
    // };

    useEffect(() => {
        // if (!globalDeviceData) {
            getDeviceData();
        // }
    }, [getDeviceData, localStorage.getItem("timeRange")]);

    return (
        <>
            {
                allDeviceData ?
                    <>
                        <Accordion
                            defaultIndex={[0]}
                            allowMultiple
                        >
                            {
                                Object.keys(allDeviceData).map((key: any) => {

                                    if (Object.keys(allDeviceData[key]).length > 0) {
                                        return (

                                            <AccordionItem
                                                key={uuid()}
                                            >
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
                                                            {`Device ${key} Data`}
                                                        </Text>
                                                    </Box>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                                <AccordionPanel pb={4}>
                                                    <Grid templateColumns={`repeat(${isLargeScreen ? LG_COLS : SM_COLS}, 1fr)`} gap={3}>
                                                        {
                                                            allDeviceData[key].map((item : any) => {
                                                                return (
                                                                    <IntervalGridItem
                                                                        key={uuid()}
                                                                        item={item}
                                                                    />
                                                                )
                                                            })
                                                        }
                                                    </Grid>
                                                </AccordionPanel>
                                            </AccordionItem>

                                        )
                                    }

                                })

                            }
                        </Accordion>
                    </>
                    :
                    <LoadingGraphic />
            }

        </>
    );
};

export default IntervalPanel;