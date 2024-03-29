import { GridItem, Box, Text, Center } from '@chakra-ui/react';
import React from 'react';
import AreaGraph from '../../graphs/AreaGraph';
import BaseCard from '../../layout/BaseCard';

type intervalGridItemProps = {
    item: measureType;
}

const IntervalGridItem: React.FC<intervalGridItemProps> = ({ item }) => {

    return (
        <GridItem
            w='100%'
            h='fit-content'
        >
            <BaseCard>
                <Text
                    fontSize='lg'
                    fontWeight='bold'
                >
                    {item['measureName']}
                </Text>
                <Box
                    mt='1rem'
                    ml='-0.75rem'
                >
                    {
                        item['data'].length === 0 ?
                            <Center>
                                <Text
                                    color='gray.300'
                                    fontStyle='italic'
                                >
                                    No data available for this time.
                                </Text>
                            </Center>
                            :
                            <AreaGraph
                                data={item['data']}
                                xAxisLabel={item['xAxisName']}
                                yAxisLabel={item['yAxisName']}
                                xKey='time'
                                graphDataKey='value'
                                offsetY={0}
                            />
                    }
                </Box>
            </BaseCard>
        </GridItem>
    );
};

export default IntervalGridItem;