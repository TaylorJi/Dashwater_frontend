import React from "react";
import BaseLayout from "../components/layout/BaseLayout";
import Icon from "@chakra-ui/icon";
import { Select } from "@chakra-ui/select";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeviceManagerTable from "../components/deviceManager/DeviceManagerTable/DeviceManagerTable";
import colors from "../theme/foundations/colours";
import MapModal from '../components/map/mapModal/MapModal';
import {
  Button,
  Flex,
  Text,
  useMediaQuery,
  Center,
  useDisclosure,
} from "@chakra-ui/react";

const DeviceManager: React.FC = () => {
  const [isLargeScreen] = useMediaQuery("(min-width: 1600px)");

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <BaseLayout isNavbarVisible={true}>
        <Flex w="100%" minH="100vh" py="2rem" pr="1rem" flexDirection="column">
          <Text fontSize={isLargeScreen ? "3xl" : "2xl"} fontWeight="bold">
            Manage Devices
          </Text>

          <Flex px="4rem" pt="2rem">
            <Select
              size="sm"
              borderRadius="0.25rem"
              placeholder="Select Devices"
              w="15rem"
              borderColor={colors.main.usafaBlue}
            />
            <Button
              size="sm"
              bg="main.acidGreen"
              ml="0.5rem"
              color="white"
              fontSize="sm"
              rightIcon={
                <Icon as={FontAwesomeIcon} icon={faChevronRight} color="white" />
              }
              _hover={{
                bg: colors.main.mossGreen,
              }}
              onClick={onOpen}
            >
              Select by Map
            </Button>
            {
              false ?
                <Select
                  size="sm"
                  borderRadius="0.25rem"
                  placeholder="Select Sensors"
                  ml="2rem"
                  w="15rem"
                  borderColor={colors.main.usafaBlue}
                />
                : <></>
            }
          </Flex>
          <MapModal isOpen={isOpen} onClose={onClose} />
          <Center px="4rem" pt="2rem">
            <DeviceManagerTable />
          </Center>
        </Flex>
    </BaseLayout>
  );
};

export default DeviceManager;
