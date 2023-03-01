import { Text, Box, Flex, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Dashboard from '../../../api/Dashboard/Dashboard';
import LineGraph from '../../graphs/LineGraph';
import BaseCard from '../../layout/BaseCard';
import BaseCardLoading from '../../layout/BaseCardLoading';

const TideCard: React.FC = () => {

    const [tideData, setTideData] = useState<graphDataType[] | null>(null);
    const [high, setHigh] = useState<graphDataType | null>(null);
    const [low, setLow] = useState<graphDataType | null>(null);

    const getTideData = async () => {

        try {
            const data = await Dashboard.getTide();
            if (data) {
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
                    tideData
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
                                />
                            </Box>
                        </>
                        :
                        <BaseCardLoading />
                }

            </BaseCard>
        </Box>
    );
};

export default TideCard;