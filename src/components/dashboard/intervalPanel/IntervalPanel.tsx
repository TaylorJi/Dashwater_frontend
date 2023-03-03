import { Box, Grid, GridItem, useMediaQuery } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { mockDeviceData } from '../../../mockData/dashboardMockData';
import AreaGraph from '../../graphs/AreaGraph';
import BaseCard from '../../layout/BaseCard';

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
                <Grid templateColumns={`repeat(${isLargeScreen ? LG_COLS : SM_COLS}, 1fr)`} gap={3}>
                    {
                        Object.keys(mockDeviceData).map((key) => {
                            return mockDeviceData[key].map((item) => {
                                return (
                                    <GridItem
                                        w='100%'
                                        h='fit-content'
                                    >
                                        <BaseCard>
                                            <Box
                                                mt='1rem'
                                                ml='-0.75rem'
                                            >
                                                <AreaGraph
                                                    data={item['data']}
                                                    xAxisLabel={item['xAxisName']}
                                                    yAxisLabel={item['yAxisName']}
                                                    xKey='time'
                                                    graphDataKey='value'
                                                    offsetY={60}
                                                />
                                            </Box>
                                        </BaseCard>
                                    </GridItem>
                                )
                            })
                        })
                    }
                </Grid>
            }

        </>
    );
};

export default IntervalPanel;