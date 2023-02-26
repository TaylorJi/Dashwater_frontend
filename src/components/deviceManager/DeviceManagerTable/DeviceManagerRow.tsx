import React, { useEffect, useState } from 'react';
import { Text, Table, Thead, Tbody, Th, Tr, Td } from '@chakra-ui/react';

type buoySettingsRowProps = {
    buoy: buoySettingsType;
};


const BuoySettingsRow: React.FC<buoySettingsRowProps> = ({ buoy }) => {

    return (
        <Tr>
            <Td>{buoy.name}</Td>
            <Td>{buoy.id}</Td>
            <Td>{buoy.location.x + ';' + buoy.location.y}</Td>
            <Td>temp</Td>
            <Td>button</Td>
        </Tr>
    )

}

export default BuoySettingsRow;