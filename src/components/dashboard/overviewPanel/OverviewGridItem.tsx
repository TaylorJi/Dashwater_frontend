import { GridItem, Tooltip, Text, Flex, Box, useMediaQuery, Center } from '@chakra-ui/react';
import React from 'react';
import CircleGraph from '../../graphs/CicleGraph';
import BaseCard from '../../layout/BaseCard';
import { MISSING_VALUE } from '../dashboardHelpers';

type intervalGridItemProps = {
    item: GaugeDataType;
}

const OverviewGridItem: React.FC<intervalGridItemProps> = ({ item }) => {

    const [isLargeScreen] = useMediaQuery('(min-width: 1600px)');

    return (
        <GridItem
            w='100%'
            h='fit-content'
        >
            <BaseCard>
                <Text
                    fontSize='lg'
                    fontWeight='bold'
                    w='fit-content'
                >
                    {item['metric']}
                </Text>
                <Box>
                    <Tooltip
                        placement='right'
                        ml={isLargeScreen ? '-7rem' : '-4.25rem'}
                        label={
                            <>
                                <Text fontSize='xs'>{`Low: ${item['low']} ${item['unit']}`}</Text>
                                <Text fontSize='xs'>{`High: ${item['high']} ${item['unit']}`}</Text>
                                
                            </>}
                        bg='white'
                        color='black'
                    >
                        <Flex
                            mt='1rem'
                            ml='-0.75rem'
                            justifyContent='center'
                        >
                            {
                                item['current'] === MISSING_VALUE ?
                                    <Center>
                                        <Text
                                            color='gray.300'
                                            fontStyle='italic'
                                        >
                                            No data available for this time.
                                        </Text>
                                    </Center>
                                    : <CircleGraph
                                        percent={
                                            ((item['current'] - item['low']) / (item['high'] - item['low'])) * 100
                                        }
                                        value={Number(item['current'].toFixed(3))}
                                        unit={item['unit']}
                                    />
                            }

                        </Flex>
                    </Tooltip>
                </Box>
            </BaseCard>
        </GridItem>
    );
};

export default OverviewGridItem;