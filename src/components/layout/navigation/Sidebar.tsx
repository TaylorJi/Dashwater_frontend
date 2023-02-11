import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { sidebarCategories } from './sidebarCategories';
import uuid from 'react-uuid';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { sidebarOpenAtom } from './atoms/sidebarAtoms';


const Sidebar: React.FC = () => {

    const navigate = useNavigate();

    const [isCollapsed, setIsCollapsed] = useRecoilState(sidebarOpenAtom);
    const [currPath, setCurrPath] = useState<string>('');

    useEffect(() => {
        setCurrPath(window.location.pathname);
    }, [])

    return (
        <>
            <Box
                pos='absolute'
                zIndex={1000}
                h='100vh'
                bgColor='main.lavender'
                transition={'all 0.3s ease-in-out'}
                w={isCollapsed ? '4.5rem' : '20rem'}
                p='1rem'
                overflowX={isCollapsed ? 'hidden' : 'scroll'}
            >
                <Box
                >
                    <Flex
                        mb='3rem'
                        p='0.5rem'
                        alignContent='center'
                        borderRadius='0.25rem'
                        alignItems='center'
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
                                color: '#02558B'
                            }}
                        />
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

                    {
                        sidebarCategories.map((category) => {
                            return (
                                <Flex
                                    mb='0.75rem'
                                    p='0.5rem'
                                    bgColor={currPath ===
                                        category['link'] ?
                                        'main.activeSideBar' : ''}
                                    alignContent='center'
                                    borderRadius='0.25rem'
                                    onClick={() => {
                                        navigate(category['link'])
                                    }}
                                    key={uuid()}
                                    transition={'all 0.2s ease-in-out'}
                                    _hover={{
                                        transform: 'scale(1.05)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Icon as={FontAwesomeIcon}
                                        color={currPath === category['link'] ? 'main.usafaBlue' : 'gray.400'}
                                        icon={category['icon']}
                                        size='xl'
                                        mr='2rem'
                                        transition={'all 0.2s ease-in-out'}
                                        _hover={{
                                            color: '#02558B'
                                        }}
                                    />
                                    <Text
                                        w='20rem'
                                        whiteSpace='nowrap'
                                        fontWeight={currPath === category['link'] ? 'bold' : 'normal'}
                                        color={currPath === category['link'] ? 'main.usafaBlue' : 'black'}
                                    >
                                        {
                                            category['description']
                                        }
                                    </Text>
                                </Flex>
                            );
                        })
                    }
                </Box>
            </Box>
        </>
    );
};

export default Sidebar;