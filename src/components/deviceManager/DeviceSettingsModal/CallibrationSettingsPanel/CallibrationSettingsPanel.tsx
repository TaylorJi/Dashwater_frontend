import React from 'react';
import { Select } from '@chakra-ui/react';
import colors from '../../../../theme/foundations/colours';

const CallibrationSettingsPanel: React.FC = () => {
    return (
        <>
            <Select
                size='sm'
                borderRadius='0.25rem'
                placeholder='Select Devices'
                w='15rem'
                borderColor={colors.main.usafaBlue}
            />
        </>
    );
};

export default CallibrationSettingsPanel;