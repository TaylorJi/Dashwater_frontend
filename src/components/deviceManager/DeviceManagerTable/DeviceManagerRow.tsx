import React from 'react';
import { Tr, Td, Tag } from '@chakra-ui/react';
import colors from '../../../theme/foundations/colours';
import DeviceSettingsModal from './DeviceSettingsModal';

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
                {buoy.sensors.dissolved_o2.available ?
                    <Tag bg={colors.tag.dissolvedO2} m='.125rem' > Oxygen </Tag> : null
                }
                {buoy.sensors.pH.available ?
                    <Tag bg={colors.tag.pH} m='.125rem'> pH </Tag> : null
                }
                {buoy.sensors.electrical_conductivity.available ?
                    <Tag bg={colors.tag.electricalConductivity} m='.125rem'> Conductivity </Tag> : null
                }
                {buoy.sensors.turbidity.available ?
                    <Tag bg={colors.tag.turbidity} m='.125rem'> Turbidity </Tag> : null
                }
                {buoy.sensors.dissolved_solids.available ?
                    <Tag bg={colors.tag.disolvedSolids} m='.125rem'> Solids </Tag> : null
                }
                {buoy.sensors.temp.available ?
                    <Tag bg={colors.tag.temp} m='.125rem'> Temperature </Tag> : null
                }
                {buoy.sensors.water_lvl.available ?
                    <Tag bg={colors.tag.waterLvl} m='.125rem'> Water Lvl </Tag> : null
                }
                {buoy.sensors.water_flow.available ?
                    <Tag bg={colors.tag.waterFlow} m='.125rem'> Water Flow </Tag> : null
                }

                {buoy.sensors.water_pressure.available ?
                    <Tag bg={colors.tag.waterPressure} m='.125rem'> Water Pressure </Tag> : null
                }
            </Td>
            <Td>
                <DeviceSettingsModal buoy={buoy}/>
            </Td>
        </Tr>
    );
};

export default BuoySettingsRow;
