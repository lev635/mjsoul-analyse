'use client';

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';
import { useMemo, useState, memo } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { RANK_VALUES, type RankValue } from '@/lib/constants';
import { ScatterDataPoint, PlayerScatterPoint } from '@/lib/types';

interface ScatterPlotProps {
  data: ScatterDataPoint[];
  xKey: string;
  yKey: string;
  xLabel: string;
  yLabel: string;
  xDomain?: [number, number];
  yDomain?: [number, number];
  playerPoints?: PlayerScatterPoint[];
}

export { RANK_VALUES };
export type { RankValue };

// ツールチップ
interface CustomTooltipProps {
  active?: boolean;
  xKey: string;
  yKey: string;
  xLabel: string;
  yLabel: string;
  hoveredData: ScatterDataPoint | null;
}

const CustomTooltip = ({ active, xKey, yKey, xLabel, yLabel, hoveredData }: CustomTooltipProps) => {
  if (!active || !hoveredData) return null;

  const xValue = hoveredData[xKey];
  const yValue = hoveredData[yKey];

  const formatValue = (value: string | number | undefined): string => {
    if (value === undefined) return 'N/A';
    const num = typeof value === 'number' ? value : parseFloat(value);
    return isNaN(num) ? 'N/A' : num.toFixed(2);
  };

  return (
    <Paper elevation={3} sx={{ p: 1.5, border: 1, borderColor: 'grey.300' }}>
      <Typography variant="body2">
        <Box component="span" sx={{ fontWeight: 'medium' }}>{xLabel}:</Box> {formatValue(xValue)}
      </Typography>
      <Typography variant="body2">
        <Box component="span" sx={{ fontWeight: 'medium' }}>{yLabel}:</Box> {formatValue(yValue)}
      </Typography>
    </Paper>
  );
};

const renderPlayerCircle = (props: any) => {
  const { cx, cy, fill } = props;
  return (
    <circle cx={cx} cy={cy} r={8} fill={fill} stroke="black" strokeWidth={1.5} />
  );
};

// メモ化
const ScatterPlot = memo(function ScatterPlot({
  data,
  xKey,
  yKey,
  xLabel,
  yLabel,
  xDomain = [0, 1],
  yDomain = [0, 1],
  playerPoints = []
}: ScatterPlotProps) {
  const [hoveredData, setHoveredData] = useState<ScatterDataPoint | null>(null);

  const handleMouseEnter = (data: ScatterDataPoint) => {
    setHoveredData(data);
  };

  const handleMouseLeave = () => {
    setHoveredData(null);
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            type="number"
            dataKey={xKey}
            domain={xDomain}
            tick={{ fill: '#000', fontSize: 12 }}
            tickFormatter={(value) => value.toFixed(2)}
            allowDataOverflow={true}
          >
            <Label value={xLabel} offset={-20} position="insideBottom" style={{ fontSize: 14, fill: '#000' }} />
          </XAxis>
          <YAxis
            type="number"
            dataKey={yKey}
            domain={yDomain}
            tick={{ fill: '#000', fontSize: 12 }}
            tickFormatter={(value) => value.toFixed(2)}
            allowDataOverflow={true}
          >
            <Label value={yLabel} angle={-90} position="insideLeft" style={{ fontSize: 14, fill: '#000', textAnchor: 'middle' }} />
          </YAxis>
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            content={<CustomTooltip xKey={xKey} yKey={yKey} xLabel={xLabel} yLabel={yLabel} hoveredData={hoveredData} />}
          />
          {/* その他のデータ */}
          <Scatter
            name="All Players"
            data={data}
            fill="#8884d8"
            fillOpacity={0.3}
            shape="circle"
            isAnimationActive={false}
            onMouseEnter={(data: any) => handleMouseEnter(data)}
            onMouseLeave={handleMouseLeave}
          />
          {/* 取得したデータ */}
          {playerPoints.map((player, idx) => (
            <Scatter
              key={`player-${idx}`}
              name={player.name}
              data={[player.data]}
              fill={player.color}
              fillOpacity={1}
              shape={renderPlayerCircle}
              isAnimationActive={false}
              onMouseEnter={() => handleMouseEnter(player.data)}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </Box>
  );
});

export default ScatterPlot;
