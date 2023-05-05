import React, { useState, useRef } from 'react';
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


type calibrationTableProp = {
    sensor: sensorType;
}

const CalibrationTable: React.FC<calibrationTableProp> = ({ sensor }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
    const [sensorInfo, setSensorInfo] = useState<sensorType>({} as sensorType);

    const saveCalibrationPoint = async () => {
        setIsLoading(true);
        const res = await ManageDevices.saveCalibrationPoint(sensorInfo);
        if (res) {
            toast.success('Calibration point saved!');
        } else {
            toast.error('There was a problem saving the calibration points. Please try again.')
        }
        setIsLoading(false);
        setUnsavedChanges(false);
    };

    const handleChange = (point: calibrationPointType) => { 
        setSensorInfo({ ... sensor, calibration_points: sensor.calibration_points.map(p => {
            if (p.id === point.id) {
                return point;
            }
            return p;
        })});
    };

    return (
        <>
            <Table>

                <Thead>
                    <Tr>
                        <Th color={colors.main.usafaBlue}>Calibration Point</Th>
                        <Th color={colors.main.usafaBlue}>Physical Value</Th>
                        <Th color={colors.main.usafaBlue}>Digital Value</Th>
                        <Th color={colors.main.usafaBlue}>Unit</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        sensor['calibration_points'].length > 0 ?
                            sensor['calibration_points'].sort((a, b) => {
                                return a.id - b.id;
                            }).map((point, index) => {
                                return (
                                    <CalibrationPointRow
                                        number={index + 1}
                                        point={point}
                                        unit={sensor.default_metric_unit}
                                        setUnsavedChanges={setUnsavedChanges}
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
}

export default CalibrationTable;