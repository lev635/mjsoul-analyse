import { useState, useMemo } from 'react';
import ScatterPlot, { RANK_VALUES, type RankValue } from '@/components/ScatterPlot';
import ScatterPlotControls from '@/components/ScatterPlotControls';

interface ScatterPlotSectionProps {
  scatterData: any[];
  playerScatterPoints: any[];
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

  const xDomain = useMemo(() => axisDomains[xAxis] || defaultDomain, [xAxis]);
  const yDomain = useMemo(() => axisDomains[yAxis] || defaultDomain, [yAxis]);

  const toggleRank = (rank: RankValue) => {
    setVisibleRanks(prev =>
      prev.includes(rank)
        ? prev.filter(r => r !== rank)
        : [...prev, rank]
    );
  };

  return (
    <section className="flex-[1] bg-white p-4 rounded-lg shadow h-full flex flex-col gap-2">
      <h2 className="text-xl font-bold">プレイヤー散布図</h2>
      <div className="flex gap-2 flex-1 min-h-0">
        <div className="flex-1 min-h-0">
          <ScatterPlot
            data={scatterData}
            xKey={xAxis}
            yKey={yAxis}
            xLabel={xAxis}
            yLabel={yAxis}
            xDomain={xDomain}
            yDomain={yDomain}
            playerPoints={playerScatterPoints}
            visibleRanks={visibleRanks}
          />
        </div>

        <ScatterPlotControls
          xAxis={xAxis}
          setXAxis={setXAxis}
          yAxis={yAxis}
          setYAxis={setYAxis}
          axisOptions={axisOptions}
          visibleRanks={visibleRanks}
          onToggleRank={toggleRank}
        />
      </div>
    </section>
  );
}
