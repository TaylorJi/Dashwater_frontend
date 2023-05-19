import { createColumnHelper } from '@tanstack/react-table';
import { BaseTable } from './BaseTable';
import { Box, Text } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { displayedLogDataSelector, logDataAtom } from './atoms/logPanelAtoms';
import LogPagination from './LogPagination';
import LoadingGraphic from '../../layout/LoadingGraphic';
import { MISSING_VALUE } from '../dashboardHelpers';

const Logs: React.FC = () => {

    const logData = useRecoilValue(logDataAtom);
    const displayedLogData = useRecoilValue(displayedLogDataSelector);

    const columnHelper = createColumnHelper<logDataType>();

    const columns = [
        columnHelper.accessor('id', {
            cell: ({ getValue }) => {
                const val = getValue<string>();
                return (<Text textAlign='center' fontSize='sm'>{val}</Text>);
            },
            header: 'ID',
            meta: {
                isNumeric: true
            }
        }),
        columnHelper.accessor('time', {
            cell: ({ getValue }) => {
                const val = getValue<string>();
                return (<Text textAlign='center' fontSize='sm'>{val}</Text>);
            },
            header: 'Time'
        }),
        columnHelper.accessor('dissolvedOxygen', {
            cell: ({ getValue }) => {
                const val = getValue<number>();
                return (val === MISSING_VALUE ? <></> : <Text textAlign='center' fontSize='sm'>{val}</Text>);
            },
            header: 'Dissolved Oxygen',
            meta: {
                isNumeric: true
            }
        }),
        columnHelper.accessor('electricalConductivity', {
            cell: ({ getValue }) => {
                const val = getValue<number>();
                return (val === MISSING_VALUE ? <></> : <Text textAlign='center' fontSize='sm'>{val}</Text>);
            },
            header: 'Electrical Conductivity',
            meta: {
                isNumeric: true
            }
        }),
        columnHelper.accessor('pH', {
            cell: ({ getValue }) => {
                const val = getValue<number>();
                return (val === MISSING_VALUE ? <></> : <Text textAlign='center' fontSize='sm'>{val}</Text>);
            },
            header: 'pH',
            meta: {
                isNumeric: true
            }
        }),
        columnHelper.accessor('turbidity', {
            cell: ({ getValue }) => {
                const val = getValue<number>();
                return (val === MISSING_VALUE ? <></> : <Text textAlign='center' fontSize='sm'>{val}</Text>);
            },
            header: 'Turbidity',
            meta: {
                isNumeric: true
            }
        }),
        columnHelper.accessor('totalDissolvedSolids', {
            cell: ({ getValue }) => {
                const val = getValue<number>();
                return (val === MISSING_VALUE ? <></> : <Text textAlign='center' fontSize='sm'>{val}</Text>);
            },
            header: 'Total Dissolved Solids',
            meta: {
                isNumeric: true
            }
        }),
        columnHelper.accessor('temperature', {
            cell: ({ getValue }) => {
                const val = getValue<number>();
                return (val === MISSING_VALUE ? <></> : <Text textAlign='center' fontSize='sm'>{val}</Text>);
            },
            header: 'Temperature',
            meta: {
                isNumeric: true
            }
        }),
        columnHelper.accessor('waterFlow', {
            cell: ({ getValue }) => {
                const val = getValue<number>();
                return (val === MISSING_VALUE ? <></> : <Text textAlign='center' fontSize='sm'>{val}</Text>);
            },
            header: 'Water Flow',
            meta: {
                isNumeric: true
            }
        }),
        columnHelper.accessor('waterPressure', {
            cell: ({ getValue }) => {
                const val = getValue<number>();
                return (val === MISSING_VALUE ? <></> : <Text textAlign='center' fontSize='sm'>{val}</Text>);
            },
            header: 'Water Pressure',
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
                        <LogPagination />

                    </>
                    :
                    <LoadingGraphic />
            }

        </>
    );
};

export default Logs;