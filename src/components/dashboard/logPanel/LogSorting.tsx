import { Button, Flex, Icon, Select, useMediaQuery } from '@chakra-ui/react';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import uuid from 'react-uuid';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import colors from '../../../theme/foundations/colours';
import { metricNames } from '../../helpers/constants';
import { itemsPerPageAtom, logSortOrderAtom, metricSelectedAtom, paginationMultipleAtom } from './atoms/logPanelAtoms';

const LogSorting: React.FC = () => {

    const [isLargeScreen] = useMediaQuery('(min-width: 1600px)');

    const [sortOrder, setSortOrder] = useState<string>('asc');
    const [sortingMetric, setSortingMetric] = useState<string>('');

    const setGlobalMetricSelected = useSetRecoilState(metricSelectedAtom);
    const setGlobalLogSortOrder = useSetRecoilState(logSortOrderAtom);

    const resetGlobalMetricSelected = useResetRecoilState(metricSelectedAtom);
    const resetGlobalLogSortOrder = useResetRecoilState(logSortOrderAtom);
    const resetPagination = useResetRecoilState(paginationMultipleAtom);
    const resetItemsPerPage = useResetRecoilState(itemsPerPageAtom);

    useEffect(() => {
        return () => {
            resetGlobalMetricSelected();
            resetGlobalLogSortOrder();
        }
    }, []);

    return (
        <Flex
            alignItems='center'
        >
            <Select
                size='sm'
                ml='1rem'
                mr='0.5rem'
                w={isLargeScreen ? '20rem' : '12rem'}
                borderRadius='0.25rem'
                borderColor={colors.main.usafaBlue}
                value={sortingMetric}
                onChange={(e) => {
                    setSortingMetric(e.target.value);
                }}
            >
                {
                    Object.keys(metricNames).map((metric) => {
                        return (
                            <option
                                value={metric}
                                key={uuid()}
                            >
                                {metricNames[metric]}
                            </option>
                        )
                    })
                }
            </Select>

            <Select
                size='sm'
                mr='0.5rem'
                w={isLargeScreen ? '10rem' : '9rem'}
                borderRadius='0.25rem'
                borderColor={colors.main.usafaBlue}
                value={sortOrder}
                onChange={(e) => {
                    setSortOrder(e.target.value);
                }}
            >
                <option
                    value={'asc'}
                    key={uuid()}
                >
                    Sort Ascending
                </option>
                <option
                    value={'desc'}
                    key={uuid()}
                >
                    Sort Descending
                </option>
            </Select>

            <Button
                size='sm'
                colorScheme='main'
                color='white'
                leftIcon={<Icon
                    as={FontAwesomeIcon}
                    icon={faSort}
                    color='white'
                />}
                _hover={{
                    bg: colors.main.activeMainButton
                }}
                onClick={() => {
                    resetPagination();
                    resetItemsPerPage();
                    setGlobalLogSortOrder(sortOrder);
                    setGlobalMetricSelected(sortingMetric);
                    toast.success('Your sort settings were applied!');
                }}
            >
                Global Sort
            </Button>

        </Flex >
    );
};

export default LogSorting;