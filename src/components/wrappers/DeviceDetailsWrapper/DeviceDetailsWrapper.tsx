import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { allDevicesDetails } from './deviceManagerAtoms';
import { toast } from 'react-hot-toast';
import mockBuoyData from '../../../mockData/mockBuoyData.json';
import ManageDevices from '../../../api/ManageDevices/ManageDevices';

type deviceDetailsWrapperProps = {
    children?: React.ReactNode;
}

const DeviceDetailsWrapper: React.FC<deviceDetailsWrapperProps> = ({ children }) => {

    const setDevicesDetails = useRecoilState(allDevicesDetails)[1];

    const fetchData = async () => {

        try {
            const data = await ManageDevices.getDevicesSettings();
            if (data) {
                setDevicesDetails(data);
            } else {
                toast.error('There was an error fetching device data - please refresh and try again.');
            }

        } catch(_err) {

            console.log(_err)
            return null;

        }
    }

    
    useEffect(() => {
        fetchData();
        return () => {
            // cleanup
        };
    }, []);

    return <>{children}</>;
};


export default DeviceDetailsWrapper;
