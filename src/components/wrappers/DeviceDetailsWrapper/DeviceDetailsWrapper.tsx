import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { allDevicesDetails } from './deviceManagerAtoms';
import mockBuoyData from '../../../mockData/mockBuoyData.json';

type deviceDetailsWrapperProps = {
    children?: React.ReactNode;
}

const DeviceDetailsWrapper: React.FC<deviceDetailsWrapperProps> = ({ children }) => {
    const setDevicesDetails = useRecoilState(allDevicesDetails)[1];

    
    useEffect(() => {

        const fetchData = async () => {
            // TO DO: replace with actual API call
            // const res = await axios.get('./mockData/mockBuoyData.json');
            // return res.data.buoys;

            return mockBuoyData.buoys;
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
