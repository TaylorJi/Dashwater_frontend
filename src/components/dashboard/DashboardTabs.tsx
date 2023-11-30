import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/tabs';
import React from 'react';
import colors from '../../theme/foundations/colours';
import IntervalPanel from './intervalPanel/IntervalPanel';
import LogPanel from './logPanel/LogPanel';
import OverviewPanel from './overviewPanel/OverviewPanel';
import TestPanel from './testPanel/TestPanel';

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
                {/* <Tab
                    mr='1rem'
                    borderBottomWidth='0.2rem'
                    _selected={{
                        borderColor: colors.main.acidGreen,
                        fontWeight: 'bold'
                    }}
                >
                    Logs
                </Tab> */}
                {/* <Tab
                    mr='1rem'
                    borderBottomWidth='0.2rem'
                    _selected={{
                        borderColor: colors.main.acidGreen,
                        fontWeight: 'bold'
                    }}
                >
                    Test
                </Tab> */}
            </TabList>

            <TabPanels>
                <TabPanel>
                    <IntervalPanel />
                </TabPanel>

                <TabPanel>
                    <OverviewPanel />
                </TabPanel>

                <TabPanel>
                    <LogPanel />
                </TabPanel>
                <TabPanel>
                    <TestPanel />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default DashboardTabs;