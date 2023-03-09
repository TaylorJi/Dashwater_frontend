import React, { useState } from 'react';
import buoyData from "../../mockData/mockBuoyData.json";
import MapListItem from './MapListItem';

import {
    Text,
    Stack,
    Card,
    CardBody,
  } from '@chakra-ui/react'


const MapBuoyList: React.FC<buoyMapInfo> = (props) => {

    return (
    <Card minWidth={'30%'}>   
      <CardBody >
        <Stack minHeight={'15rem'}>
        {
        props.buoys ? props.buoys.map((buoy)=>(
          <MapListItem deviceName={buoy.name} id={buoy.id}/>
        )) : <Text>No devices currently available</Text>
      }
        </Stack>
      </CardBody>
    </Card> 
    );

};

export default MapBuoyList;