import { createColumnHelper } from '@tanstack/react-table';
import { BaseTable } from './BaseTable';
import { mockLogData } from '../../../mockData/dashboardMockData';
import { Box, Button, Center, Icon, Select, Text, useMediaQuery } from '@chakra-ui/react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import {
    displayedLogDataSelector, logDataAtom,
    paginationMultipleAtom, itemsPerPageAtom
} from './atoms/logPanelAtoms';
import colors from '../../../theme/foundations/colours';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import uuid from 'react-uuid';

const Logs: React.FC = () => {

    const [itemsPerPage, setItemsPerPage] = useRecoilState(itemsPerPageAtom);
    const [logData, setLogData] = useRecoilState(logDataAtom);
    const displayedLogData = useRecoilValue(displayedLogDataSelector);
    const [currPagination, setCurrPagination] = useRecoilState(paginationMultipleAtom);

    const resetPagination = useResetRecoilState(paginationMultipleAtom);
    const resetItemsPerPage = useResetRecoilState(itemsPerPageAtom);

    const [isLargeScreen] = useMediaQuery('(min-width: 1600px)');
    const columnHelper = createColumnHelper<logDataType>();

    useEffect(() => {

        setLogData(mockLogData);

        return () => {
            resetPagination();
            resetItemsPerPage();
        }

    }, []);

    const columns = [
        columnHelper.accessor('id', {
            cell: ({ getValue }) => {
                const val = getValue<string>();
                return (<Text textAlign='center' fontSize={isLargeScreen ? 'md' : 'sm'}>{val}</Text>);
            },
            header: 'ID',
            meta: {
                isNumeric: true
            }
        }),
        columnHelper.accessor('time', {
            cell: ({ getValue }) => {
                const val = getValue<string>();
                return (<Text textAlign='center' fontSize={isLargeScreen ? 'sm' : 'xs'}>{val}</Text>);
            },
            header: 'Time'
        }),
        columnHelper.accessor('dissolvedOxygen', {
            cell: ({ getValue }) => {
                const val = getValue<string>();
                return (<Text textAlign='center' fontSize={isLargeScreen ? 'md' : 'sm'}>{val}</Text>);
            },
            header: 'Dissolved Oxygen',
            meta: {
                isNumeric: true
            }
        }),
        columnHelper.accessor('electricalConductivity', {
            cell: ({ getValue }) => {
                const val = getValue<string>();
                return (<Text textAlign='center' fontSize={isLargeScreen ? 'md' : 'sm'}>{val}</Text>);
            },
            header: 'Electrical Conductivity',
            meta: {
                isNumeric: true
            }
        }),
        columnHelper.accessor('pH', {
            cell: ({ getValue }) => {
                const val = getValue<string>();
                return (<Text textAlign='center' fontSize={isLargeScreen ? 'md' : 'sm'}>{val}</Text>);
            },
            header: 'pH',
            meta: {
                isNumeric: true
            }
        }),
        columnHelper.accessor('turbidity', {
            cell: ({ getValue }) => {
                const val = getValue<string>();
                return (<Text textAlign='center' fontSize={isLargeScreen ? 'md' : 'sm'}>{val}</Text>);
            },
            header: 'Turbidity',
            meta: {
                isNumeric: true
            }
        }),
        columnHelper.accessor('totalDissolvedSolids', {
            cell: ({ getValue }) => {
                const val = getValue<string>();
                return (<Text textAlign='center' fontSize={isLargeScreen ? 'md' : 'sm'}>{val}</Text>);
            },
            header: 'Total Dissolved Solids',
            meta: {
                isNumeric: true
            }
        }),
        columnHelper.accessor('temperature', {
            cell: ({ getValue }) => {
                const val = getValue<string>();
                return (<Text textAlign='center' fontSize={isLargeScreen ? 'md' : 'sm'}>{val}</Text>);
            },
            header: 'Temperature',
            meta: {
                isNumeric: true
            }
        })
    ];

    return (
        <>
            {
                logData ?
                    <>
                        <Box
                            overflow='auto'
                        >
                            <BaseTable columns={columns} data={displayedLogData} />
                        </Box>

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
                                        if ((index * itemsPerPage % itemsPerPage === 0)
                                            && (index * itemsPerPage < logData.length)) {

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
                    </>
                    : 'Loading'
            }

        </>
    );
};

export default Logs;