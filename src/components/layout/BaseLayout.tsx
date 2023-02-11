import React from 'react';
import { Flex } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';
import Sidebar from './navigation/Sidebar';
import SidebarOffset from './navigation/SidebarOffset';

type LayoutProps = {
    children?: React.ReactNode;
    isNavbarVisible: boolean;
};

const BaseLayout: React.FC<LayoutProps> = ({ children, isNavbarVisible }) => {

    return (
        <>
            <Toaster />
            {
                isNavbarVisible ?
                    <Flex>
                        <Sidebar />
                        <SidebarOffset />
                        {children}
                    </Flex>
                    : { children }
            }

        </>
    );
};

export default BaseLayout;