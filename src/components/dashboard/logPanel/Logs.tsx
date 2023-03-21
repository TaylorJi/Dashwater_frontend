import { createColumnHelper } from '@tanstack/react-table';
import { BaseTable } from './BaseTable';
import { mockLogData } from '../../../mockData/dashboardMockData';
import { Box, Text } from '@chakra-ui/react';

const Logs: React.FC = () => {

    const columnHelper = createColumnHelper<logDataType>();

    const columns = [
        columnHelper.accessor('id', {
            cell: ({ getValue }) => {
                const val = getValue<string>();
                return (<Text textAlign='center'>{val}</Text>);
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
                const val = getValue<string>();
                return (<Text textAlign='center'>{val}</Text>);
            },
            header: 'Dissolved Oxygen',
            meta: {
                isNumeric: true
            }
        }),
        columnHelper.accessor('electricalConductivity', {
            cell: ({ getValue }) => {
                const val = getValue<string>();
                return (<Text textAlign='center'>{val}</Text>);
            },
            header: 'Electrical Conductivity',
            meta: {
                isNumeric: true
            }
        }),
        columnHelper.accessor('pH', {
            cell: ({ getValue }) => {
                const val = getValue<string>();
                return (<Text textAlign='center'>{val}</Text>);
            },
            header: 'pH',
            meta: {
                isNumeric: true
            }
        }),
        columnHelper.accessor('turbidity', {
            cell: ({ getValue }) => {
                const val = getValue<string>();
                return (<Text textAlign='center'>{val}</Text>);
            },
            header: 'Turbidity',
            meta: {
                isNumeric: true
            }
        }),
        columnHelper.accessor('totalDissolvedSolids', {
            cell: ({ getValue }) => {
                const val = getValue<string>();
                return (<Text textAlign='center'>{val}</Text>);
            },
            header: 'Total Dissolved Solids',
            meta: {
                isNumeric: true
            }
        }),
        columnHelper.accessor('temperature', {
            cell: ({ getValue }) => {
                const val = getValue<string>();
                return (<Text textAlign='center'>{val}</Text>);
            },
            header: 'Temperature',
            meta: {
                isNumeric: true
            }
        })
    ];

    return (
        <Box
            overflow='auto'
        >
            <BaseTable columns={columns} data={mockLogData} />
        </Box>
    );
};

export default Logs;