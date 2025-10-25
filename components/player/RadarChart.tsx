'use client';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { memo } from 'react';
import Box from '@mui/material/Box';
import { PlayerStats } from '@/lib/types';

interface RadarChartProps {
  playerData?: PlayerStats;
  color?: string;
}

const createRadarValue = (data: PlayerStats, column: string, min: number, max: number): number => {
  const val = Number(data[column] || 0);

  if (val > max) return 1;
  if (val < min) return 0;
  return (val - min) / (max - min);
};

const PlayerRadarChart = memo(function PlayerRadarChart({ playerData, color = '#69b3a2' }: RadarChartProps) {
  // playerData が undefined の場合は何も表示しない
  if (!playerData) {
    return null;
  }

  const data = [
    {
      axis: "攻",
      value: createRadarValue(playerData, "平均和了", 5500, 7500)
    },
    {
      axis: "防",
      value: 1 - createRadarValue(playerData, "放銃率", 0.10, 0.19)
    },
    {
      axis: "門",
      value: createRadarValue(playerData, "立直率", 0.13, 0.25)
    },
    {
      axis: "鳴",
      value: createRadarValue(playerData, "副露率", 0.15, 0.5)
    },
    {
      axis: "速",
      value: createRadarValue(playerData, "和了率", 0.18, 0.28)
    },
  ];

  return (
    <Box sx={{ width: '100%', height: 160 }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
          <PolarGrid stroke="#999" />
          <PolarAngleAxis dataKey="axis" tick={{ fill: '#000', fontSize: 14 }} />
          <PolarRadiusAxis angle={90} domain={[0, 1]} tick={false} />
          <Radar
            name="Player Stats"
            dataKey="value"
            stroke={color}
            fill={color}
            fillOpacity={0.5}
            isAnimationActive={false}
          />
        </RadarChart>
      </ResponsiveContainer>
    </Box>
  );
});

export default PlayerRadarChart;
