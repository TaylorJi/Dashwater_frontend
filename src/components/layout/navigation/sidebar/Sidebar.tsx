import { Box, Flex, Spacer, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { sidebarCategories } from './sidebarCategories';
import { useRecoilValue } from 'recoil';
import { sidebarOpenAtom } from '../atoms/sidebarAtoms';
import SidebarItem from './SidebarItem';
import SidebarTopMenuItem from './SidebarTopMenuItem';
import { faCircleQuestion, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import UserSettingsModal from './UserSettingsModal';
import uuid from 'react-uuid';

const Sidebar: React.FC = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const isCollapsed = useRecoilValue(sidebarOpenAtom);

    const [currPath, setCurrPath] = useState<string>('');

    useEffect(() => {
        setCurrPath(window.location.pathname);
    }, []);

    return (
        <>
            <UserSettingsModal isOpen={isOpen} onClose={onClose} />
            <Box
                h='100vh'
                w={isCollapsed ? '4.5rem' : '17rem'}
                p='1rem'
                bgColor='main.lavender'
                pos='fixed'
                zIndex={1000}
                overflow='hidden'
                transition={'all 0.3s ease-in-out'}
            >
                <Flex
                    flexDir='column'
                    h='100%'
                >
                    <SidebarTopMenuItem />

                    {
                        sidebarCategories.map((category) => {
                            if (global.userRole === "User") {
                                if (category["description"] !== 'Admin Portal') {
                                    return (
                                        <SidebarItem
                                            currPath={currPath}
                                            icon={category['icon']}
                                            link={category['link']}
                                            description={category['description']}
                                            isExternal={false}
                                            key={uuid()}
                                        />
                                    );
                                }
                            } else {
                                return (
                                    <SidebarItem
                                        currPath={currPath}
                                        icon={category['icon']}
                                        link={category['link']}
                                        description={category['description']}
                                        isExternal={false}
                                        key={uuid()}
                                    />
                                );
                            }
                        })
                    }
                    <Spacer />
                    <SidebarItem
                        currPath={currPath}
                        icon={faCircleQuestion}
                        link={'https://bcit-reseach-long-term-issp.github.io/docs/dashboard/'}
                        description={'Go to Docs'}
                        isExternal={true}
                    />
                    <Box
                        onClick={() => onOpen()}
                    >
                        <SidebarItem
                            currPath={currPath}
                            icon={faUserCircle}
                            link={null}
                            description={'User Settings'}
                            isExternal={false}
                        />
                    </Box>
                </Flex>
            </Box>
        </>
    );
};

export default Sidebar;