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
import { isRealNumber } from '../../../helpers/formHelpers';

type generalSettingsPanelProps = {
    name: string;
    long: number;
    lat: number;
}

const GeneralSettingsPanel: React.FC<generalSettingsPanelProps> = ({ name, lat, long }) => {
    const [isNameInvalid, setIsNameInvalid] = useState<boolean>(false);
    const [isLatInvalid, setIsLatInvalid] = useState<boolean>(false);
    const [isLongInvalid, setIsLongInvalid] = useState<boolean>(false);

    const [latitude, setLatitude] = useState<string>(lat.toString());
    const [longitude, setLongitude] = useState<string>(long.toString());

    const validLatitude = (latitude: string): boolean => {
        return isRealNumber(latitude) && -90 <= +latitude && +latitude <= 90;
    };

    const validLongitude = (longitude: string): boolean => {
        console.log(isRealNumber(longitude));
        console.log(+longitude);
        return isRealNumber(longitude) && -180 <= +longitude && +longitude <= 180;
    };

    const searchCoordinates = (): undefined => {
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

    const resetCoordinates = (): void => {
        setLatitude(lat.toString());
        setLongitude(long.toString());
        setIsLatInvalid(false);
        setIsLongInvalid(false);
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
                h='16rem'
            >
                <GridItem pl='2' bg='orange.300' area={'map'} borderRadius={3}>
                    Map goes here
                </GridItem>

                <GridItem>
                    <FormControl isInvalid={isLatInvalid}>
                        <FormLabel>Latitude</FormLabel>
                        <Input
                            value={latitude}
                            onChange={e => {
                                setIsLatInvalid(false);
                                setLatitude(e.target.value);
                            }}
                        />
                        <Box h={3}>
                            {isLatInvalid ?
                                <FormErrorMessage>Input a number between -90 to 90.</FormErrorMessage>
                                :
                                <FormHelperText/>
                            }
                        </Box>
                    </FormControl>

                    <FormControl isInvalid={isLongInvalid}>
                        <FormLabel mt={3}>Longitude</FormLabel>
                        <Input
                            defaultValue={long}
                            value={longitude}
                            onChange={(e) => {
                                setIsLongInvalid(false);
                                setLongitude(e.target.value);
                            }}
                        />
                        <Box h={3}>
                            {isLongInvalid ?
                                <FormErrorMessage>Input a number between -180 to 180.</FormErrorMessage>
                                :
                                <FormHelperText/>
                            }
                        </Box>
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
                            onClick={resetCoordinates}
                        >
                            Reset
                        </Button>
                        <Button
                            color='white'
                            bg={colors.main.acidGreen}
                            _hover={{
                                bg: colors.main.mossGreen
                            }}
                            onClick={searchCoordinates}
                        >Search
                        </Button>
                    </HStack>

                </GridItem>
            </Grid>
        </>

    );
};

export default GeneralSettingsPanel;