'use client';

import { useEffect, useState, useMemo } from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import ScatterPlotSection from '@/components/ScatterPlotSection';
import PlayerSearchSection from '@/components/PlayerSearchSection';
import HelpModal from '@/components/HelpModal';
import { usePlayerData } from '@/hooks/usePlayerData';
import {
  convertToScatterData,
  convertToPlayerScatterPoints,
  getAxisOptions,
  calculateStats,
  colors
} from '@/lib/dataTransformers';

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showHelp, setShowHelp] = useState(false);

  const {
    playerNames,
    setPlayerNames,
    scrapedPlayers,
    scraping,
    fetchPlayerData
  } = usePlayerData();

  useEffect(() => {
    async function fetchData() {
      try {
        const dataRes = await fetch('/api/data');
        const dataJson = await dataRes.json();
        setData(dataJson);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const scatterData = useMemo(() => convertToScatterData(data), [data]);
  const axisOptions = useMemo(() => getAxisOptions(data), [data]);
  const stats = useMemo(() => calculateStats(data), [data]);
  const playerScatterPoints = useMemo(
    () => convertToPlayerScatterPoints(scrapedPlayers),
    [scrapedPlayers]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">データ読み込み中...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">データの読み込みに失敗しました</div>
      </div>
    );
  }

  return (
    <Stack
      sx={{
        bgcolor: 'grey.100',
        p: 2,
        gap: 2,
      }}
    >
      <Box
        component="header"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          mx: 'auto',
          maxWidth: '1920px',
          width: "100%",
          flexShrink: 0,
        }}
      >
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: 'grey.800' }}>
          じゃんたま分析くん
        </Typography>
        <Button
          onClick={() => setShowHelp(true)}
          variant="text"
          sx={{
            fontSize: '1.125rem',
            fontWeight: 'bold',
            textTransform: 'none',
          }}
        >
          使い方
        </Button>
      </Box>

      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />

      <Box
        component="main"
        sx={{
          display: 'flex',
          gap: 2,
          maxWidth: '1920px',
          width: '100%',
          mx: 'auto',
        }}
      >
        <Box sx={{ flex: 2 }}>
          <ScatterPlotSection
            scatterData={scatterData}
            playerScatterPoints={playerScatterPoints}
            axisOptions={axisOptions}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <PlayerSearchSection
            playerNames={playerNames}
            setPlayerNames={setPlayerNames}
            onFetchData={fetchPlayerData}
            scraping={scraping}
            players={scrapedPlayers}
            colors={colors}
            stats={stats}
          />
        </Box>
      </Box>
    </Stack>
  );
}
