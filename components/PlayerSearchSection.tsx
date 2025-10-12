import PlayerInputTable from '@/components/PlayerInputTable';
import PlayerAnalysisGrid from '@/components/PlayerAnalysisGrid';
import { Dispatch, SetStateAction } from 'react';

interface PlayerSearchSectionProps {
  playerNames: string[];
  setPlayerNames: Dispatch<SetStateAction<string[]>>;
  onFetchData: () => void;
  scraping: boolean;
  players: any[];
  colors: string[];
  stats: any;
}

export default function PlayerSearchSection({
  playerNames,
  setPlayerNames,
  onFetchData,
  scraping,
  players,
  colors,
  stats
}: PlayerSearchSectionProps) {
  return (
    <section className="bg-white p-4 rounded-lg shadow h-full flex flex-col overflow-auto gap-2">
      <PlayerInputTable
        playerNames={playerNames}
        setPlayerNames={setPlayerNames}
        onFetchData={onFetchData}
        scraping={scraping}
      />

      <PlayerAnalysisGrid
        players={players}
        colors={colors}
        stats={stats}
      />
    </section>
  );
}
