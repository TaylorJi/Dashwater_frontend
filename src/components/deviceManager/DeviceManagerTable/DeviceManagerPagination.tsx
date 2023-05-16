import { Box, Button, Flex, IconButton, Icon } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import uuid from "react-uuid";
import { useRecoilValue } from "recoil";
import { allDevicesDetails } from "../../wrappers/DeviceDetailsWrapper/deviceManagerAtoms";
import colors from '../../../theme/foundations/colours';

const DeviceManagerPagination: React.FC<{setDisplayedDevices: any}> = ({ setDisplayedDevices }) => {

    const allDevices = useRecoilValue(allDevicesDetails);
    const [currPage, setCurrPage] = useState<number>(1);
    const DEVICES_PER_PAGE = 2;
    const NUM_OF_PAGES = Math.ceil(allDevices.length / DEVICES_PER_PAGE);

    useEffect(() => {
        if (allDevices) {
            const deviceStart = (currPage - 1) * DEVICES_PER_PAGE;
            const deviceEnd = currPage * DEVICES_PER_PAGE;
            setDisplayedDevices(allDevices.slice(deviceStart, deviceEnd));
        }
    }, [allDevices, currPage]);

    return (
        <>
            {
                allDevices &&
                <Flex
                    gap='0.5rem'
                    mt='2rem'
                    justifyContent='center'
                >
                    <IconButton
                        size='md'
                        bg={colors.main.usafaBlue}
                        color='white'
                        aria-label='Previous Page'
                        icon={<Icon
                            as={FontAwesomeIcon}
                            icon={faChevronLeft}
                        />}
                        rounded='full'
                        _hover={{
                            bg: colors.main.activeMainButton
                        }}
                        isDisabled={currPage === 1}
                        onClick={() => {
                            if (currPage !== 1) {
                                setCurrPage(currPage - 1);
                            }
                        }}
                    />
                    {
                        Array.from({length: NUM_OF_PAGES}, (_, i) => i + 1).map((pageIndex) => {
                            return (
                                <Button
                                    size='md'
                                    bg={currPage === pageIndex ? colors.main.activeMainButton : colors.main.usafaBlue}
                                    color='white'
                                    rounded='full'
                                    _hover={{
                                        bg: colors.main.activeMainButton
                                    }}
                                    onClick={() => setCurrPage(pageIndex)}
                                    key={uuid()}
                                >
                                    {pageIndex}
                                </Button>
                            )
                        })
                    }
                    <IconButton
                        size='md'
                        bg={colors.main.usafaBlue}
                        color='white'
                        aria-label="Next Page"
                        icon={<Icon
                            as={FontAwesomeIcon}
                            icon={faChevronRight}
                        />}
                        rounded='full'
                        _hover={{
                            bg: colors.main.activeMainButton
                        }}
                        isDisabled={currPage === NUM_OF_PAGES}
                        onClick={() => {
                            if (currPage !== NUM_OF_PAGES) {
                                setCurrPage(currPage + 1);
                            }
                        }}
                    />
                </Flex>
            }
        </>
    )

};

export default DeviceManagerPagination;