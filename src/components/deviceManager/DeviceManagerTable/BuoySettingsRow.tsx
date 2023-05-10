import React from 'react';
import uuid from 'react-uuid';
import { Tr, Td } from '@chakra-ui/react';
import DeviceSettingsModal from '../DeviceSettingsModal/DeviceSettingsModal';
import SensorTag from '../SensorTag/SensorTag';

type buoySettingsRowProps = {
    buoy: deviceSettingsType;
};


const BuoySettingsRow: React.FC<buoySettingsRowProps> = ({ buoy }) => {

    return (
        <Tr>
            <Td>{buoy.name}</Td>
            <Td>{buoy.id}</Td>
            <Td>{buoy.location.x + ';' + buoy.location.y}</Td>
            <Td>
                {
                    buoy['sensors'].map( sensor => {
                            return (
                                <SensorTag metricKey={sensor.metric_type} key={uuid()}/>
                            );
                    })
                }
            </Td>
            <Td>
                <DeviceSettingsModal 
                buoy={buoy}
                />
            </Td>
        </Tr>
    );
};

export default BuoySettingsRow;
