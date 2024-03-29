import { CircularProgress, CircularProgressLabel, Text } from '@chakra-ui/react';
import React from 'react';
import colors from '../../theme/foundations/colours';

type circleGraphProps = {
    percent: number;
    value: number;
    unit: string;
};

const CicleGraph: React.FC<circleGraphProps> = ({ percent, value, unit }) => {

    return (
        <CircularProgress
            size='8rem'
            value={percent}
            color={colors.main.usafaBlue}
        >
            <CircularProgressLabel>
                <Text
                    fontSize='md'
                >
                    {value} <Text as={'span'} fontSize='2xs'>{`${unit}`}</Text>
                </Text>
            </CircularProgressLabel>
        </CircularProgress>
    );
};

export default CicleGraph;