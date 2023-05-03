import React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/tabs';
import colors from '../../../theme/foundations/colours';

import GeneralSettingsPanel from "./GeneralSettingsPanel/GeneralSettingsPanel";
import ThresholdSettingsPanel from "./ThresholdSettingsPanel/ThresholdSettingsPanel";
import CalibrationSettingsPanel from "./CalibrationSettingsPanel/CalibrationSettingsPanel";

type deviceSettingsTabsProps = {
    buoy: buoySettingsType;
    units: buoySettingsUnitsType;
}

const DeviceSettingsTabs: React.FC<deviceSettingsTabsProps> = ({ buoy, units }) => {
    return (
        <Tabs
            mt='1rem'
        >
            <TabList>
                <Tab
                    mr='1rem'
                    borderBottomWidth='0.2rem'
                    _selected={{
                        borderColor: colors.main.acidGreen,
                        fontWeight: 'bold'
                    }}
                >
                    General
                </Tab>
                <Tab
                    mr='1rem'
                    borderBottomWidth='0.2rem'
                    _selected={{
                        borderColor: colors.main.acidGreen,
                        fontWeight: 'bold'
                    }}
                >
                    Thresholds
                </Tab>
                <Tab
                    mr='1rem'
                    borderBottomWidth='0.2rem'
                    _selected={{
                        borderColor: colors.main.acidGreen,
                        fontWeight: 'bold'
                    }}
                >
                    Calibration
                </Tab>
            </TabList>

            <TabPanels
                h='fit-content'
            >
                <TabPanel>
                    <GeneralSettingsPanel
                        name={buoy.name}
                        lat={buoy.location.y}
                        long={buoy.location.x} />
                </TabPanel>

                <TabPanel>
                    <ThresholdSettingsPanel
                        sensors={buoy.sensors}
                        units={units}
                    />
                </TabPanel>

                <TabPanel>
                    <CalibrationSettingsPanel
                        sensors={buoy.sensors}
                    />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default DeviceSettingsTabs;
