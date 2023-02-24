import { Box, Spinner, Image, Text, Flex, Center, useMediaQuery } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Dashboard from '../../../api/Dashboard/Dashboard';
import BaseCard from '../../layout/BaseCard';

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
                                    w='6rem'
                                />
                                <Box>
                                    <Text
                                        fontWeight='semibold'
                                        fontSize='lg'
                                        mb='-0.25rem'
                                    >
                                        {weatherData['currWeather']}
                                    </Text>
                                    <Text
                                        fontWeight='semibold'
                                        fontSize='3xl'
                                    >
                                        {`${weatherData['temp']} °C`}
                                    </Text>
                                </Box>
                                <Box
                                    fontWeight='semibold'
                                    fontSize='sm'
                                >
                                    <Flex
                                        alignItems='center'
                                    >
                                        <Text>
                                            Wind
                                        </Text>
                                        <Text>
                                            {`: ${weatherData['windSpeed']} km/h ${weatherData['windDir']} ${weatherData['windDeg']}°`}
                                        </Text>
                                    </Flex>

                                    <Flex
                                        alignItems='center'
                                    >
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
                                            <Flex
                                                flexDir='column'
                                                alignItems='center'
                                            >
                                                <Text
                                                    fontWeight='semibold'
                                                >
                                                    {forecast['weekday'].substring(0, 3)}
                                                </Text>
                                                <Image
                                                    src={forecast['iconURL']}
                                                />
                                                <Flex
                                                    fontSize='sm'
                                                >
                                                    <Text
                                                        mr='0.25rem'
                                                        fontWeight='semibold'
                                                    >
                                                        {`${forecast['high']}°`}
                                                    </Text>
                                                    <Text
                                                        color='gray.500'
                                                    >
                                                        {`${forecast['low']}°`}
                                                    </Text>
                                                </Flex>

                                            </Flex>
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