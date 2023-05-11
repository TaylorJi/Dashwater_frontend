import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { allDevicesDetails } from './deviceManagerAtoms';

type deviceDetailsWrapperProps = {
    children?: React.ReactNode;
}

const DeviceDetailsWrapper: React.FC<deviceDetailsWrapperProps> = ({ children }) => {
    const setDevicesDetails = useRecoilState(allDevicesDetails)[1];

    
    useEffect(() => {

        const fetchData = async () => {
            const res = await axios.get('./mockData/mockBuoyData.json');
            return res.data.buoys;
        }
        
        fetchData().then(data => {
            setDevicesDetails(data);
        });

        return () => {
            // cleanup
        };
    }, []);

    return <>{children}</>;
};


export default DeviceDetailsWrapper;
