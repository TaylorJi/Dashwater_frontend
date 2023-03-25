import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/tabs';
import React from 'react';
import colors from '../../theme/foundations/colours';
import IntervalPanel from './intervalPanel/IntervalPanel';
import LogPanel from './logPanel/LogPanel';
import GaugeChart from 'react-gauge-chart';
import uuid from 'react-uuid';
import { Box } from '@chakra-ui/react';

const DashboardTabs: React.FC = () => {

    return (
        <Tabs
            isLazy
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
                    Interval
                </Tab>
                <Tab
                    mr='1rem'
                    borderBottomWidth='0.2rem'
                    _selected={{
                        borderColor: colors.main.acidGreen,
                        fontWeight: 'bold'
                    }}
                >
                    Overview
                </Tab>
                <Tab
                    mr='1rem'
                    borderBottomWidth='0.2rem'
                    _selected={{
                        borderColor: colors.main.acidGreen,
                        fontWeight: 'bold'
                    }}
                >
                    Logs
                </Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <IntervalPanel />
                </TabPanel>

                <TabPanel>
                </TabPanel>

                <TabPanel>
                    <LogPanel />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default DashboardTabs;