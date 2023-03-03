import { Text, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Grid, GridItem, useMediaQuery } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import { mockDeviceData } from '../../../mockData/dashboardMockData';
import IntervalGridItem from './IntervalGridItem';

const IntervalPanel: React.FC = () => {

    const [deviceData, setDeviceData] = useState<deviceDataType | null>(null);
    const [isLargeScreen] = useMediaQuery('(min-width: 1600px)');

    const LG_COLS = 3;
    const SM_COLS = 2;

    useEffect(() => {
        setDeviceData(mockDeviceData);
    }, []);

    return (
        <>
            {
                deviceData &&
                <>
                    {
                        Object.keys(mockDeviceData).map((key) => {

                            return (
                                <Accordion allowToggle>
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
                                                    mockDeviceData[key].map((item) => {
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
            }

        </>
    );
};

export default IntervalPanel;