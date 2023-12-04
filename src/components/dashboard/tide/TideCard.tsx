import { Text, Box, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import uuid from 'react-uuid';
import Dashboard from '../../../api/Dashboard/Dashboard';
import LineGraph from '../../graphs/LineGraph';
import BaseCard from '../../layout/BaseCard';
import BaseCardLoading from '../../layout/BaseCardLoading';
import { roundTo2Dec, timeHelper } from '../dashboardHelpers';

const TideCard: React.FC = () => {

    const [tideData, setTideData] = useState<graphDataType[] | null>(null);
    const [high, setHigh] = useState<rawTideExtremeDataType[] | null>(null);
    const [low, setLow] = useState<rawTideExtremeDataType[] | null>(null);

    const getTideData = async () => {

        try {
            const data = await Dashboard.getTide();
            if (data) {

                Object.keys(data).map((key) => {
                    return data[key].map((pred: any) => {
                        pred['time'] = timeHelper(pred['time']);
                        return pred;
                    });
                });

                setTideData(data['allData']);
                setHigh(data['high']);
                setLow(data['low']);

            } else {
                toast.error('Oh no! There was a problem fetching tide data. Please refresh the page.');
            }

        } catch (_err) {
            toast.error('Oh no! There was a problem fetching tide data. Please refresh the page.');
        }
    };

    useEffect(() => {
        getTideData();
    }, []);

    return (
        <Box
            my='0.5rem'
        >
            <BaseCard>
                {
                    tideData && high && low
                        ?
                        <>
                            <Text
                                fontSize='lg'
                                fontWeight='bold'
                            >
                                Tidal Predictions
                            </Text>
                            <Box
                                mt='1rem'
                                ml='-0.75rem'
                            >
                                <LineGraph
                                    data={tideData}
                                    xAxisLabel='Time'
                                    yAxisLabel='Height (m)'
                                    xKey='time'
                                    graphDataKey='height'
                                    offsetY={30}
                                />
                            </Box>
                            <Flex
                                justifyContent='space-evenly'
                                mt='0.75rem'
                            >
                                <Flex
                                    flexDir='column'
                                    alignItems='center'
                                >
                                    <Text
                                        fontWeight='bold'
                                    >
                                        High Tide
                                    </Text>
                                    {
                                        high.map((pred) => {
                                            return (
                                                <Text
                                                    key={uuid()}
                                                >
                                                    <Text as={'span'} fontWeight='semibold'>{`${roundTo2Dec(pred['height'])}m `}</Text>
                                                    at {`${pred['time']} `}
                                                </Text>
                                            )
                                        })
                                    }
                                </Flex>
                                <Flex
                                    flexDir='column'
                                    alignItems='center'
                                >
                                    <Text
                                        fontWeight='bold'
                                    >
                                        Low Tide
                                    </Text>
                                    {
                                        low.map((pred) => {
                                            return (
                                                <Text
                                                    key={uuid()}
                                                >
                                                    <Text as={'span'} fontWeight='semibold'>{`${roundTo2Dec(pred['height'])}m `}</Text>
                                                    at {`${pred['time']} `}
                                                </Text>
                                            )
                                        })
                                    }
                                </Flex>
                            </Flex>
                        </>
                        :
                        <BaseCardLoading />
                }

            </BaseCard>
        </Box>
    );
};

export default TideCard;
