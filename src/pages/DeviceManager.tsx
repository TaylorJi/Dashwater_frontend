import React from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import Icon from '@chakra-ui/icon';
import { Select } from '@chakra-ui/select';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeviceManagerTable from '../components/deviceManager/DeviceManagerTable/DeviceManagerTable';
import { Button, Flex, Text, useMediaQuery, Center } from '@chakra-ui/react';
import colors from '../theme/foundations/colours';


const DeviceManager: React.FC = () => {

    const [isLargeScreen] = useMediaQuery('(min-width: 1600px)');

    return (
        <BaseLayout isNavbarVisible={true}>
            <Flex w='100%' minH='100vh' py='2rem' pr='1rem' flexDirection='column'>

                <Text fontSize={isLargeScreen ? '3xl' : '2xl'} fontWeight='bold' >
                    Manage Devices
                </Text>

                <Flex px="4rem" pt="2rem">
                    <Select
                        size='sm'
                        borderRadius='0.25rem'
                        placeholder='Select Devices'
                        w='15rem'
                        borderColor={colors.main.usafaBlue}
                    />
                    <Button
                        size='sm'
                        bg='main.acidGreen'
                        ml='0.5rem'
                        color='white'
                        fontSize='sm'
                        rightIcon={<Icon
                            as={FontAwesomeIcon}
                            icon={faChevronRight}
                            color='white'
                        />}
                        _hover={{
                            bg: colors.main.mossGreen
                        }}
                    >
                        Select by Map
                    </Button>

                    <Select
                        size='sm'
                        borderRadius='0.25rem'
                        placeholder='Select Sensors'
                        ml='2rem'
                        w='15rem'
                        borderColor={colors.main.usafaBlue}
                    />
                </Flex>

                <Center px="4rem" pt="2rem">
                    <DeviceManagerTable />
                </Center>

            </Flex>
        </BaseLayout>
    );
};

export default DeviceManager;
