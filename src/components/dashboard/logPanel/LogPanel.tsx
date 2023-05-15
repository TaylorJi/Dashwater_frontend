import { Box, Button, Flex, Icon, Spacer } from '@chakra-ui/react';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import colors from '../../../theme/foundations/colours';
import Logs from './Logs';
import { utils as XLSX, writeFile as XLSXWriteFile } from 'xlsx';
import { remapDataForExport } from '../dashboardHelpers';
import toast from 'react-hot-toast';
import LogSorting from './LogSorting';
import { useRecoilValue } from 'recoil';
import { logDataAtom } from './atoms/logPanelAtoms';

const LogPanel: React.FC = () => {

    const logData = useRecoilValue(logDataAtom);

    const exportXLSX = (data: logDataType[]) => {

        const workbook = XLSX.book_new();

        const formattedData = remapDataForExport(data);

        if (!formattedData) {
            toast.error('There was a problem exporting the report. Please try again!');

        } else {

            ///////////////////////// NEW /////////////////////////////////
            let totalData = 0;
            const devicesWorkSheet = XLSX.aoa_to_sheet([]);
            XLSX.book_append_sheet(workbook, devicesWorkSheet, 'All Devices');
            let skipHeader = false;

            Object.entries(formattedData).map(([sheetName, data]) => {
                const worksheet = XLSX.json_to_sheet(data);
                XLSX.book_append_sheet(workbook, worksheet, `${sheetName}_(${data.length})`);
                totalData += data.length;
                XLSX.sheet_add_json(devicesWorkSheet, data, { skipHeader: skipHeader, origin: -1 });
                skipHeader = true;
            });

            const allDevicesSheet = workbook.Sheets['All Devices'];
            workbook.SheetNames[0] = `All Devices_${totalData}`
            workbook.Sheets[`All Devices_${totalData}`] = allDevicesSheet;

            //////////////////////////////////////////////////////////

            // Object.entries(formattedData).map(([sheetName, data]) => {
            //     const worksheet = XLSX.json_to_sheet(data);
            //     XLSX.book_append_sheet(workbook, worksheet, sheetName);
            // });

            XLSXWriteFile(workbook, 'yvr-devices-log.xlsx');

            toast.success('The report for this time period was successfully generated.');
        }

    };

    return (
        <Box>
            <Flex
                mt='0.75rem'
                mb='1rem'
            >
                <LogSorting />
                <Spacer />
                <Button
                    size='sm'
                    bg='main.acidGreen'
                    ml='0.5rem'
                    color='white'
                    leftIcon={<Icon
                        as={FontAwesomeIcon}
                        icon={faDownload}
                        color='white'
                    />}
                    isDisabled={!logData}
                    _hover={{
                        bg: colors.main.mossGreen
                    }}
                    onClick={() => {
                        if (logData) {
                            exportXLSX(logData);
                        }
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