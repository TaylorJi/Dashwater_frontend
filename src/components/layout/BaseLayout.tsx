import React from 'react';
import { Toaster } from 'react-hot-toast';

type LayoutProps = {
    children?: React.ReactNode;
};

const BaseLayout: React.FC<LayoutProps> = ({ children }) => {

    return (
        <>
            <Toaster />
            {children}
        </>
    );
};

export default BaseLayout;