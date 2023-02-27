import { Button } from '@chakra-ui/button';
import Icon from '@chakra-ui/icon';
import { Select } from '@chakra-ui/select';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import colors from '../../theme/foundations/colours';

const DashboardTopSelect: React.FC = () => {

    return (
        <>
            <Select
                size='sm'
                borderRadius='0.25rem'
                placeholder='Select Devices'
                w='15rem'
                borderColor={colors.main.usafaBlue}
            />
            <Button
                size='sm'
                bg='main.acidGreen'
                ml='0.5rem'
                color='white'
                fontSize='sm'
                rightIcon={<Icon
                    as={FontAwesomeIcon}
                    icon={faChevronRight}
                    color='white'
                />}
                _hover={{
                    bg: colors.main.mossGreen
                }}
            >
                Select by Map
            </Button>

            <Select
                size='sm'
                borderRadius='0.25rem'
                placeholder='Select Metrics'
                ml='2rem'
                w='15rem'
                borderColor={colors.main.usafaBlue}
            />
        </>
    );
};

export default DashboardTopSelect;
