import React from 'react';
import { Tag } from '@chakra-ui/react';
import { buoySensorTags } from '../../../theme/metrics/buoySensorTags';

type sensorTagProps = {
    metricKey: string;
};


const SensorTag: React.FC<sensorTagProps> = ({ metricKey }) => {
    const buoySensor = buoySensorTags[metricKey];
    if (!buoySensor) {
        console.warn(`Unknown metricKey: ${metricKey}`);
        return null; // or return a default component
    }
    return (
        <Tag
            bg={buoySensor.color}
            m='.125rem'
        >
            {buoySensor.label}
        </Tag>
    );
};

export default SensorTag;
