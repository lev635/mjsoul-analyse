import { RANK_VALUES, type RankValue } from '@/components/ScatterPlot';
import { Dispatch, SetStateAction } from 'react';

interface ScatterPlotControlsProps {
  xAxis: string;
  setXAxis: Dispatch<SetStateAction<string>>;
  yAxis: string;
  setYAxis: Dispatch<SetStateAction<string>>;
  axisOptions: string[];
  visibleRanks: readonly RankValue[];
  onToggleRank: (rank: RankValue) => void;
}

export default function ScatterPlotControls({
  xAxis,
  setXAxis,
  yAxis,
  setYAxis,
  axisOptions,
  visibleRanks,
  onToggleRank
}: ScatterPlotControlsProps) {
  return (
    <div className="w-48 flex flex-col gap-2">
      <div>
        <label className="block text-sm font-medium">X軸:</label>
        <select
          value={xAxis}
          onChange={(e) => setXAxis(e.target.value)}
          className="w-full border rounded px-2 py-1.5 text-sm"
        >
          {axisOptions.map(key => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Y軸:</label>
        <select
          value={yAxis}
          onChange={(e) => setYAxis(e.target.value)}
          className="w-full border rounded px-2 py-1.5 text-sm"
        >
          {axisOptions.map(key => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">ランクフィルター</label>
        <div className="flex flex-col gap-2">
          {RANK_VALUES.map(rank => (
            <label key={rank} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={visibleRanks.includes(rank)}
                onChange={() => onToggleRank(rank)}
                className="cursor-pointer"
              />
              <span>{rank}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
