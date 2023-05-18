import React, { useState, useEffect } from "react";
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
import typography from "../../../theme/foundations/typography";
import { tileServer, mapModalSpecs } from "../mapConstants";
import { getDeviceDetailInfo } from "../mapHelpers";
import { selectedIdsAtom } from "./atoms/selectedIdsAtom";
import { allDevicesDetails } from "../../wrappers/DeviceDetailsWrapper/deviceManagerAtoms";
import { useRecoilValue, useSetRecoilState } from "recoil";

type MapModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose }) => {
  const setSelectedIds = useSetRecoilState(selectedIdsAtom);
  const deviceDetails = useRecoilValue(allDevicesDetails);
  const [isLargeScreen] = useMediaQuery("(min-width: 800px)");
  const [mapKey, setMapKey] = useState<number>(0);
  const { long, lat, zVal, zSet, cLong, cLat } = mapModalSpecs;
  const [buoyInfo, setBuoyInfo] = useState<buoyInfo | undefined>();

  useEffect(() => {
    const mapBuoyInfo = getDeviceDetailInfo(deviceDetails);
    setBuoyInfo(mapBuoyInfo)
  }, []);

  const urlArc = tileServer.ARC_MAP;
  const urlCarto = tileServer.CARTO_MAP;

  const [tilePath, setPath] = useState<string>(urlArc);
  const [selected, setSelect] = useState<boolean>(false);

  const [ids, setIds] = useState<number[]>([]);

  const selectContext = React.useMemo(() => {
    const updateSelected = (select: boolean, id: number) => {
      setSelect(select);
      if (select) setIds([...ids, id]);
      else setIds(ids.filter((currentId) => currentId !== id));
    };

    const updateIds = (newIds: number[]) => {
      setIds(newIds);
    };

    return {
      selected,
      ids,
      updateSelected,
      updateIds,
    };
  }, [selected, ids]);

  const clearIdList = () => {
    setIds([]);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset={"slideInBottom"}
      size={"xl"}
    >
      <ModalOverlay />
      <ModalContent maxW={isLargeScreen ? "60%" : "75%"}>
        <ModalHeader ml={"0.5%"}>
          <Text
            fontFamily={typography.fonts.heading}
            fontSize={typography.fontSizes.xl}
          >
            Select Devices by Map
          </Text>
        </ModalHeader>
        <Divider ml={"1rem"} maxW={"95%"} marginBottom={"1.5rem"} />
        <ModalCloseButton onClick={onClose} />
        <ModalBody>
          <HStack>
            <SelectContext.Provider value={selectContext}>
              <MapBuoyList buoys={buoyInfo} />
              <Map
                key={mapKey}
                long={long}
                lat={lat}
                zoomVal={zVal}
                zoomSet={zSet}
                center={[cLat, cLong]}
                buoys={buoyInfo}
                tilePath={tilePath}
                drawable={true}
                mapId={"mapId"}
                isModal={true}
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
              onClick={() => {
                tilePath === urlArc ? setPath(urlCarto) : setPath(urlArc);
                setMapKey(mapKey + 1);
              }}
            >
              Switch Map
            </Button>

            <Button
              minW={isLargeScreen ? "7rem" : "3rem"}
              color={colors.main.usafaBlue}
              bg={"white"}
              border={`2px solid ${colors.main.usafaBlue}`}
              onClick={clearIdList}
            >
              Clear
            </Button>
            <Button
              minW={isLargeScreen ? "7rem" : "3rem"}
              color={"white"}
              bg={colors.main.usafaBlue}
              _hover={{
                bg: colors.main.ceruBlue,
              }}
              onClick={() => {
                setSelectedIds(ids.map((id: number) => {
                  return String(id)
                }));
                onClose();
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