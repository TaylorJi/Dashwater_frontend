import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { sidebarCategories } from './sidebarCategories';
import { useRecoilValue } from 'recoil';
import { sidebarOpenAtom } from '../atoms/sidebarAtoms';
import SidebarItem from './SidebarItem';
import SidebarTopMenuItem from './SidebarTopMenuItem';


const Sidebar: React.FC = () => {

    const isCollapsed = useRecoilValue(sidebarOpenAtom);

    const [currPath, setCurrPath] = useState<string>('');

    useEffect(() => {
        setCurrPath(window.location.pathname);
    }, []);

    return (
        <>
            <Box
                h='100vh'
                w={isCollapsed ? '4.5rem' : '18rem'}
                p='1rem'
                bgColor='main.lavender'
                pos='absolute'
                zIndex={1000}
                overflow='hidden'
                transition={'all 0.3s ease-in-out'}
            >
                <Box>
                    <SidebarTopMenuItem />

                    {
                        sidebarCategories.map((category) => {
                            return (
                                <SidebarItem
                                    currPath={currPath}
                                    icon={category['icon']}
                                    link={category['link']}
                                    description={category['description']}
                                />
                            );
                        })
                    }
                </Box>
            </Box>
        </>
    );
};

export default Sidebar;