import { Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { mockDeviceData } from '../../../mockData/dashboardMockData';

const IntervalPanel: React.FC = () => {

    return (
        <>
            <Grid templateColumns='repeat(3, 1fr)' gap={3}>
                <GridItem
                    w='100%'
                >

                </GridItem>
            </Grid>

        </>
    );
};

export default IntervalPanel;