import { Box, Flex, Text, useMediaQuery } from '@chakra-ui/react';
import React, { useState } from 'react';
import { topNavItems } from './dashboardTopNavItems';
import uuid from 'react-uuid';
import colors from '../../theme/foundations/colours';

const DashboardTopNav: React.FC = () => {

    const [active, setActive] = useState<number>(0);
    const [isLargeScreen] = useMediaQuery('(min-width: 1600px)');

    return (
        <Flex
            mt={isLargeScreen ? '0' : '1rem'}
        >
            {
                topNavItems.map((item, index) => {
                    return (
                        <Box
                            mr='1rem'
                            py='0.5rem'
                            px='1rem'
                            borderRadius='0.25rem'
                            key={uuid()}
                            transition={'all 0.2s ease-in-out'}
                            bgColor={index === active ? colors.main.activeTopNav : ''}
                            color={index === active ? colors.main.usafaBlue : colors.main.ceruBlue}
                            onClick={() => {
                                setActive(index);
                            }}
                            _hover={{
                                transform: 'scale(1.05)',
                                cursor: 'pointer',
                                color: colors.main.usafaBlue
                            }}
                        >
                            <Text
                                fontWeight='semibold'
                            >
                                {item}
                            </Text>
                        </Box>
                    );
                })
            }
        </Flex>
    );
};

export default DashboardTopNav;