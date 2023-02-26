import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
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
                size='md'
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

            <Modal isOpen={isOpen} onClose={onClose} size="2xl" >
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader>
                        Device Settings
                        <Text fontSize='sm'>{`id: ${buoy.id}`}</Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <DeviceSettingsTabs />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme={colors.main.ceruBlue} mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button
                            bg={colors.main.usafaBlue}
                            color="white"
                            onClick={onClose}
                            _hover={{
                                bg: colors.main.ceruBlue
                            }}
                        >Save Changes</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default DeviceSettingsModal;
