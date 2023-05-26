import React, { useState, useEffect } from "react";
import colors from "../../../../theme/foundations/colours";
import {
  Tr,
  Td,
  NumberInput,
  NumberInputField,
  Switch,
} from "@chakra-ui/react";

type thresholdSettingRowProps = {
  metric: string;
  metricSensor: sensorType;
  onChange: (newSettings: sensorType) => void;
};

const ThresholdSettingsRow: React.FC<thresholdSettingRowProps> = ({
  metric,
  metricSensor,
  onChange,
}) => {
  const [isAlert, setIsAlert] = useState<boolean>(metricSensor.alert);
  const [metricMin, setMetricMin] = useState<number>(metricSensor.min);
  const [metricMax, setMetricMax] = useState<number>(metricSensor.max);

  useEffect(() => {
    // Notify parent component about the changes in threshold settings
    onChange({
      ...metricSensor,
      min: metricMin,
      max: metricMax,
      alert: isAlert,
    });
  }, [metricMin, metricMax, isAlert, onChange, metricSensor]);
  return (
    <Tr rowGap={0.25}>
      <Td>{metric}</Td>
      <Td>
        <NumberInput
          value={metricMin}
          onChange={(i) => {
            if (i === "-") {
              setMetricMin(0);
            }
            if (i === "") {
              setMetricMin(0);
            }
            let newMin = parseInt(i);
            if (!isNaN(newMin)) setMetricMin(newMin);
          }}
        >
          <NumberInputField />
        </NumberInput>
      </Td>
      <Td>
        <NumberInput
          value={metricMax}
          onChange={(i) => {
            if (i === "-") {
              setMetricMax(0);
            }
            if (i === "") {
              setMetricMax(0);
            }
            let newMax = parseInt(i);
            if (!isNaN(newMax)) setMetricMax(newMax);
          }}
        >
          <NumberInputField />
        </NumberInput>
      </Td>
      <Td>{metricSensor.default_metric_unit}</Td>
      <Td>
        <Switch
          aria-label="Metric alert state"
          isChecked={isAlert}
          onChange={(_e) => {
            setIsAlert(!isAlert);
          }}
        />
      </Td>
    </Tr>
  );
};

export default ThresholdSettingsRow;
