import React from 'react';
import uuid from 'react-uuid';
import { 
    Tr, 
    Td,
    Text
} from '@chakra-ui/react';
import DeviceSettingsModal from '../DeviceSettingsModal/DeviceSettingsModal';
import SensorTag from '../SensorTag/SensorTag';

type buoySettingsRowProps = {
    buoy: deviceSettingsType;
};


const BuoySettingsRow: React.FC<buoySettingsRowProps> = ({ buoy }) => {

    return (
            <Tr h='6rem'>
                <Td><Text as='b'>{buoy.name}</Text></Td>
                <Td>{buoy.id}</Td>
                <Td>
                    {
                        buoy['sensors'].map(sensor => {
                            console.log(sensor.metric);
                            return (
                                <SensorTag metricKey={sensor.metric} key={uuid()} />
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
