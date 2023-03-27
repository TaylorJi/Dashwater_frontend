import { GridItem, Tooltip, Text, Flex, Box, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import CircleGraph from '../../graphs/CicleGraph';
import BaseCard from '../../layout/BaseCard';

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
                                <Text fontSize='xs'>{`Stable: ${item['stable']} ${item['unit']}`}</Text>
                                <Text fontSize='xs'>{`Warning: ${item['warning']} ${item['unit']}`}</Text>
                            </>}
                        bg='white'
                        color='black'
                    >
                        <Flex
                            mt='1rem'
                            ml='-0.75rem'
                            justifyContent='center'
                        >

                            <CircleGraph
                                percent={
                                    (item['current'] / item['warning']) * 100
                                }
                                value={item['current']}
                                unit={item['unit']}
                            />


                        </Flex>
                    </Tooltip>
                </Box>
            </BaseCard>
        </GridItem>
    );
};

export default OverviewGridItem;