'use client';

import { memo } from 'react';
import { Box, Paper, Typography, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';

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
    <Paper elevation={1} sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box
          sx={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            border: 1,
            borderColor: 'black',
            bgcolor: color,
            mr: 1,
          }}
        />
        <Typography
          variant="body1"
          sx={{ color: lackData ? 'error.main' : 'text.primary' }}
        >
          {playerName} {lackData && "(データ不足)"}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid size={6}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            【長所】
          </Typography>
          <Stack spacing={0.5}>
            {Object.entries(strongPoints).map(([key, value]) => (
              <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{key}</Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                  {value}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Grid>

        <Grid size={6}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            【短所】
          </Typography>
          <Stack spacing={0.5}>
            {Object.entries(weakPoints).map(([key, value]) => (
              <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{key}</Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                  {value}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
});

export default PlayerAnalysis;
