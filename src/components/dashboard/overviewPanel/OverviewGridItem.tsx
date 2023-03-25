import { GridItem, Box, Text, Flex } from '@chakra-ui/react';
import React from 'react';
import CircleGraph from '../../graphs/CicleGraph';
import BaseCard from '../../layout/BaseCard';

type intervalGridItemProps = {
    item: GaugeDataType;
}

const OverviewGridItem: React.FC<intervalGridItemProps> = ({ item }) => {

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
                    {item['metric']}
                </Text>
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
            </BaseCard>
        </GridItem>
    );
};

export default OverviewGridItem;