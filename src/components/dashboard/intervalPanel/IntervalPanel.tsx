import { Text, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Grid, useMediaQuery } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import uuid from 'react-uuid';
import Dashboard from '../../../api/Dashboard/Dashboard';
import { remapData } from '../../../api/Dashboard/dashboardHelpers';
import LoadingGraphic from '../../layout/LoadingGraphic';
import IntervalGridItem from './IntervalGridItem';

const IntervalPanel: React.FC = () => {

    const [deviceData, setDeviceData] = useState<deviceDataType | null>(null);
    const [isLargeScreen] = useMediaQuery('(min-width: 1600px)');

    const LG_COLS = 3;
    const SM_COLS = 2;

    const getDeviceData = async () => {

        try {
            const data = await Dashboard.getCachedData('2023-02-10T18:44:59.274Z');

            if (data) {
                setDeviceData(remapData(data));

            } else {
                toast.error('There was an error fetching device data - please refresh and try again.');
            }

        } catch {
            toast.error('There was an error fetching device data - please refresh and try again.');
        }

    };

    useEffect(() => {
        getDeviceData();
    }, []);

    return (
        <>
            {
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
                                                        {`Device ${key} Data`}
                                                    </Text>
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                            <AccordionPanel pb={4}>
                                                <Grid templateColumns={`repeat(${isLargeScreen ? LG_COLS : SM_COLS}, 1fr)`} gap={3}>
                                                    {
                                                        deviceData[key].map((item) => {
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

export default IntervalPanel;