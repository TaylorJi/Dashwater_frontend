import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/tabs';
import React from 'react';
import colors from '../../theme/foundations/colours';
import DevicePanel from './devicePanel/DevicePanel';
import UserPanel from './userPanel/UserPanel';

const AdminPortalTabs: React.FC = () => {
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
                    User Management
                </Tab>
                <Tab
                    mr='1rem'
                    borderBottomWidth='0.2rem'
                    _selected={{
                        borderColor: colors.main.acidGreen,
                        fontWeight: 'bold'
                    }}
                >
                    Device Monitoring
                </Tab>
                <Tab
                    mr='1rem'
                    borderBottomWidth='0.2rem'
                    _selected={{
                        borderColor: colors.main.acidGreen,
                        fontWeight: 'bold'
                    }}
                >
                    System Management
                </Tab>
                <Tab
                    mr='1rem'
                    borderBottomWidth='0.2rem'
                    _selected={{
                        borderColor: colors.main.acidGreen,
                        fontWeight: 'bold'
                    }}
                >
                    Reporting
                </Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <UserPanel />
                </TabPanel>
                <TabPanel>
                    <DevicePanel />
                </TabPanel>
                <TabPanel>

                </TabPanel>
                <TabPanel>

                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default AdminPortalTabs;