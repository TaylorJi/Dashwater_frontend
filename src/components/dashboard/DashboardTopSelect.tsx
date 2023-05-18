import { Button } from '@chakra-ui/button';
import Icon from '@chakra-ui/icon';
import { useDisclosure } from '@chakra-ui/react';
import { Select } from '@chakra-ui/select';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import colors from '../../theme/foundations/colours';
import MapModal from '../map/mapModal/MapModal';

const DashboardTopSelect: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <MapModal isOpen={isOpen} onClose={onClose} />
            <Button
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
                onClick={onOpen}
            >
                Select Devices by Map
            </Button>

        </>
    );
};

export default DashboardTopSelect;