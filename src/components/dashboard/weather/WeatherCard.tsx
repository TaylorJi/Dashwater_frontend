import { Box, Spinner, Image, Text, Flex, Center, useMediaQuery } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Dashboard from '../../../api/Dashboard/Dashboard';
import BaseCard from '../../layout/BaseCard';
import ForecastItem from './ForecastItem';
import uuid from 'react-uuid';

const WeatherCard: React.FC = () => {

    const [weatherData, setWeatherData] = useState<weatherDataType | null>(null);
    const [isLargeScreen] = useMediaQuery('(min-width: 1600px)');

    const getWeatherData = async () => {

        try {
            const data = await Dashboard.getWeather();
            if (data) {
                setWeatherData(data);

            } else {
                toast.error('Oh no! There was a problem fetching weather data. Please refresh the page.');
            }

        } catch (_err) {
            toast.error('Oh no! There was a problem fetching weather data. Please refresh the page.');
        }
    };

    useEffect(() => {
        getWeatherData();
    }, []);

    return (
        <Box
            my='0.5rem'
        >
            <BaseCard>
                {
                    weatherData
                        ?
                        <>
                            <Flex
                                alignItems='center'
                                justifyContent='space-around'
                                mt='-1rem'
                            >
                                <Image
                                    src={weatherData['iconURL']}
                                    w={isLargeScreen ? '6rem' : '5rem'}
                                />
                                <Box>
                                    <Text
                                        fontWeight='semibold'
                                        fontSize={isLargeScreen ? 'lg' : 'md'}
                                        mb={isLargeScreen ? '-0.25rem' : '0'}
                                        mr={isLargeScreen ? '0' : '1.5rem'}
                                    >
                                        {weatherData['currWeather']}
                                    </Text>
                                    <Text
                                        fontWeight='semibold'
                                        fontSize={isLargeScreen ? '3xl' : 'lg'}
                                    >
                                        {`${weatherData['temp']} °C`}
                                    </Text>
                                </Box>
                                <Box
                                    fontWeight='semibold'
                                    fontSize={isLargeScreen ? 'sm' : 'xs'}
                                >
                                    <Flex>
                                        <Text>
                                            Wind
                                        </Text>
                                        <Text>
                                            {`: ${weatherData['windSpeed']} km/h ${weatherData['windDir']} ${weatherData['windDeg']}°`}
                                        </Text>
                                    </Flex>

                                    <Flex>
                                        <Text>
                                            Pressure
                                        </Text>
                                        <Text>
                                            {`: ${weatherData['windPressure']} mb`}
                                        </Text>
                                    </Flex>
                                </Box>
                            </Flex>
                            <Flex
                                mt='0.5rem'
                                alignItems='center'
                                justifyContent='space-evenly'
                            >
                                {
                                    weatherData['forecast'].map((forecast) => {
                                        return (
                                            <ForecastItem
                                                forecast={forecast}
                                                key={uuid()}
                                            />
                                        )
                                    })
                                }
                            </Flex>
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

export default WeatherCard;