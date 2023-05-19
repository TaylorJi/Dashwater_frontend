import React from 'react';
import {
    Skeleton,
    Tr,
    Td
} from '@chakra-ui/react';
import SensorTag from '../../SensorTag/SensorTag';

type deviceManagerRowSkeletonProps = {
    opacity?: number;
}

const DeviceManagerRowSkeleton: React.FC<deviceManagerRowSkeletonProps> = ({ opacity }) => {
    return (
        <Tr h='6rem' opacity={opacity}>
            <Td><Skeleton>A</Skeleton></Td>
            <Td><Skeleton>1</Skeleton></Td>
            <Td>
                <Skeleton>
                    <SensorTag metricKey='tds' />
                </Skeleton>
            </Td>
            <Td>
                <Skeleton
                    h='2.5rem'
                    w='2.5rem'
                    ml='0.5rem'
                    borderRadius={5}
                />
            </Td>
        </Tr>
    );
};

export default DeviceManagerRowSkeleton;
