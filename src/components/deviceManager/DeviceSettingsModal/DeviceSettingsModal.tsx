import React from 'react';
import {
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    IconButton,
    Icon,
    Text
} from '@chakra-ui/react'
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeviceSettingsTabs from './DeviceSettingsTabs';
import colors from '../../../theme/foundations/colours';

type deviceSettingsModalProps = {
    buoy: buoySettingsType;
};


const DeviceSettingsModal: React.FC<deviceSettingsModalProps> = ({ buoy }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <IconButton
                onClick={onOpen}
                aria-label='Settings'
                bg='main.lavender'
                ml='0.5rem'
                icon={<Icon
                    as={FontAwesomeIcon}
                    icon={faGear}
                    color='main.usafaBlue'
                />}
                _hover={{
                    bg: colors.main.ceruBlue
                }}
            />

            <Modal isOpen={isOpen} onClose={onClose} size="2xl">
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader>
                        Device Settings
                        <Text fontSize='sm'>{`id: ${buoy.id}`}</Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <DeviceSettingsTabs buoy={buoy} />
                    </ModalBody>

                    <ModalFooter>
                        <Box h="3rem"/>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default DeviceSettingsModal;
