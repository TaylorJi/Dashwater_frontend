import React, { useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Divider,
  useDisclosure,
  IconButton,
  Icon,
  Text,
  useModalContext,
  HStack,
  useMediaQuery,
} from "@chakra-ui/react";

import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import colors from "../../theme/foundations/colours";
import Map from "./Map";
import { MapContainer, TileLayer } from "react-leaflet";
import MapBuoyList from './MapBuoyList';
import borders from '../../theme/foundations/borders';
import { SelectContext } from "./SelectContext";


type MapModalProps = {
  isOpen: boolean;
  onClose: () => void;
}

const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose }) => {
  const [isLargeScreen] = useMediaQuery("(min-width: 1600px)");
  //TODO: REMOVE AFTER TESTING
  const myBuoys = [
    { name: 'Buoy 1', id: 1, x: 49.107, y: -123.15521 },
    { name: 'Buoy 2', id: 2, x: 49.106, y: -123.15591 },
    { name: 'Buoy 3', id: 3, x: 49.1820, y: -123.15012 },
    { name: 'Buoy 4', id: 4, x: 49.1907214, y: -123.11 },
    { name: 'Buoy 5', id: 5, x: 49.19120, y: -123.15091 },
    { name: 'Buoy 6', id: 6, x: 49.1820, y: -123.15012 },
    { name: 'Buoy 7', id: 7, x: 49.1907, y: -123.1521 },
    { name: 'Buoy 8', id: 8, x: 49.120, y: -123.1501 },
    { name: 'Buoy 9', id: 9, x: 49.820, y: -123.15012 },
  ];

  //TODO: Move these to config file for maps
  const urlArc = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
  const urlCarto = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
  
  const [tilePath, setPath] = React.useState<string>(urlArc)
  const [selected, setSelect] = React.useState<boolean>(false);
  const [ids, setIds] = React.useState<number[]>([]);

  const updateSelected = (select: boolean, id: number) => { 
    setSelect(select);
    if (select) setIds([...ids, id])
    else setIds(ids.filter((currentId) => currentId !== id))
  }

  const updateIds = (newIds: number[]) => {
    setIds(newIds);
  }

  const selectContext = React.useMemo(() => {
    return {
      selected,
      ids,
      updateSelected,
      updateIds,
    }
  }, [selected, ids])

  const clearIdList = () => {
    setIds([]);
  }

    React.useEffect(() => {
    if (!isOpen) {
      clearIdList();
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset={"slideInBottom"}
      size={"xl"}
    >
      <ModalOverlay bg={"whiteAlpha.100"} />
      <ModalContent maxW="80%" >
        <ModalHeader ml={"0.5%"}>Select Devices by Map</ModalHeader>
        <Divider ml={"1rem"}/>
        <ModalCloseButton onClick={clearIdList}/>
        <ModalBody>
          <HStack>
            <SelectContext.Provider value={selectContext}>
              <MapBuoyList buoys={myBuoys}/>
              <Map 
              //TODO: Move these to constants 
                long={-123.17557} 
                lat={49.195007} 
                zoomVal={12.75} // ideal value for map tile layer switches
                zoomSet={0.25}
                center={[49.195007, -123.17557]}
                buoys={myBuoys}
                tilePath={tilePath}
              />
            </SelectContext.Provider>
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Button 
            colorScheme="orange" mr={"40%"} 
            onClick={
              ()=> tilePath === urlArc ? setPath(urlCarto) : setPath(urlArc)
            }>
            Switch Map
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MapModal;
