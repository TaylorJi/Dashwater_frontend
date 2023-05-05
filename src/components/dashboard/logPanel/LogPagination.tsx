import { Button, Center, Icon, Select } from '@chakra-ui/react';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import uuid from 'react-uuid';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import colors from '../../../theme/foundations/colours';
import { itemsPerPageAtom, logDataAtom, paginationMultipleAtom } from './atoms/logPanelAtoms';

const LogPagination: React.FC = () => {

    const logData = useRecoilValue(logDataAtom);
    const [currPagination, setCurrPagination] = useRecoilState(paginationMultipleAtom);
    const [itemsPerPage, setItemsPerPage] = useRecoilState(itemsPerPageAtom);

    const resetPagination = useResetRecoilState(paginationMultipleAtom);
    const resetItemsPerPage = useResetRecoilState(itemsPerPageAtom);

    useEffect(() => {
        return () => {
            resetPagination();
            resetItemsPerPage();
        }
    }, []);

    return (
        <>
            {
                logData &&
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
                            logData.map((item, index) => {
                                if (index * itemsPerPage < logData.length) {
                                    // the last page
                                    if ((index + 1) * itemsPerPage > logData.length) {
                                        return (
                                            <option
                                                value={index}
                                                key={uuid()}
                                            >
                                                Items {index * itemsPerPage + 1} to {logData.length}
                                            </option>
                                        );

                                    } else {
                                        return (
                                            <option
                                                value={index}
                                                key={uuid()}
                                            >
                                                Items {index * itemsPerPage + 1} to {(index + 1) * itemsPerPage}
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
                            setItemsPerPage(parseInt(e.target.value));
                        }}
                        value={itemsPerPage}
                    >
                        <option
                            value={15}
                            key={uuid()}
                        >
                            15 items per page
                        </option>
                        <option
                            value={25}
                            key={uuid()}
                        >
                            25 items per page
                        </option>
                        <option
                            value={50}
                            key={uuid()}
                        >
                            50 items per page
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
                        isDisabled={(currPagination + 1) * itemsPerPage >= logData.length}
                        _hover={{
                            bg: colors.main.activeMainButton
                        }}
                        onClick={() => {
                            if ((currPagination + 1) * itemsPerPage < logData.length) {
                                setCurrPagination(currPagination + 1);
                            }
                        }}
                    >
                        Next Page
                    </Button>
                </Center>

            }
        </>

    );
};

export default LogPagination;