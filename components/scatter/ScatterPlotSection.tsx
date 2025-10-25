import { useState, useMemo, useCallback } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ScatterPlot, { RANK_VALUES, type RankValue } from '@/components/scatter/ScatterPlot';
import ScatterPlotControls from '@/components/scatter/ScatterPlotControls';
import { ScatterDataPoint, PlayerScatterPoint } from '@/lib/types';

interface ScatterPlotSectionProps {
  scatterData: ScatterDataPoint[];
  playerScatterPoints: PlayerScatterPoint[];
  axisOptions: string[];
}

const axisDomains: Record<string, [number, number]> = {
  "副露率": [0, 0.8],
  "流局聴牌率": [0, 1],
  "立直和了": [0, 0.7],
  "立直収支": [2000, 5000],
  "立直収入": [5000, 10000],
  "立直支出": [5000, 10000],
  "先制率": [0.6, 1],
  "和了巡数": [10, 14],
  "平均和了": [5000, 9000],
  "和了時立直率": [0.15, 0.8],
  "和了時副露率": [0.15, 0.8],
  "和了時ダマ率": [0, 0.5],
  "和了率": [0.1, 0.35],
  "放銃率": [0.05, 0.25],
  "追っかけ率": [0, 0.4],
  "立直巡目": [7, 12],
  "立直良形": [0.2, 0.7],
  "放銃時副露率": [0, 1],
  "副露後和了率": [0.2, 0.4],
  "銃点損失": [300, 1700],
  "打点効率": [900, 2000],
  "平均放銃": [4000, 7000],
  "立直率": [0, 0.35],
};

const defaultDomain: [number, number] = [0, 0.35];

export default function ScatterPlotSection({
  scatterData,
  playerScatterPoints,
  axisOptions
}: ScatterPlotSectionProps) {
  const [xAxis, setXAxis] = useState('放銃率');
  const [yAxis, setYAxis] = useState('和了率');
  const [visibleRanks, setVisibleRanks] = useState<readonly RankValue[]>([...RANK_VALUES]);

  // ランクごとにデータを事前分割
  const dataByRank = useMemo(() => {
    const grouped: Record<RankValue, ScatterDataPoint[]> = {
      '金の間': [], '玉の間': [], '王座の間': []
    };
    scatterData.forEach(item => {
      const rank = item['rank'] as RankValue;
      if (grouped[rank]) grouped[rank].push(item);
    });
    return grouped;
  }, [scatterData]);

  // 表示するランクのデータのみを結合
  const filteredData = useMemo(() => {
    return visibleRanks.flatMap(rank => dataByRank[rank] || []);
  }, [dataByRank, visibleRanks]);

  const xDomain = useMemo(() => axisDomains[xAxis] || defaultDomain, [xAxis]);
  const yDomain = useMemo(() => axisDomains[yAxis] || defaultDomain, [yAxis]);

  const toggleRank = useCallback((rank: RankValue) => {
    setVisibleRanks(prev =>
      prev.includes(rank)
        ? prev.filter(r => r !== rank)
        : [...prev, rank]
    );
  }, []);

  return (
    <Grid
      container
      component="section"
      spacing={1}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Grid size={12} sx={{ flexShrink: 0 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
          データ
        </Typography>
      </Grid>
      <Grid container spacing={1} sx={{ flex: 1, minHeight: 0 }}>
        <Grid size={9} sx={{ height: '100%' }}>
          <ScatterPlot
            data={filteredData}
            xKey={xAxis}
            yKey={yAxis}
            xLabel={xAxis}
            yLabel={yAxis}
            xDomain={xDomain}
            yDomain={yDomain}
            playerPoints={playerScatterPoints}
          />
        </Grid>
        <Grid size={3} sx={{ height: '100%' }}>
          <ScatterPlotControls
            xAxis={xAxis}
            setXAxis={setXAxis}
            yAxis={yAxis}
            setYAxis={setYAxis}
            axisOptions={axisOptions}
            visibleRanks={visibleRanks}
            onToggleRank={toggleRank}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
