import React, { useState, useRef } from 'react';
import colors from '../../../../theme/foundations/colours';
import {
    Box,
    Button,
    Divider,
    Text,
    Flex,
    Heading,
    NumberInput,
    NumberInputField,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogBody,
    AlertDialogFooter,
    useDisclosure,
    Select,
    Popover,
    PopoverTrigger,
    Portal,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    AlertDialogCloseButton,
} from '@chakra-ui/react';
import { toast } from 'react-hot-toast';
import { buoySensorTags } from '../../../../theme/metrics/buoySensorTags';
import uuid from 'react-uuid';
import ManageDevices from '../../../../api/ManageDevices/ManageDevices';
import CalibrationTable from './CalibrationTable';

type calibrationSettingsPanelProps = {
    sensors: sensorType[];
}

const CalibrationSettingsPanel: React.FC<calibrationSettingsPanelProps> = ({ sensors }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentMetric, setCurrentMetric] = useState<string>("");
    const [calibrationInfo, setCalibrationInfo] = useState<sensorType>({} as sensorType);
    const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (calibrationInfo) {
            setUnsavedChanges(true);
            setCalibrationInfo({ ...calibrationInfo, [e.target.name]: e.target.value });
        }
    };

    const saveCalibrationPoint = async () => {
        setIsLoading(true);
        if (calibrationInfo) {
            const res = await ManageDevices.saveCalibrationPoint(calibrationInfo);
            if (res) {
                toast.success('Calibration point saved!');
            } else {
                toast.error('There was a problem saving the calibration points. Please try again.')
            }
            setIsLoading(false);
            setUnsavedChanges(false);
        }
    };

    return (
        <>
            <Text fontWeight='semibold' mb={1}>
                Metric
            </Text>
            <Select
                size='sm'
                borderRadius='0.25rem'
                placeholder='Select Metric'
                w='15rem'
                value={currentMetric}
                borderColor={colors.main.usafaBlue}
                onChange={e => {

                    let sensor = sensors.find(sensor => sensor.metric_type === e.target.value)
                    if (sensor) {
                        setCurrentMetric(e.target.value);
                        setCalibrationInfo(sensor);
                    }
                }}
            >
                {
                    sensors.map(sensor => {
                        return (
                            <option
                                value={sensor.metric_type}
                                key={uuid()}
                            >
                                {buoySensorTags[sensor.metric_type].label}
                            </option>
                        )
                    })
                }
            </Select>

            <Text
                mb={4}
                as='span'
                fontSize='sm'
                color='gray.500'
            >
                Select a metric to add calibration value points.
            </Text>

            <Divider
                my={4}
            />

            {
                currentMetric !== "" &&
                <CalibrationTable
                    calibrationPoints={
                        calibrationInfo.calibration_points
                    }
                    unit={calibrationInfo.default_metric_unit}
                    setUnsavedChanges={setUnsavedChanges}
                />
            }


            <Flex mt={8} justifyContent="flex-end">
                <Button
                    mr={1.5}
                    border='1px'
                    borderColor={colors.main.usafaBlue}
                    color={colors.main.usafaBlue}
                    bg='transparent'
                    isLoading={isLoading}
                    onClick={onOpen}
                    _hover={{
                        bg: colors.main.ceruBlue
                    }}
                    loadingText='Saving'
                    isDisabled={!unsavedChanges}
                >
                    Revert Changes
                </Button>


                <Button
                    bg={colors.main.usafaBlue}
                    color='white'
                    isLoading={isLoading}
                    onClick={onOpen}
                    _hover={{
                        bg: colors.main.ceruBlue
                    }}
                    loadingText='Saving'
                    isDisabled={currentMetric == ""}
                >
                    Calibrate
                </Button>
            </Flex>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                variant="flushed"
                isCentered
            >

                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Save Calibration Points?
                        </AlertDialogHeader>
                        <AlertDialogCloseButton />

                        <AlertDialogBody>
                            Are you sure you want to save these calibration points? This will overwrite previous calibration point values.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                bg={colors.main.usafaBlue}
                                color='white'
                                _hover={{
                                    bg: colors.main.ceruBlue
                                }}
                                onClick={async () => await saveCalibrationPoint()} 
                                ml={3}>
                                Confirm Calibration
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default CalibrationSettingsPanel;
