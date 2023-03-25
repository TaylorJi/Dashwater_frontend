import React from 'react';
import GaugeChart from 'react-gauge-chart';
import uuid from 'react-uuid';
import colors from '../../theme/foundations/colours';

type gaugeGraphProps = {
    percent: number;
    text: string;
};

const GaugeGraph: React.FC<gaugeGraphProps> = ({ percent, text }) => {

    return (
        <GaugeChart
            id={uuid()}
            colors={[colors.main.acidGreen, colors.main.warning]}
            needleColor={colors.main.lightGrey}
            needleBaseColor={colors.main.lightGrey}
            percent={percent}
            textColor='black'
            formatTextValue={() => `${text}`}
        />
    );
};

export default GaugeGraph;