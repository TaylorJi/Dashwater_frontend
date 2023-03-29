import React, { useState } from "react";
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
  long: number;
  lat: number;
};

const GeneralSettingsPanel: React.FC<generalSettingsPanelProps> = ({
  name,
  lat,
  long,
}) => {
  const [buoyName, setBuoyName] = useState<string>(name);
  const [latitude, setLatitude] = useState<string>(lat.toString());
  const [longitude, setLongitude] = useState<string>(long.toString());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchCoordinates = async () => {
    // do search stuff
  };

  const resetCoordinates = () => {
    setLatitude(lat.toString());
    setLongitude(long.toString());
  };

  const saveDeviceSettings = async () => {
    const latNum = parseFloat(latitude);
    const longNum = parseFloat(longitude);

    setIsLoading(true);
    const response = await ManageDevices.saveDeviceSettings(
      buoyName,
      latNum,
      longNum
    );
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
        value={buoyName}
        onChange={(e) => {
          const newName = e.target.value;
          setBuoyName(newName);
        }}
        onBlur={() => {
          if (buoyName.length === 0 || buoyName.length > 25) {
            toast.error("Name must be between 1 and 25 characters.");
            setBuoyName(name);
          }
        }}
      />
      <Text fontSize="sm" color="gray.500" my="0.25rem">
        Enter the alias name for the device.
      </Text>

      <Divider my="1rem" />

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
              isNaN(Number(latitude)) ? 0 : Number(latitude),
              isNaN(Number(longitude)) ? 0 : Number(longitude),
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
            value={latitude}
            min={-90}
            max={90}
            onChange={(e) => {
              setLatitude(e);
            }}
            onBlur={(e) => {
              // quirk on chakra's part, but I can't make it reset to default if the value is "-",
              // it just goes to the minimum, e.g. -90
              if (e.target.value === "") {
                setLatitude(lat.toString());
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
            value={longitude}
            allowMouseWheel={false}
            min={-180}
            max={180}
            onChange={(e) => {
              setLongitude(e);
            }}
            onBlur={(e) => {
              if (e.target.value === "") {
                setLongitude(long.toString());
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
            <Button
              color="white"
              bg={colors.main.acidGreen}
              _hover={{
                bg: colors.main.mossGreen,
              }}
              onClick={() => searchCoordinates()}
            >
              Search
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
          Save General
        </Button>
      </Flex>
    </Box>
  );
};

export default GeneralSettingsPanel;
