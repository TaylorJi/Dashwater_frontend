import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { allDevicesDetails } from './deviceManagerAtoms';
import { toast } from 'react-hot-toast';
import ManageDevices from '../../../api/ManageDevices/ManageDevices';
import LoadingGraphic from '../../layout/LoadingGraphic';
import { Box, Center } from '@chakra-ui/react';

/**
 * This component is a wrapper for the device manager page which can be used to load the 
 * allDevicesDetails atom.
 * 
 */

type deviceDetailsWrapperProps = {
    children?: React.ReactNode;
}

const DeviceDetailsWrapper: React.FC<deviceDetailsWrapperProps> = ({ children }) => {

    const [deviceDetails, setDevicesDetails] = useRecoilState(allDevicesDetails);
    // const [sensorDetials, setSensorsDetails] = useRecoilState(allDevicesDetails.);

    const fetchData = async () => {

        try {
            const data = await ManageDevices.getDevicesSettings();
            if (data) {
                setDevicesDetails(data);
            } else {
                toast.error('There was an error fetching device data - please refresh and try again.');
            }

        } catch (_err) {
            return null;
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {
                deviceDetails.length > 0
                    ?
                    <>
                        {children}
                    </>
                    :
                    <Box
                        marginTop='15rem'
                    >
                        <LoadingGraphic />
                    </Box>
            }
        </>
    );
};


export default DeviceDetailsWrapper;
