import { Button, Center, Icon, Select } from '@chakra-ui/react';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import uuid from 'react-uuid';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import colors from '../../../theme/foundations/colours';
import { allDevicesDetails, devicesPerPageAtom, devicesPaginationMultipleAtom } from '../../wrappers/DeviceDetailsWrapper/deviceManagerAtoms';

const DeviceManagerPagination: React.FC = () => {

    const allDevices = useRecoilValue(allDevicesDetails);
    const [currPagination, setCurrPagination] = useRecoilState(devicesPaginationMultipleAtom);
    const [devicesPerPage, setDevicesPerPage] = useRecoilState(devicesPerPageAtom);

    const resetPagination = useResetRecoilState(devicesPaginationMultipleAtom);
    const resetDevicesPerPage = useResetRecoilState(devicesPerPageAtom);

    useEffect(() => {
        return () => {
            resetPagination();
            resetDevicesPerPage();
        }
    }, []);

    return (
        <>
            {
                allDevices &&
                <Center
                    mt='2rem'
                >
                    <Button
                        size='sm'
                        colorScheme='main'
                        color='white'
                        leftIcon={<Icon
                            as={FontAwesomeIcon}
                            icon={faChevronLeft}
                            color='white'
                        />}
                        isDisabled={currPagination === 0}
                        _hover={{
                            bg: colors.main.activeMainButton
                        }}
                        onClick={() => {
                            if (currPagination !== 0) {
                                setCurrPagination(currPagination - 1);
                            }
                        }}
                    >
                        Prev Page
                    </Button>

                    <Select
                        size='sm'
                        mr='0.5rem'
                        ml='1rem'
                        w='20rem'
                        borderRadius='0.25rem'
                        borderColor={colors.main.usafaBlue}
                        onChange={(e) => {
                            setCurrPagination(parseInt(e.target.value));
                        }}
                        value={currPagination}
                    >
                        {
                            allDevices.map((device, index) => {
                                if (index * devicesPerPage < allDevices.length) {
                                    // the last page
                                    if ((index + 1) * devicesPerPage > allDevices.length) {
                                        return (
                                            <option
                                                value={index}
                                                key={uuid()}
                                            >
                                                Devices {index * devicesPerPage + 1} to {allDevices.length}
                                            </option>
                                        );

                                    } else {
                                        return (
                                            <option
                                                value={index}
                                                key={uuid()}
                                            >
                                                Devices {index * devicesPerPage + 1} to {(index + 1) * devicesPerPage}
                                            </option>
                                        );
                                    }
                                }
                            })
                        }
                    </Select>

                    <Select
                        size='sm'
                        mr='1rem'
                        w='10rem'
                        borderRadius='0.25rem'
                        borderColor={colors.main.usafaBlue}
                        onChange={(e) => {
                            resetPagination();
                            setDevicesPerPage(parseInt(e.target.value));
                        }}
                        value={devicesPerPage}
                    >
                        <option
                            value={2}
                            key={uuid()}
                        >
                            2 devices per page
                        </option>
                        <option
                            value={4}
                            key={uuid()}
                        >
                            4 devices per page
                        </option>
                        <option
                            value={6}
                            key={uuid()}
                        >
                            6 devices per page
                        </option>
                    </Select>

                    <Button
                        size='sm'
                        colorScheme='main'
                        color='white'
                        rightIcon={<Icon
                            as={FontAwesomeIcon}
                            icon={faChevronRight}
                            color='white'
                        />}
                        isDisabled={(currPagination + 1) * devicesPerPage >= allDevices.length}
                        _hover={{
                            bg: colors.main.activeMainButton
                        }}
                        onClick={() => {
                            if ((currPagination + 1) * devicesPerPage < allDevices.length) {
                                setCurrPagination(currPagination + 1);
                            }
                        }}
                    >
                        Next Page
                    </Button>
                </Center>
            }
        </>
    )
};

export default DeviceManagerPagination;