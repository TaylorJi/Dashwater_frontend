import React from 'react';
import DeviceManagerRowSkeleton from './DeviceManagerRowSkeleton';

const DeviceManagerTableSkeleton: React.FC = () => {
    return(
        <>
        <DeviceManagerRowSkeleton />
        <DeviceManagerRowSkeleton opacity={0.5}/>
        <DeviceManagerRowSkeleton opacity={0.3}/>
        <DeviceManagerRowSkeleton opacity={0.2}/>
        <DeviceManagerRowSkeleton opacity={0.1}/>
        </>
    );
};

export default DeviceManagerTableSkeleton;
