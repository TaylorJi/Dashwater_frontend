import React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/tabs';
import colors from '../../../theme/foundations/colours';
import GeneralSettingsPanel from "./GeneralSettingsPanel/GeneralSettingsPanel";

type deviceSettingsTabsProps = {
    buoy: buoySettingsType
}

const DeviceSettingsTabs: React.FC<deviceSettingsTabsProps> = ({ buoy }) => {
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
                    <p>Thresholds</p>
                </TabPanel>

                <TabPanel>
                    <p>Calibration</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default DeviceSettingsTabs;
