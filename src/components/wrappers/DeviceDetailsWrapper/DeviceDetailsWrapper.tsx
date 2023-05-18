import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { allDevicesDetails } from './deviceManagerAtoms';
import { toast } from 'react-hot-toast';
import ManageDevices from '../../../api/ManageDevices/ManageDevices';

/**
 * This component is a wrapper for the device manager page which can be used to load the allDevicesDetails atom.
 * However, the current implementation sets the atom up in the DeviceManagerPagination instead.
 * 
 * Thus, this component is not currently in use.
 */

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

            return null;

        }
    }

    
    useEffect(() => {
        fetchData();
        return () => {
            // cleanup
        };
    }, []);

    return <>{ children }</>;
};


export default DeviceDetailsWrapper;
