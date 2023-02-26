import React from 'react';
import uuid from 'react-uuid';
import { Tr, Td } from '@chakra-ui/react';
import DeviceSettingsModal from './DeviceSettingsModal';
import SensorTag from '../SensorTag/SensorTag';

type buoySettingsRowProps = {
    buoy: buoySettingsType;
};


const BuoySettingsRow: React.FC<buoySettingsRowProps> = ({ buoy }) => {

    return (
        <Tr>
            <Td>{buoy.name}</Td>
            <Td>{buoy.id}</Td>
            <Td>{buoy.location.x + ';' + buoy.location.y}</Td>
            <Td>
                {
                    Object.keys(buoy['sensors']).map( (sensor: string) => {
                            return (
                                <SensorTag metricKey={sensor} key={uuid()} visible={buoy.sensors[sensor].available}/>
                            );
                    })
                }
            </Td>
            <Td>
                <DeviceSettingsModal buoy={buoy}/>
            </Td>
        </Tr>
    );
};

export default BuoySettingsRow;
