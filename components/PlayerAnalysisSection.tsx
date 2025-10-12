import PlayerRadarChart from '@/components/RadarChart';
import PlayerInputTable from '@/components/PlayerInputTable';
import { colors } from '@/lib/dataTransformers';
import { Dispatch, SetStateAction } from 'react';

interface PlayerAnalysisSectionProps {
  playerNames: string[];
  setPlayerNames: Dispatch<SetStateAction<string[]>>;
  onFetchData: () => void;
  scraping: boolean;
  players: any[];
}

export default function PlayerAnalysisSection({
  playerNames,
  setPlayerNames,
  onFetchData,
  scraping,
  players
}: PlayerAnalysisSectionProps) {
  return (
    <section className="flex-[1] bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">プレイヤー検索</h2>

      <PlayerInputTable
        playerNames={playerNames}
        setPlayerNames={setPlayerNames}
        onFetchData={onFetchData}
        scraping={scraping}
      />

      {/* レーダーチャート */}
      <div className="grid grid-cols-2 gap-3">
        {players.slice(0, 4).map((player: any, idx: number) => (
          <div key={idx}>
            <h3 className="text-sm font-bold mb-1" style={{ color: colors[idx] }}>
              {playerNames[idx] || `プレイヤー ${idx + 1}`}
            </h3>
            <PlayerRadarChart playerData={player} color={colors[idx]} />
          </div>
        ))}
      </div>
    </section>
  );
}
