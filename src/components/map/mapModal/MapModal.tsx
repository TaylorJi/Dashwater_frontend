import React, { useState } from "react";
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Divider,
  HStack,
  useMediaQuery,
} from "@chakra-ui/react";
import Map from "../mapContainer/Map";
import MapBuoyList from "../mapContainer/MapBuoyList";
import { SelectContext } from "../SelectContext";
import colors from "../../../theme/foundations/colours";
import typography from '../../../theme/foundations/typography';
import mockBuoyData from '../../../mockData/mockBuoyIdData.json';

type MapModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose }) => {
  const [isLargeScreen] = useMediaQuery("(min-width: 800px)");

  // To convert id string to number for use in select context id array
  const buoyMapData = (buoyData: buoyInfo) => {
    let mapData: { name: string; id: number; x: number; y: number; }[] = [];
    buoyData.buoys?.map((buoy) => {
      mapData.push({
        name: buoy.name,
        id: Number(buoy.id),
        x: buoy.location.x,
        y: buoy.location.y})
    })
    if (!mapData) return []
    return mapData;
  }

  const propData = buoyMapData(mockBuoyData)
  //TODO: Move these to constants file for maps
  const urlArc =
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
  const urlCarto =
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

  const [tilePath, setPath] = React.useState<string>(urlArc);
  const [selected, setSelect] = React.useState<boolean>(false);
  const [ids, setIds] = React.useState<number[]>([]);

  const updateSelected = (select: boolean, id: number) => {
    setSelect(select);
    if (select) setIds([...ids, id]);
    else setIds(ids.filter((currentId) => currentId !== id));
  };

  const updateIds = (newIds: number[]) => {
    setIds(newIds);
  };

  const selectContext = React.useMemo(() => {
    return {
      selected,
      ids,
      updateSelected,
      updateIds,
    };
  }, [selected, ids]);

  // This function is needed to pass state to onClick
  //  for modal close button to reset the state of ids.
  const clearIdList = () => {
    setIds([]);
  };

  React.useEffect(() => {
    if (!isOpen) {
      clearIdList();
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset={'slideInBottom'}
      size={'xl'}
    >
      <ModalOverlay />
      <ModalContent maxW={isLargeScreen? '60%' : '75%'}>
        <ModalHeader ml={'0.5%'}>
          <Text 
            fontFamily={typography.fonts.heading}
            fontSize={typography.fontSizes.xl}
          >Select Devices by Map</Text>
        </ModalHeader>
        <Divider ml={'1rem'} maxW={'95%'} marginBottom={'1.5rem'}/>
        <ModalCloseButton onClick={clearIdList} />
        <ModalBody>
          <HStack>
            <SelectContext.Provider value={selectContext}>
              <MapBuoyList buoys={propData} />
              <Map
                //TODO: Move these to constants
                long={-123.17557}
                lat={49.195007}
                zoomVal={12.75} // ideal value for map tile layer switches
                zoomSet={0.25}
                center={[49.195007, -123.17557]}
                buoys={propData}
                tilePath={tilePath}
              />
            </SelectContext.Provider>
          </HStack>
        </ModalBody>
        <ModalFooter>
          <HStack
            spacing={isLargeScreen ? "1.5rem" : "0.5rem"}
            mr={isLargeScreen ? "1rem" : "0.5rem"}
          >
            <Button
              color={"white"}
              minW={isLargeScreen ? "7rem" : "3rem"}
              bg={colors.main.acidGreen}
              _hover={{
                bg: colors.main.mossGreen,
              }}
              onClick={() =>
                tilePath === urlArc ? setPath(urlCarto) : setPath(urlArc)
              }
            >
              Switch Map
            </Button>

            <Button 
              minW={isLargeScreen ? "7rem" : "3rem"}
              color={colors.main.usafaBlue}
              bg={'white'}
              border={`2px solid ${colors.main.usafaBlue}`}
              onClick={onClose}
              >
                Cancel
            </Button>
            <Button
              minW={isLargeScreen ? "7rem" : "3rem"}
              color={"white"}
              bg={colors.main.usafaBlue}
              _hover={{
                bg: colors.main.ceruBlue,
              }}
            >
              Confirm
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MapModal;
