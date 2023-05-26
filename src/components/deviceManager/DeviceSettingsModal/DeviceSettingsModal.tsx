import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Icon,
  Text,
} from "@chakra-ui/react";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeviceSettingsTabs from "./DeviceSettingsTabs";
import colors from "../../../theme/foundations/colours";

export interface buoySettingsType {
  id: string;
  name: string;
  location: {
    x: number;
    y: number;
  };
  sensors: sensorType[];
  // other properties
}

type deviceSettingsModalProps = {
  buoy: buoySettingsType;
};

const DeviceSettingsModal: React.FC<deviceSettingsModalProps> = ({ buoy }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label="Settings"
        bg="main.lavender"
        ml="0.5rem"
        icon={
          <Icon as={FontAwesomeIcon} icon={faGear} color="main.usafaBlue" />
        }
        _hover={{
          bg: colors.main.ceruBlue,
        }}
      />

      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Device Settings
            <Text fontSize="sm">{`id: ${buoy.id}`}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <DeviceSettingsTabs buoy={buoy} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeviceSettingsModal;
