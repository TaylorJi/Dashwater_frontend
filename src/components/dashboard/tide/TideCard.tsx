import { Text, Box, Flex, Spinner, useMediaQuery } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
    ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip,
    Label, Line, LineChart
} from 'recharts';
import Dashboard from '../../../api/Dashboard/Dashboard';
import colors from '../../../theme/foundations/colours';
import typography from '../../../theme/foundations/typography';
import BaseCard from '../../layout/BaseCard';

const TideCard: React.FC = () => {

    const [tideData, setTideData] = useState<tideDataType[] | null>(null);
    const [isLargeScreen] = useMediaQuery('(min-width: 1600px)');

    const getTideData = async () => {

        try {
            const data = await Dashboard.getTide();
            if (data) {
                console.log(data);
                setTideData(data);

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
                                <ResponsiveContainer width="99%" height={isLargeScreen ? 275 : 225}>
                                    <LineChart
                                        data={tideData}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="time"
                                            style={{
                                                fontSize: '0.6rem',
                                                fontFamily: typography.fonts.body
                                            }}
                                        >
                                            <Label
                                                offset={-4}
                                                value="Time"
                                                position="insideBottom"
                                                style={{
                                                    fontSize: isLargeScreen ? '0.75rem' : '0.6rem',
                                                    fontFamily: typography.fonts.body,
                                                    paddingTop: '1rem'
                                                }}
                                            />
                                        </XAxis>
                                        <YAxis
                                            style={{
                                                fontSize: isLargeScreen ? '0.75rem' : '0.6rem',
                                                fontFamily: typography.fonts.body,
                                            }}
                                        >
                                            <Label
                                                value="Height (m)"
                                                angle={-90}
                                                position="insideLeft"
                                                dy={30}
                                                offset={14}
                                                style={{
                                                    fontSize: isLargeScreen ? '0.75rem' : '0.6rem',
                                                    fontFamily: typography.fonts.body,
                                                }}
                                            />
                                        </YAxis>
                                        <Tooltip />
                                        <Line type="monotone" dataKey="height" stroke={colors.main.usafaBlue} activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Box>
                        </>
                        :
                        <Flex
                            h='5rem'
                            w='100%'
                            justifyContent='space-evenly'
                            alignItems='center'
                        >
                            <Spinner size='lg' />
                        </Flex>
                }

            </BaseCard>
        </Box>
    );
};

export default TideCard;