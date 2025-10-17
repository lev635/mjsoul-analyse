import PlayerRadarChart from '@/components/RadarChart';
import PlayerInputTable from '@/components/PlayerInputTable';
import { colors } from '@/lib/dataTransformers';
import { Dispatch, SetStateAction } from 'react';
import { Paper, Typography, Box, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import { PlayerStats } from '@/lib/types';

interface PlayerAnalysisSectionProps {
  playerNames: string[];
  setPlayerNames: Dispatch<SetStateAction<string[]>>;
  onFetchData: () => void;
  scraping: boolean;
  players: PlayerStats[];
}

export default function PlayerAnalysisSection({
  playerNames,
  setPlayerNames,
  onFetchData,
  scraping,
  players
}: PlayerAnalysisSectionProps) {
  return (
    <Paper component="section" elevation={1} sx={{ flex: 1, p: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
          プレイヤー検索
        </Typography>

        <PlayerInputTable
          playerNames={playerNames}
          setPlayerNames={setPlayerNames}
          onFetchData={onFetchData}
          scraping={scraping}
        />

        {/* レーダーチャート */}
        <Grid container spacing={1.5}>
          {players.slice(0, 4).map((player: PlayerStats, idx: number) => (
            <Grid size={6} key={idx}>
              <Box>
                <Typography
                  variant="body2"
                  component="h3"
                  sx={{ fontWeight: 'bold', mb: 0.5, color: colors[idx] }}
                >
                  {playerNames[idx] || `プレイヤー ${idx + 1}`}
                </Typography>
                <PlayerRadarChart playerData={player} color={colors[idx]} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Paper>
  );
}
