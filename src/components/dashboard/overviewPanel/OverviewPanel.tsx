import {
    Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel,
    Grid, Box, Text, useMediaQuery
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import { mockGaugeData } from '../../../mockData/dashboardMockData';
import OverviewGridItem from './OverviewGridItem';

const OverviewPanel: React.FC = () => {

    const [deviceData, setDeviceData] = useState<RawGaugeDataType | null>(null);
    const [isLargeScreen] = useMediaQuery('(min-width: 1600px)');

    const LG_COLS = 4;
    const SM_COLS = 3;

    useEffect(() => {
        setDeviceData(mockGaugeData);
    }, []);

    return (
        <>
            {
                deviceData && <>
                    {
                        Object.keys(mockGaugeData).map((key) => {

                            return (
                                <Accordion
                                    allowToggle
                                    key={uuid()}
                                    defaultIndex={[0]}
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
                                                    mockGaugeData[key].map((item) => {
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
            }
        </>
    );
};

export default OverviewPanel;