import { createColumnHelper } from '@tanstack/react-table';
import { BaseTable } from './BaseTable';
import { mockLogData } from '../../../mockData/dashboardMockData';
import { Box } from '@chakra-ui/react';

const Logs: React.FC = () => {

    const columnHelper = createColumnHelper<logDataType>();

    const columns = [
        columnHelper.accessor('id', {
            cell: (info) => info.getValue(),
            header: 'ID',
            meta: {
                isNumeric: true
            }
        }),
        columnHelper.accessor('time', {
            cell: (info) => info.getValue(),
            header: 'Time'
        }),
        columnHelper.accessor('dissolvedOxygen', {
            cell: (info) => info.getValue(),
            header: 'Dissolved Oxygen',
            meta: {
                isNumeric: true
            }
        }),
        columnHelper.accessor('electricalConductivity', {
            cell: (info) => info.getValue(),
            header: 'Electrical Conductivity',
            meta: {
                isNumeric: true
            }
        }),
        columnHelper.accessor('pH', {
            cell: (info) => info.getValue(),
            header: 'pH',
            meta: {
                isNumeric: true
            }
        })
    ];

    return (
        <Box
            overflowX='auto'
        >
            <BaseTable columns={columns} data={mockLogData} />
        </Box>
    );
};

export default Logs;