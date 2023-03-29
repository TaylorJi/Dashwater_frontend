import React, { useState, useEffect } from 'react';
import { Select } from '@chakra-ui/react';
import colors from '../../../../theme/foundations/colours';
import {
    Box,
    Button,
    Divider,
    Text,
    Flex,
    Heading,
    NumberInput,
    NumberInputField
} from '@chakra-ui/react';
import { toast } from 'react-hot-toast';
import { buoySensorTags } from '../../../../theme/metrics/buoySensorTags';
import uuid from 'react-uuid';
import ManageDevices from '../../../../api/ManageDevices/ManageDevices';

type calibrationSettingsPanelProps = {
    sensors: {
        [key: string]: metricSettingsType;
    }
}

const CalibrationSettingsPanel: React.FC<calibrationSettingsPanelProps> = ({ sensors }) => {
    const availableSensors = Object.keys(sensors).filter(sensor => sensors[sensor].available);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentMetric, setCurrentMetric] = useState<string>("");
    const [sensorLow, setSensorLow] = useState<number>(0);
    const [physicalLow, setPhysicalLow] = useState<number>(0);
    const [sensorHigh, setSensorHigh] = useState<number>(0);
    const [physicalHigh, setPhysicalHigh] = useState<number>(0);

    useEffect(() => {
        if (currentMetric !== "") {
            setMetricPoints();
        }
    }, [currentMetric]);


    const setMetricPoints = () => {
        setSensorLow(sensors[currentMetric].low.sensor);
        setPhysicalLow(sensors[currentMetric].low.physical);
        setSensorHigh(sensors[currentMetric].high.sensor);
        setPhysicalHigh(sensors[currentMetric].high.physical);
    };

    const saveCalibrationPoint = async () => {
        setIsLoading(true);
        const res = await ManageDevices.saveCalibrationPoint(currentMetric, sensorLow, physicalLow, sensorHigh, physicalHigh);
        if (res) {
            toast.success('Calibration point saved!');
        } else {
            toast.error('There was a problem saving the calibration points. Please try again.')
        }
        setIsLoading(false);
    };

    const removePreviousCalibrationPoint = async () => {
        setIsLoading(true);
        const res = await ManageDevices.removePreviousCalibration();
        if (res) {
            toast.success('Previous calibration point removed');
        } else {
            toast.error('There was a problem removing the previous calibration points. Please try again.')
        }
        setIsLoading(false);
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
                    setCurrentMetric(e.target.value);
                }}
            >
                {
                    availableSensors.map(sensor => {
                        return (
                            <option
                                value={sensor}
                                key={uuid()}
                            >
                                {buoySensorTags[sensor].label}
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

            <Flex direction='column' align='center'>

                <Box>
                    <Heading size='sm' mb={3}>Low Value</Heading>
                    <Flex mb={8}>
                        <Box mr={8}>
                            <Text fontWeight='semibold' mb={1}>
                                Sensor
                            </Text>
                            <NumberInput
                                value={sensors[currentMetric]?.low.sensor}
                            >
                                <NumberInputField />
                            </NumberInput>
                        </Box>
                        <Box>
                            <Text fontWeight='semibold' mb={1}>
                                Physical
                            </Text>
                            <NumberInput
                                value={sensors[currentMetric]?.low.physical}
                            >
                                <NumberInputField />
                            </NumberInput>
                        </Box>
                    </Flex>
                </Box>

                <Box>
                    <Heading size='sm' mb={3}>High Value</Heading>
                    <Flex mb={8}>
                        <Box mr={8}>
                            <Text fontWeight='semibold' mb={1}>
                                Sensor
                            </Text>
                            <NumberInput
                                value={sensors[currentMetric]?.high.sensor}
                            >
                                <NumberInputField />
                            </NumberInput>
                        </Box>
                        <Box>
                            <Text fontWeight='semibold' mb={1}>
                                Physical
                            </Text>
                            <NumberInput
                                value={sensors[currentMetric]?.high.physical}
                            >
                                <NumberInputField />
                            </NumberInput>
                        </Box>
                    </Flex>
                </Box>
            </Flex>

            <Flex mt={8} justifyContent="flex-end">
                <Button
                    mr={1.5}
                    border='1px'
                    borderColor={colors.main.usafaBlue}
                    color={colors.main.usafaBlue}
                    bg='transparent'
                    isLoading={isLoading}
                    onClick={async () => await removePreviousCalibrationPoint()}
                    _hover={{
                        bg: colors.main.ceruBlue
                    }}
                    loadingText='Saving'
                >
                    Remove Previous Calibration
                </Button>


                <Button
                    bg={colors.main.usafaBlue}
                    color='white'
                    isLoading={isLoading}
                    onClick={async () => await saveCalibrationPoint()}
                    _hover={{
                        bg: colors.main.ceruBlue
                    }}
                    loadingText='Saving'
                >
                    Add Calibration
                </Button>

            </Flex>
        </>
    );
};

export default CalibrationSettingsPanel;
