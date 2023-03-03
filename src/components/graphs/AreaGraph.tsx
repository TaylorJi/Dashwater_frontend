import { useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { LineChart, CartesianGrid, XAxis, Label, YAxis, Tooltip, Line, ResponsiveContainer, AreaChart, Area } from 'recharts';
import colors from '../../theme/foundations/colours';
import typography from '../../theme/foundations/typography';

type graphProps = {
    data: graphDataType[];
    xAxisLabel: string;
    yAxisLabel: string;
    xKey: string;
    graphDataKey: string;
    offsetY: number;
}

const AreaGraph: React.FC<graphProps> = ({ data, xAxisLabel, yAxisLabel, graphDataKey, xKey, offsetY }) => {

    const [isLargeScreen] = useMediaQuery('(min-width: 1600px)');

    return (
        <ResponsiveContainer width="99%" height={isLargeScreen ? 275 : 225}>
            <AreaChart
                data={data}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey={xKey}
                    style={{
                        fontSize: '0.6rem',
                        fontFamily: typography.fonts.body
                    }}
                >
                    <Label
                        offset={-4}
                        dx={-17}
                        value={xAxisLabel}
                        position="insideBottom"
                        style={{
                            fontSize: isLargeScreen ? '0.75rem' : '0.6rem',
                            fontFamily: typography.fonts.body,
                            paddingTop: '1rem'
                        }}
                    />
                </XAxis>
                <YAxis
                    style={{
                        fontSize: isLargeScreen ? '0.75rem' : '0.6rem',
                        fontFamily: typography.fonts.body,
                    }}
                >
                    <Label
                        value={yAxisLabel}
                        angle={-90}
                        position="insideLeft"
                        dy={offsetY}
                        offset={14}
                        style={{
                            fontSize: isLargeScreen ? '0.75rem' : '0.6rem',
                            fontFamily: typography.fonts.body,
                        }}
                    />
                </YAxis>
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey={graphDataKey}
                    stroke={colors.main.usafaBlue}
                    fill={colors.main.ceruBlue} />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default AreaGraph;