import { Box } from '@chakra-ui/react';
import React from 'react';
import BaseCard from '../../layout/BaseCard';

const WeatherCard: React.FC = () => {

    return (
        <Box
            my='0.5rem'
        >
            <BaseCard>
                <>
                    Hello World
                </>
            </BaseCard>
        </Box>
    );
};

export default WeatherCard;