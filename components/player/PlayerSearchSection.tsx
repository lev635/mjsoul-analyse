import PlayerInputTable from '@/components/player/PlayerInputTable';
import PlayerAnalysisGrid from '@/components/player/PlayerAnalysisGrid';
import { Dispatch, SetStateAction } from 'react';
import Grid from '@mui/material/Grid';
import { PlayerStats, Stats } from '@/lib/types';

interface PlayerSearchSectionProps {
  playerNames: string[];
  setPlayerNames: Dispatch<SetStateAction<string[]>>;
  onFetchData: () => void;
  scraping: boolean;
  players: PlayerStats[];
  colors: string[];
  stats: Stats;
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
    <Grid
      container
      component="section"
      spacing={2}
    >
      <Grid size={12}>
        <PlayerInputTable
          playerNames={playerNames}
          setPlayerNames={setPlayerNames}
          onFetchData={onFetchData}
          scraping={scraping}
        />
      </Grid>
      <Grid size={12}>
        <PlayerAnalysisGrid
          players={players}
          colors={colors}
          stats={stats}
        />
      </Grid>
    </Grid>
  );
}
