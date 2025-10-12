'use client';

import { useEffect, useState, useMemo } from 'react';
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
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="mb-4 flex items-center gap-8">
        <h1 className="text-3xl font-bold text-gray-800">じゃんたま分析くん</h1>
        <button
          onClick={() => setShowHelp(true)}
          className="text-lg font-bold underline"
        >
          使い方
        </button>
      </header>

      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />

      <main className="flex gap-4 max-w-[1920px] mx-auto h-[calc(100vh-6rem)]">
        <div className="flex-[2]">
          <ScatterPlotSection
            scatterData={scatterData}
            playerScatterPoints={playerScatterPoints}
            axisOptions={axisOptions}
          />
        </div>

        <div className="flex-[1]">
          <PlayerSearchSection
            playerNames={playerNames}
            setPlayerNames={setPlayerNames}
            onFetchData={fetchPlayerData}
            scraping={scraping}
            players={scrapedPlayers}
            colors={colors}
            stats={stats}
          />
        </div>
      </main>
    </div>
  );
}
