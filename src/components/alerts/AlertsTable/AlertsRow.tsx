import React from 'react';
import { Tr, Td, Icon } from '@chakra-ui/react';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import colors from '../../../theme/foundations/colours';
import SensorTag from '../../deviceManager/SensorTag/SensorTag';


type alertRowProps = {
    alert: buoyAlertType;
};


const AlertsRow: React.FC<alertRowProps> = ({ alert }) => {
    let alertMessage = alert.above_max ? ' above Threshold!' : ' below Threshold!'
    alertMessage = alert.data ? alert.metric_name + alertMessage : 'No data for over 72 hours'
    console.log(alert);

    return (
        <Tr>
            <Td fontWeight='semibold'>{alertMessage}</Td>
            <Td>
                {alert.data ? <SensorTag metricKey={alert.metric} /> : <>--</>}
            </Td>
            <Td>
                {alert.data ? alert.above_max ?
                    <>
                        <Icon
                            as={FontAwesomeIcon}
                            icon={faArrowUp}
                            color={colors.highlight.red}
                            mr='0.25rem'
                        />
                        {alert.difference}
                    </>
                    :
                    <>
                        <Icon
                            as={FontAwesomeIcon}
                            icon={faArrowDown}
                            color={colors.highlight.blue}
                            mr='0.25rem'
                        />
                        {alert.difference}
                    </> :
                    <>
                        --
                    </>
                }
            </Td>
            <Td>{alert.buoy.name}</Td>
            <Td>{alert.buoy.id}</Td>
            <Td>{alert.time}</Td>
        </Tr>
    );
};

export default AlertsRow;
