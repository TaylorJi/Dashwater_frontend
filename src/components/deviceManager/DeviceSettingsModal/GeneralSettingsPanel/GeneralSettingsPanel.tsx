import React, { useEffect, useState } from "react";
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
  NumberInputStepper,
} from "@chakra-ui/react";
import { toast } from "react-hot-toast";
import colors from "../../../../theme/foundations/colours";
import ManageDevices from "../../../../api/ManageDevices/ManageDevices";
import { mapCardSpecs, tileServer } from "../../../map/mapConstants";
import Map from "../../../map/mapContainer/Map";

type generalSettingsPanelProps = {
  name: string;
  description: string;
  long: number;
  lat: number;
};

const GeneralSettingsPanel: React.FC<generalSettingsPanelProps> = ({
  name,
  description,
  lat,
  long,
}) => {
  const [deviceSettings, setDevicesSettings] = useState<generalSettingsType>({} as generalSettingsPanelProps);

  useEffect(() => {
    setDevicesSettings({
      'name': name, 
      'description': description, 
      'lat': lat, 
      'long': long})
  }, []);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resetCoordinates = () => {
    setDevicesSettings({...deviceSettings, 'lat': lat, 'long': long});
  };

  const saveDeviceSettings = async () => {
    setIsLoading(true);
    const response = await ManageDevices.saveDeviceSettings(deviceSettings);
    if (response) {
      toast.success("Device settings saved!");
    } else {
      toast.error(
        "There was a problem saving your device settings. Please try again."
      );
    }
    setIsLoading(false);
  };

  return (
    <Box>
      <Text fontWeight="semibold" mb="0.25rem">
        Name
      </Text>
      <Input
        value={deviceSettings.name}
        onChange={(e) => {
          const newName = e.target.value;
          setDevicesSettings({...deviceSettings, 'name': newName});
        }}
        onBlur={() => {
          if (deviceSettings.name.length === 0 || deviceSettings.name.length > 25) {
            toast.error("Name must be between 1 and 25 characters.");
            setDevicesSettings({...deviceSettings, 'name': name});
          }
        }}
      />
      <Text fontSize="sm" color="gray.500" my="0.25rem">
        Enter the alias name for the device.
      </Text>

      <Divider my="1rem" />

      <Text fontWeight="semibold" mb="0.25rem">
        Location
      </Text>

      <Grid templateColumns="repeat(2, 1fr)" gap="3">
        <GridItem w="100%">
          <Map
            long={mapCardSpecs.long}
            lat={mapCardSpecs.long}
            zoomVal={mapCardSpecs.zVal}
            zoomSet={mapCardSpecs.zSet}
            center={[mapCardSpecs.cLat, mapCardSpecs.cLong]}
            tilePath={tileServer.CARTO_MAP}
            drawable={false}
            mapId={"mapCardId"}
            isModal={false}
            isSettings={true}
            settingsCoords={[
              isNaN(Number(deviceSettings.lat)) ? 0 : Number(deviceSettings.lat),
              isNaN(Number(deviceSettings.long)) ? 0 : Number(deviceSettings.long),
            ]}
          />
        </GridItem>
        <GridItem w="100%">
          <Text fontWeight="semibold" mb="0.25rem">
            Latitude
          </Text>
          <NumberInput
            precision={4}
            step={0.0001}
            value={deviceSettings.lat}
            min={-90}
            max={90}
            onChange={(e) => {
              setDevicesSettings({...deviceSettings, 'lat': +e});
            }}
            onBlur={(e) => {
              // quirk on chakra's part, but I can't make it reset to default if the value is "-",
              // it just goes to the minimum, e.g. -90
              if (e.target.value === "") {
                setDevicesSettings({...deviceSettings, 'lat': +e});
              }
            }}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>

          <Text mt="1rem" mb="0.25rem" fontWeight="semibold">
            Longitude
          </Text>
          <NumberInput
            precision={4}
            step={0.0001}
            value={deviceSettings.long}
            allowMouseWheel={false}
            min={-180}
            max={180}
            onChange={(e) => {
              setDevicesSettings({...deviceSettings, 'long': +e});
            }}
            onBlur={(e) => {
              if (e.target.value === "") {
                setDevicesSettings({...deviceSettings, 'long': +e});
              }
            }}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Flex mt="1.25rem">
            <Button
              mr="0.25rem"
              border="1px"
              borderColor={colors.main.acidGreen}
              color={colors.main.acidGreen}
              bg="transparent"
              _hover={{
                color: "white",
                bg: colors.main.acidGreen,
              }}
              onClick={() => resetCoordinates()}
            >
              Reset
            </Button>
          </Flex>
        </GridItem>
      </Grid>
      <Flex mt="2rem" justifyContent="flex-end">
        <Button
          bg={colors.main.usafaBlue}
          color="white"
          isLoading={isLoading}
          onClick={async () => await saveDeviceSettings()}
          _hover={{
            bg: colors.main.ceruBlue,
          }}
          loadingText="Saving"
        >
          Save
        </Button>
      </Flex>
    </Box>
  );
};

export default GeneralSettingsPanel;
