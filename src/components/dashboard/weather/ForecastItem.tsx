import { Flex, Text, Image } from '@chakra-ui/react';
import React from 'react';

type forecastItemProps = {
    forecast: weatherForecastType;
};

const ForecastItem: React.FC<forecastItemProps> = ({ forecast }) => {

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
    );
};

export default ForecastItem;