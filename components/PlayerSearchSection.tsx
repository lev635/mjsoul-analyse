import PlayerInputTable from '@/components/PlayerInputTable';
import PlayerAnalysisGrid from '@/components/PlayerAnalysisGrid';
import { Dispatch, SetStateAction } from 'react';
import { Paper, Stack } from '@mui/material';

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
    <Paper
      component="section"
      elevation={1}
      sx={{
        p: 2,
        height: '100%',
        overflow: 'auto',
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
    </Paper>
  );
}
