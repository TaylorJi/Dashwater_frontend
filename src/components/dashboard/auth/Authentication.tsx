import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import Sessions from '../../../api/Sessions/Sessions';
import LoadingGraphic from '../../layout/LoadingGraphic';
import { userDataAtom } from '../atoms/globalDashboardAtoms';

type AuthenticationProps = {
    children: React.ReactNode;
};

const Authentication: React.FC<AuthenticationProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isRendered, setIsRendered] = useState<boolean>(false);

    const setUserData = useSetRecoilState(userDataAtom);
    const resetUserData = useResetRecoilState(userDataAtom);
    
    const handleSessionValidation = async () => {
        console.log('Validating session...');

        const sessionValid = await Sessions.validateSession();
        console.log("sessionValid: " + sessionValid);

        if (sessionValid) {

            setUserData(sessionValid);
            setIsRendered(true);

        } else {

            resetUserData();

            await Sessions.deleteSession();

            navigate('../');

            return false;
        }

    };

    useEffect(() => {

        handleSessionValidation();

    }, [location]);

    return (
        <>
        {
            isRendered
                ? children
                : <LoadingGraphic />
        }
        </>
    );
};

export default Authentication;