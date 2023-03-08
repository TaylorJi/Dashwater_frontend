import React, { useEffect, useState } from 'react';
import {
    Box,
    Flex,
    Text,
    Grid,
    GridItem,
    Input,
    Button,
    Divider,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper
} from '@chakra-ui/react';
import { toast } from 'react-hot-toast';
import colors from '../../../../theme/foundations/colours';
import ManageDevices from '../../../../api/ManageDevices/ManageDevices';

type generalSettingsPanelProps = {
    name: string;
    long: number;
    lat: number;
}

const GeneralSettingsPanel: React.FC<generalSettingsPanelProps> = ({ name, lat, long }) => {

    const [buoyName, setBuoyName] = useState<string>(name);
    const [latitude, setLatitude] = useState<number | string>(lat);
    const [longitude, setLongitude] = useState<number | string>(long);
    const [isNameValid, setIsNameValid] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const searchCoordinates = async () => {
        // do search stuff
    };

    const resetCoordinates = () => {
        setLatitude(lat);
        setLongitude(long);
    };

    const saveDeviceSettings = async () => {
        // here to keep TS happy, they will always be numbers by the time this is called
        if (typeof latitude === 'number' && typeof latitude === 'number') {
            setIsLoading(true);
            const response = await ManageDevices.saveDeviceSettings(buoyName, latitude, latitude);
            if (response) {
                toast.success('Device settings saved!');
            } else {
                toast.error('There was a problem saving your device settings. Please try again.');
            }
            setIsLoading(false);

        } else {
            // this is actually an impossible state, but here just in case something breaks
            toast.error('There was a problem with your coordinates. Please try inputting again.');
            resetCoordinates();
        }


    };

    useEffect(() => {
        // Doing this instead of just guarding against 0 length value because
        // that would prevent users from being able to backspace entrely.
        // If this is actually triggered though, the blur will correct/reset
        // to default value.
        if ((buoyName.length === 0 || buoyName.length > 25) && isNameValid) {
            toast.error('Name must be between 1 and 25 characters.');
            setIsNameValid(false);
        } else {
            setIsNameValid(true);
        }
    }, [buoyName]);

    return (
        <Box>
            <Text
                fontWeight='semibold'
                mb='0.25rem'
            >
                Name
            </Text>
            <Input
                value={buoyName}
                onChange={(e) => {
                    const newName = e.target.value;
                    setBuoyName(newName);
                }}
                onBlur={() => {
                    if (buoyName.length === 0 || buoyName.length > 25) {
                        setBuoyName(name);
                    }
                }}
            />
            <Text
                fontSize='sm'
                color='gray.500'
                my='0.25rem'
            >
                Enter the alias name for the device.
            </Text>

            <Divider
                my='1rem'
            />

            <Grid
                templateColumns='repeat(2, 1fr)'
                gap='3'
            >
                <GridItem
                    w='100%'
                    bg='orange.300'
                >
                    Map goes here
                </GridItem>
                <GridItem
                    w='100%'
                >
                    <Text
                        fontWeight='semibold'
                        mb='0.25rem'
                    >
                        Latitude
                    </Text>
                    <NumberInput
                        value={latitude}
                        min={-90}
                        max={90}
                        onChange={(e) => {
                            if (e === '-') {
                                setLatitude('-');
                            } else if (e === '') {
                                setLatitude('');
                            } else {
                                if (!isNaN(parseFloat(e))) {
                                    setLatitude(parseFloat(e));
                                }
                            }
                        }}
                        onBlur={(e) => {
                            // quirk on chakra's part, but I can't make it reset to default if the value is "-",
                            // it just goes to the minimum, e.g. -90
                            if (e.target.value === '') {
                                setLatitude(lat);
                            }
                        }}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>

                    <Text
                        mt='1rem'
                        mb='0.25rem'
                        fontWeight='semibold'
                    >
                        Longitude
                    </Text>
                    <NumberInput
                        value={longitude}
                        min={-180}
                        max={180}
                        onChange={(e) => {
                            if (e === '-') {
                                setLongitude('-');
                            } else if (e === '') {
                                setLongitude('');
                            } else {
                                if (!isNaN(parseFloat(e))) {
                                    setLongitude(parseFloat(e));
                                }
                            }
                        }}
                        onBlur={(e) => {
                            if (e.target.value === '') {
                                setLongitude(long);
                            }
                        }}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <Flex
                        mt='1.25rem'
                    >
                        <Button
                            mr='0.25rem'
                            border='1px'
                            borderColor={colors.main.acidGreen}
                            color={colors.main.acidGreen}
                            bg='transparent'
                            _hover={{
                                color: 'white',
                                bg: colors.main.acidGreen
                            }}
                            onClick={() => resetCoordinates()}
                        >
                            Reset
                        </Button>
                        <Button
                            color='white'
                            bg={colors.main.acidGreen}
                            _hover={{
                                bg: colors.main.mossGreen
                            }}
                            onClick={() => searchCoordinates()}
                        >Search
                        </Button>
                    </Flex>
                </GridItem>
            </Grid>
            <Flex
                mt='2rem'
                justifyContent='flex-end'
            >
                <Button
                    bg={colors.main.usafaBlue}
                    color='white'
                    isLoading={isLoading}
                    isDisabled={!isNameValid} // lat & long will self correct
                    onClick={async () => await saveDeviceSettings()}
                    _hover={{
                        bg: colors.main.ceruBlue
                    }}
                    loadingText='Saving'
                >
                    Save General
                </Button>
            </Flex>
        </Box>

    );
};

export default GeneralSettingsPanel;
