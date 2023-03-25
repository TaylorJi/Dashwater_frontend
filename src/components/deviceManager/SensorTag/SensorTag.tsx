import React from 'react';
import { Tag } from '@chakra-ui/react';
import { buoySensorTags } from '../../../theme/metrics/buoySensorTags';

type sensorTagProps = {
    metricKey: string;
    visible: boolean;
};


const SensorTag: React.FC<sensorTagProps> = ({ metricKey, visible }) => {
    return (
        <> {
            visible ?
                <Tag
                    bg={buoySensorTags[metricKey].color}
                    m='.125rem'
                >
                    {buoySensorTags[metricKey].label}
                </Tag>
                :
                <></>
        }
        </>

    );
};

export default SensorTag;
