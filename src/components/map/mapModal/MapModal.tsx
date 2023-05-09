import React, {useState} from "react";
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
import mockBuoyData from "../../../mockData/mockBuoyIdData.json";
import { tileServer, mapModalSpecs } from "../mapConstants";
import  {getAllDeviceInfo}  from "../mapHelpers";
import { selectedIdsAtom } from "./atoms/selectedIdsAtom";
import { useRecoilState } from 'recoil';

type MapModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose }, props) => {
  
  const [selectedIds, setSelectedIds] = useRecoilState(selectedIdsAtom)

  const [isLargeScreen] = useMediaQuery("(min-width: 800px)");
  const [mapKey, setMapKey] = useState<number>(0);
  const { long, lat, zVal, zSet, cLong, cLat } = mapModalSpecs;

  //TODO: This needs to be replaced with fetch from cache
  // const propData = getBuoyMapData(mockBuoyData);

  const [propData, setData] = useState<any>(null);

  const getDeviceData = async () => {

    try {
        const data = await getAllDeviceInfo();
        if (data) {
          setData(data)
        }
        console.log(data);

    } catch (_err) {
        console.log(_err)
    }
};


React.useEffect(() => {
  getDeviceData();
}, [])






  const urlArc = tileServer.ARC_MAP;
  const urlCarto = tileServer.CARTO_MAP;

  const [tilePath, setPath] = useState<string>(urlArc);
  const [selected, setSelect] = useState<boolean>(false);

  const [zoom, setZoom] = useState(zVal);

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

  const handleMapZoom = (zoomLevel: number) => {
    setZoom(zoomLevel);
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
              <MapBuoyList buoys={propData} />
              <Map
                key={mapKey}
                long={long}
                lat={lat}
                zoomVal={zoom}
                zoomSet={zSet}
                center={[cLat, cLong]}
                buoys={propData}
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
                setMapKey(mapKey+1); 
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

              onClick={()=> {
                setSelectedIds(ids);
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
