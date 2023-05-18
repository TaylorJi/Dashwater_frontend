import React, { useEffect } from "react";
import BaseLayout from "../components/layout/BaseLayout";
import DeviceManagerTable from "../components/deviceManager/DeviceManagerTable/DeviceManagerTable";
import {
  Flex,
  Text,
  useMediaQuery,
  Center,
  Box,
  Spacer,
} from "@chakra-ui/react";
import DashboardTopSelect from "../components/dashboard/DashboardTopSelect";
import ManageDevices from "../api/ManageDevices/ManageDevices";
import { useSetRecoilState } from "recoil";
import { defaultThresholds } from "../components/wrappers/DeviceDetailsWrapper/deviceManagerAtoms";

const DeviceManager: React.FC = () => {
  const [isLargeScreen] = useMediaQuery("(min-width: 1600px)");
  const setDefaultThresholdsAtom = useSetRecoilState(defaultThresholds)

  const fetchDefaultThresholds = async () => {
    const defaultThresholds = await ManageDevices.getDefaultThresholds();
    console.log(defaultThresholds)
    setDefaultThresholdsAtom(defaultThresholds);
  }

  useEffect(() => {
    fetchDefaultThresholds();
  }, [])

  return (
    <BaseLayout isNavbarVisible={true}>
      <Flex
        w="100%"
        minH="100vh"
        py="2rem"
        pr="1rem"
        flexDirection="column"
      >
        <Flex
          alignItems='center'
          px='4rem'
        >
          <Text
            fontSize={isLargeScreen ? "3xl" : "2xl"}
            fontWeight="bold"
          >
            Manage Devices
          </Text>
          <Spacer />
          <Box>
            <DashboardTopSelect />
          </Box>
        </Flex>

        <Center
          px="4rem"
          pt="2rem"
        >
          <DeviceManagerTable />
        </Center>
      </Flex>
    </BaseLayout>
  );
};

export default DeviceManager;
