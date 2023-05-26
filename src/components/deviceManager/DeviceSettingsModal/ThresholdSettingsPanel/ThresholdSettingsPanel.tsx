import React, { useState } from "react";
import colors from "../../../../theme/foundations/colours";
import { Table, Thead, Tbody, Tr, Th, Flex, Button } from "@chakra-ui/react";
import { toast } from "react-hot-toast";
import { buoySensorTags } from "../../../../theme/metrics/buoySensorTags";
import ThresholdSettingsRow from "./ThresholdSettingsRow";
import ManageDevices from "../../../../api/ManageDevices/ManageDevices";
import DeviceSettingsModal, {
  buoySettingsType,
} from "../../DeviceSettingsModal/DeviceSettingsModal";

type ThresholdSettingsPanelProps = {
  buoy: buoySettingsType;
  sensors: sensorType[];
};

const ThresholdSettingsPanel: React.FC<ThresholdSettingsPanelProps> = ({
  sensors,
  buoy,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const saveThresholdSettings = async () => {
    const inputs = sensors.map((sensor) => {
      const label = buoySensorTags[sensor.metric_type].label;
      const { min, max, alert } = sensor;
      const id = buoy.id;
      return { label, id, min, max, alert };
    });
    setIsLoading(true);
    const res = await ManageDevices.saveThresholdSettings(inputs);
    if (res) {
      toast.success("Threshold settings saved!");
    } else {
      toast.error(
        "There was a problem saving your device threshold settings. Please try again."
      );
    }
    setIsLoading(false);
  };

  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th color={colors.main.usafaBlue}>Metric</Th>
            <Th color={colors.main.usafaBlue}>Min</Th>
            <Th color={colors.main.usafaBlue}>Max</Th>
            <Th color={colors.main.usafaBlue}>Unit</Th>
            <Th color={colors.main.usafaBlue}>Alert</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sensors.map((sensor) => {
            return (
              <ThresholdSettingsRow
                metric={buoySensorTags[sensor.metric_type].label}
                metricSensor={sensor}
              />
            );
          })}
        </Tbody>
      </Table>
      <Flex mt="2rem" justifyContent="flex-end">
        <Button
          bg={colors.main.usafaBlue}
          color="white"
          isLoading={isLoading}
          onClick={async () => await saveThresholdSettings()}
          _hover={{
            bg: colors.main.ceruBlue,
          }}
          loadingText="Saving"
        >
          Save Thresholds
        </Button>
      </Flex>
    </>
  );
};

export default ThresholdSettingsPanel;
