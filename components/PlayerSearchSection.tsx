import PlayerInputTable from '@/components/PlayerInputTable';
import PlayerAnalysisGrid from '@/components/PlayerAnalysisGrid';
import { Dispatch, SetStateAction } from 'react';
import { Box, Stack } from '@mui/material';
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
    <Box
      component="section"
      sx={{
        p: 2,
        height: 1100,
      }}
    >
      <Stack sx={{ gap: 2 }}>
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
      </Stack>
    </Box>
  );
}
