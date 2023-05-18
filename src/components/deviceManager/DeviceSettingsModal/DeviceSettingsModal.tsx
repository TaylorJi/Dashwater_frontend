import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
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
    Text
} from '@chakra-ui/react'
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeviceSettingsTabs from './DeviceSettingsTabs';
import colors from '../../../theme/foundations/colours';
import ManageDevices from '../../../api/ManageDevices/ManageDevices';
import { userDataAtom } from '../../dashboard/atoms/globalDashboardAtoms';
import { userDeviceThresholds } from '../../wrappers/DeviceDetailsWrapper/deviceManagerAtoms';

type deviceSettingsModalProps = {
    buoy: deviceSettingsType;
};

const DeviceSettingsModal: React.FC<deviceSettingsModalProps> = ({ buoy }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const userData = useRecoilValue(userDataAtom);
    const setUserThresholdsByDevice = useSetRecoilState(userDeviceThresholds);

    const fetchUserThresholds = async () => {
        const userThresholds = await ManageDevices.getUserThresholdsByDevice(userData?.userId, buoy.id)
        console.log(userThresholds);
        setUserThresholdsByDevice(userThresholds);
    };

    useEffect(() => {
        fetchUserThresholds();
    }, []);

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

            <Modal isOpen={isOpen} onClose={onClose} size="3xl">
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader>
                        Device Settings
                        <Text fontSize='sm'>{`id: ${buoy.id}`}</Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <DeviceSettingsTabs
                            buoy={buoy}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default DeviceSettingsModal;
