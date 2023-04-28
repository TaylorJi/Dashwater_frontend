import { createColumnHelper } from '@tanstack/react-table';
import { BaseTable } from './BaseTable';
import { mockLogData } from '../../../mockData/dashboardMockData';
import { Box, Button, Center, Icon, Select, Text, useMediaQuery } from '@chakra-ui/react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import {
    displayedLogDataSelector, logDataAtom,
    paginationMultipleAtom, ITEMS_PER_PAGE
} from './atoms/logPanelAtoms';
import colors from '../../../theme/foundations/colours';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import uuid from 'react-uuid';

const Logs: React.FC = () => {

    const [logData, setLogData] = useRecoilState(logDataAtom);
    const displayedLogData = useRecoilValue(displayedLogDataSelector);
    const [currPagination, setCurrPagination] = useRecoilState(paginationMultipleAtom);

    const resetPagination = useResetRecoilState(paginationMultipleAtom);

    const [isLargeScreen] = useMediaQuery('(min-width: 1600px)');
    const columnHelper = createColumnHelper<logDataType>();

    useEffect(() => {

        setLogData(mockLogData);

        return () => {
            resetPagination();
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
                                mx='1rem'
                                w='20rem'
                                onChange={(e) => {
                                    setCurrPagination(parseInt(e.target.value));
                                }}
                                value={currPagination}
                            >
                                {
                                    logData.map((item, index) => {
                                        if ((index * ITEMS_PER_PAGE % ITEMS_PER_PAGE === 0)
                                            && (index * ITEMS_PER_PAGE < logData.length)) {

                                            // the last page
                                            if ((index + 1) * ITEMS_PER_PAGE > logData.length) {
                                                return (
                                                    <option
                                                        value={index}
                                                        key={uuid()}
                                                    >
                                                        Items {index * ITEMS_PER_PAGE + 1} to {logData.length}
                                                    </option>
                                                );

                                            } else {
                                                return (
                                                    <option
                                                        value={index}
                                                        key={uuid()}
                                                    >
                                                        Items {index * ITEMS_PER_PAGE + 1} to {(index + 1) * ITEMS_PER_PAGE}
                                                    </option>
                                                );
                                            }
                                        }
                                    })
                                }
                            </Select>

                            <Button
                                colorScheme='main'
                                color='white'
                                rightIcon={<Icon
                                    as={FontAwesomeIcon}
                                    icon={faChevronRight}
                                    color='white'
                                />}
                                isDisabled={(currPagination + 1) * ITEMS_PER_PAGE >= logData.length}
                                _hover={{
                                    bg: colors.main.activeMainButton
                                }}
                                onClick={() => {
                                    if ((currPagination + 1) * ITEMS_PER_PAGE < logData.length) {
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