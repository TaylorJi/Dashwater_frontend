import React, { useState, useRef, useEffect } from 'react';
import colors from '../../../../theme/foundations/colours';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Flex,
    Button,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogBody,
    AlertDialogFooter,
    useDisclosure,
    AlertDialogCloseButton,
} from '@chakra-ui/react';
import { toast } from 'react-hot-toast';
import CalibrationPointRow from './CalibrationPointRow';
import ManageDevices from '../../../../api/ManageDevices/ManageDevices';
import { useRecoilValue } from 'recoil';
import { calibrationPoints } from '../../../wrappers/DeviceDetailsWrapper/deviceManagerAtoms';

type calibrationTableProp = {
    sensor: sensorType;
    sensors: sensorType[];
    buoy: deviceSettingsType;
    setUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>;
    unsavedChanges: React.SetStateAction<boolean>;
}

const CalibrationTable: React.FC<calibrationTableProp> = ({ sensor, sensors, buoy, unsavedChanges, setUnsavedChanges }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef(null);

    const allCalibrationPoints = useRecoilValue(calibrationPoints);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isReset, setIsReset] = useState<boolean>(false);
    const [sensorCalibrationPoints, setSensorCalibrationPoints] = useState(allCalibrationPoints[sensor.id]);

    useEffect(() => {
        setSensorCalibrationPoints(allCalibrationPoints[sensor.id]);
    }, [sensor])

    const saveSelectedSensorCalibrationPoints = async () => {
        setIsLoading(true);
        console.log("sensorCalibrationPoints", sensorCalibrationPoints);
        const res = await ManageDevices.saveCalibrationPoints(sensorCalibrationPoints, sensors, buoy);
        if (res) {
            toast.success('Calibration point saved!');
            window.location.reload();
        } else {
            toast.error('There was a problem saving the calibration points. Please try again.')
        }
        setIsLoading(false);
        setUnsavedChanges(false);
    };

    const resetSelectedSensorCalibrationPoints = () => {
        setSensorCalibrationPoints(allCalibrationPoints[sensor.id]);
        setUnsavedChanges(false);
    };


    return (
        <>
            <Table>
                <Thead>
                    <Tr>
                        <Th color={colors.main.usafaBlue}>Calibration Point</Th>
                        <Th color={colors.main.usafaBlue}>Physical Value</Th>
                        <Th color={colors.main.usafaBlue}>Calibrated Value</Th>
                        <Th color={colors.main.usafaBlue}>Unit</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        sensorCalibrationPoints.length > 0 ?
                        // NOTE: When device data is pulled, ensure that calibration
                        // points are sorted by id in ascending order. Here, we assume it is sorted.
                            sensorCalibrationPoints.map((point, index) => {
                                return (
                                    <CalibrationPointRow
                                        number={index + 1}
                                        point={point}
                                        unit={sensor.defaultUnit}
                                        setUnsavedChanges={setUnsavedChanges}
                                        setSensorCalibrationPoints={setSensorCalibrationPoints}
                                        sensorCalibrationPoints={sensorCalibrationPoints}
                                        key={index}
                                    />
                                )
                            }) : <></>
                    }
                </Tbody>
            </Table>

            <Flex mt={8} justifyContent="flex-end">
                <Button
                    mr={1.5}
                    border='1px'
                    borderColor={colors.main.usafaBlue}
                    color={colors.main.usafaBlue}
                    bg='transparent'
                    isLoading={isLoading}
                    onClick={resetSelectedSensorCalibrationPoints}
                    _hover={{
                        bg: colors.main.ceruBlue
                    }}
                    _focus={{ bg: 'white' }}
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
                                onClick={async () => await saveSelectedSensorCalibrationPoints()}
                                ml={3}>
                                Confirm Calibration
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}

export default CalibrationTable;