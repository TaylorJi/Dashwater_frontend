import React, { useState } from 'react';
import {
    Box,
    Text,
    FormControl,
    FormLabel,
    FormHelperText,
    FormErrorMessage,
    Grid,
    GridItem,
    Input,
    Button,
    HStack
} from '@chakra-ui/react';
import colors from '../../../../theme/foundations/colours';
import { Form } from 'react-router-dom';

type generalSettingsPanelProps = {
    name: string;
    long: number;
    lat: number;
}

const GeneralSettingsPanel: React.FC<generalSettingsPanelProps> = ({ name, lat, long }) => {
    const [isNameInvalid, setIsNameInvalid] = useState(false);
    const [isLatInvalid, setIsLatInvalid] = useState(false);
    const [isLongInvalid, setIsLongInvalid] = useState(false);

    const [latitude, setLatitude] = useState(lat);
    const [longitude, setLongitude] = useState(long);

    const validLatitude = (latitude: number): boolean => {
        return -90 <= latitude && latitude <= 90;
    };

    const validLongitude = (longitude: number): boolean => {
        return -180 <= longitude && longitude <= 180;
    };

    const searchCoordinates = (latitude: number, longitude: number): undefined => {
        // validate coordinates
        const validLat = validLatitude(latitude);
        const validLong = validLongitude(longitude);

        if (!validLat || !validLong) {
            setIsLatInvalid(!validLat);
            setIsLongInvalid(!validLong);
            return;
        }

        // TODO: otherwise, search the map
    };

    const resetCoordinates = (): undefined => {
        setLatitude(lat);
        setLongitude(long);
        return;
    };

    return (
        <>
            <FormControl isInvalid={isNameInvalid}>
                <FormLabel>Name</FormLabel>
                <Input defaultValue={name} />
                <Box mb={4}>
                    {isNameInvalid ?
                        <FormErrorMessage>Alias name must not be more than 25 characters long.</FormErrorMessage>
                        :
                        <FormHelperText>
                            Enter the alias name for the device.
                        </FormHelperText>
                    }
                </Box>
            </FormControl>

            <hr />

            <Text size={'xl'} mt={7} fontWeight='semibold'>Location</Text>
            <Grid templateAreas={
                `"map coordinates"`
            }
                gridTemplateColumns={'1fr 1fr'}
                mt={4}
                gap={3}
                h='15rem'
            >
                <GridItem pl='2' bg='orange.300' area={'map'} borderRadius={3}>
                    Map goes here
                </GridItem>

                <GridItem>
                    <FormControl isInvalid={isLatInvalid}>
                        <FormLabel>Latitude</FormLabel>
                        <Input
                            defaultValue={lat}
                            type='number'
                            value={latitude}
                            onChange={e => {
                                setLatitude(+e.target.value);
                            }}
                        />
                    </FormControl>

                    <FormControl isInvalid={isLongInvalid}>
                        <FormLabel mt={3}>Longitude</FormLabel>
                        <Input
                            defaultValue={long}
                            type='number'
                            value={longitude}
                            onChange={(e) => {
                                setLongitude(+e.target.value);
                            }}
                        />
                    </FormControl>

                    <HStack mt={3} w='100%'>
                        <Button
                            border='1px'
                            borderColor={colors.main.acidGreen}
                            color={colors.main.acidGreen}
                            bg='transparent'
                            _hover={{
                                color: 'white',
                                bg: colors.main.acidGreen
                            }}
                        >
                            Reset
                        </Button>
                        <Button
                            color='white'
                            bg={colors.main.acidGreen}
                            _hover={{
                                bg: colors.main.mossGreen
                            }}
                        >Search
                        </Button>
                    </HStack>

                </GridItem>
            </Grid>
        </>

    );
};

export default GeneralSettingsPanel;