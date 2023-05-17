import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import DatePicker from "react-widgets/DatePicker";
import "react-widgets/styles.css";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import Dashboard from '../../../api/Dashboard/Dashboard';
import colors from '../../../theme/foundations/colours';
import { deviceDataAtom } from '../atoms/intervalPanelAtoms';
import { logDataAtom } from '../logPanel/atoms/logPanelAtoms';

type CustomRangeModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

const CustomRangeModal: React.FC<CustomRangeModalProps> = ({ isOpen, onClose }) => {

    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const setGlobalDeviceData = useSetRecoilState(deviceDataAtom);
    const setLogData = useSetRecoilState(logDataAtom);

    const resetGlobalDeviceData = useResetRecoilState(deviceDataAtom);
    const resetLogData = useResetRecoilState(logDataAtom);

    const getCustomRangeData = async () => {

        try {

            resetLogData();
            resetGlobalDeviceData();

            toast.success('Sit tight! This data is not cached and might take a while to load.', { icon: '❗' });

            const deviceData = await Dashboard.getCustomRangeData(startDate, endDate);
            const logData = await Dashboard.getCustomRangeLogData(startDate, endDate);

            if (deviceData && logData) {
                setGlobalDeviceData(deviceData);
                setLogData(logData);

            } else {
                toast.error('There was an error fetching custom range data - please refresh and try again.');
            }

        } catch {
            toast.error('There was an error fetching custom range data - please refresh and try again.');
        }

    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Select a Custom Range</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <Text
                        fontSize='sm'
                        fontWeight='semibold'
                        mb='0.25rem'
                    >
                        Starting Date
                    </Text>
                    <DatePicker
                        placeholder='Enter start date...'
                        valueFormat={{ dateStyle: 'medium' }}
                        onChange={(e) => {
                            if (e) {
                                setStartDate(e.toISOString());
                            }
                        }}
                    />

                    <Text
                        fontSize='sm'
                        fontWeight='semibold'
                        mt='0.5rem'
                        mb='0.25rem'
                    >
                        Ending Date
                    </Text>
                    <DatePicker
                        placeholder='Enter end date...'
                        valueFormat={{ dateStyle: 'medium' }}
                        onChange={(e) => {
                            if (e) {
                                setEndDate(e.toISOString());
                            }
                        }}
                    />
                </ModalBody>

                <ModalFooter>
                    <Button
                        bg={colors.main.usafaBlue}
                        ml='0.5rem'
                        color='white'
                        _hover={{
                            bg: colors.main.activeMainButton
                        }}
                        isDisabled={startDate === '' || endDate === '' || (new Date(startDate) > new Date(endDate))}
                        onClick={async () => {
                            onClose();
                            await getCustomRangeData();
                        }}
                    >
                        Save Range
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default CustomRangeModal;