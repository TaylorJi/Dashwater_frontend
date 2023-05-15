import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import React from 'react';
import DatePicker from "react-widgets/DatePicker";
import "react-widgets/styles.css";
import colors from '../../../theme/foundations/colours';

type CustomRangeModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

const CustomRangeModal: React.FC<CustomRangeModalProps> = ({ isOpen, onClose }) => {

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
                        defaultValue={new Date()}
                        valueFormat={{ dateStyle: 'medium' }}
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
                        defaultValue={new Date()}
                        valueFormat={{ dateStyle: 'medium' }}
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
                    >
                        Save Range
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default CustomRangeModal;