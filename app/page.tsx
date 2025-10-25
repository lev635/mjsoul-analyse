'use client';

import { useEffect, useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import ScatterPlotSection from '@/components/scatter/ScatterPlotSection';
import PlayerSearchSection from '@/components/player/PlayerSearchSection';
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
    <Box
      sx={{
        p: 2,
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Box
        component="header"
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 4,
          mx: 'auto',
        }}
      >
        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
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

      <Grid
        container
        spacing={2}
        sx={{ flex: 1 }}
      >
        <Grid size={8} sx={{ height: '100%' }}>
          <ScatterPlotSection
            scatterData={scatterData}
            playerScatterPoints={playerScatterPoints}
            axisOptions={axisOptions}
          />
        </Grid>

        <Grid size={4} sx={{ height: '100%' }}>
          <PlayerSearchSection
            playerNames={playerNames}
            setPlayerNames={setPlayerNames}
            onFetchData={fetchPlayerData}
            scraping={scraping}
            players={scrapedPlayers}
            colors={colors}
            stats={stats}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
