import { Box, Button, Flex, Icon, Spacer } from '@chakra-ui/react';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback } from 'react';
import colors from '../../../theme/foundations/colours';
import Logs from './Logs';
import { mockLogData } from '../../../mockData/dashboardMockData';
import { utils as XLSX, writeFile as XLSXWriteFile } from 'xlsx';
import { remapDataForExport } from '../dashboardHelpers';
import toast from 'react-hot-toast';

const LogPanel: React.FC = () => {

    const exportXLSX = useCallback((data: logDataType[]) => {

        const workbook = XLSX.book_new();

        const formattedData = remapDataForExport(data);

        if (!formattedData) {
            toast.error('There was a problem exporting the report. Please try again!');

        } else {

            Object.entries(formattedData).map(([sheetName, data]) => {
                const worksheet = XLSX.json_to_sheet(data);
                XLSX.book_append_sheet(workbook, worksheet, sheetName);
            });

            XLSXWriteFile(workbook, 'yvr-devices-log.xlsx');

            toast.success('The report for this time period was successfully generated.');
        }

    }, []);

    return (
        <Box>
            <Flex
                mb='0.75rem'
            >
                <Spacer />
                <Button
                    bg='main.acidGreen'
                    ml='0.5rem'
                    color='white'
                    leftIcon={<Icon
                        as={FontAwesomeIcon}
                        icon={faDownload}
                        color='white'
                    />}
                    _hover={{
                        bg: colors.main.mossGreen
                    }}
                    onClick={() => {
                        exportXLSX(mockLogData);
                    }}
                >
                    Download
                </Button>
            </Flex>
            <Logs />
        </Box>
    );
};

export default LogPanel;