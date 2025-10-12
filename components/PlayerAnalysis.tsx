'use client';

import { memo } from 'react';

interface PlayerAnalysisProps {
  playerData: { [key: string]: string };
  averageData: { [key: string]: string };
  stdData: { [key: string]: string };
  color: string;
  playerName: string;
}

const PlayerAnalysis = memo(function PlayerAnalysis({ playerData, averageData, stdData, color, playerName }: PlayerAnalysisProps) {
  const columnOrdered = ["和了率", "放銃率", "平均和了", "ダマ率", "立直良形", "追っかけ率", "副露率", "和了巡数", "立直率"];
  const strongPoints: { [key: string]: string } = {};
  const weakPoints: { [key: string]: string } = {};

  for (const key of columnOrdered) {
    if (!playerData[key] || playerData[key] === "" || playerData[key] === "undefined") {
      continue;
    }

    const value = parseFloat(playerData[key]);
    const avg = parseFloat(averageData[key]);
    const std = parseFloat(stdData[key]);

    if (isNaN(value) || isNaN(avg) || isNaN(std)) continue;

    if (value > avg + std) {
      if (key === "放銃率" || key === "和了巡数") {
        weakPoints[key] = value.toFixed(2);
      } else {
        strongPoints[key] = value.toFixed(2);
      }
    } else if (value < avg - std) {
      if (key === "放銃率" || key === "和了巡数") {
        strongPoints[key] = value.toFixed(2);
      } else {
        weakPoints[key] = value.toFixed(2);
      }
    }
  }

  const lackData = parseInt(playerData["記録対戦数"]) < 50;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center mb-4">
        <div
          className="w-4 h-4 rounded-full border border-black mr-2"
          style={{ backgroundColor: color }}
        />
        <span className={lackData ? "text-red-600" : "text-black"}>
          {playerName} {lackData && "(データ不足)"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-2">【長所】</h3>
          <div className="space-y-1">
            {Object.entries(strongPoints).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span>{key}</span>
                <span className="font-mono">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-2">【短所】</h3>
          <div className="space-y-1">
            {Object.entries(weakPoints).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span>{key}</span>
                <span className="font-mono">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default PlayerAnalysis;
