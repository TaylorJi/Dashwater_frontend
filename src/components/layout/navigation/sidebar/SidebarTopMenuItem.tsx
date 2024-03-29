import { Box, Flex, Icon, Tooltip, Text } from '@chakra-ui/react';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useRecoilState } from 'recoil';
import colors from '../../../../theme/foundations/colours';
import { sidebarOpenAtom } from '../atoms/sidebarAtoms';

const SidebarTopMenuItem: React.FC = () => {

    const [isCollapsed, setIsCollapsed] = useRecoilState(sidebarOpenAtom);

    return (
        <Flex
            mb='3rem'
            p='0.5rem'
            alignContent='center'
            borderRadius='0.25rem'
            alignItems='center'
        >
            <Tooltip
                placement='right'
                label='Click to expand/collapse'
                bg='white'
                color='black'
            >
                <Icon as={FontAwesomeIcon}
                    color='gray.400'
                    icon={faBarsStaggered}
                    size='xl'
                    mr='2rem'
                    transition={'all 0.2s ease-in-out'}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    _hover={{
                        transform: 'scale(1.05)',
                        cursor: 'pointer',
                        color: colors.main.usafaBlue
                    }}
                />
            </Tooltip>
            <Box
                w='20rem'
                fontSize='xl'
                whiteSpace='nowrap'
                fontWeight='semibold'
                color='black'
            >
                <Text>
                    YVR X IoT Water
                </Text>
                <Text>
                    Monitoring
                </Text>
            </Box>
        </Flex>
    );
};

export default SidebarTopMenuItem;