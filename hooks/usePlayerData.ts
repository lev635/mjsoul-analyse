import { useState, useCallback, useRef } from 'react';

// キャッシュの型定義
interface PlayerCache {
  [playerName: string]: {
    data: any;
    timestamp: number;
  };
}

const CACHE_DURATION = 1000 * 60 * 30; // 30分

export function usePlayerData() {
  const [playerNames, setPlayerNames] = useState<string[]>(['', '', '', '']);
  const [scrapedPlayers, setScrapedPlayers] = useState<any[]>([]);
  const [scraping, setScraping] = useState(false);

  // キャッシュをuseRefで管理（再レンダリングでも保持される）
  const cacheRef = useRef<PlayerCache>({});

  const fetchPlayerData = useCallback(async () => {
    setScraping(true);

    // 並列フェッチ（キャッシュチェック付き）
    const promises = playerNames.map(async (name) => {
      const trimmedName = name.trim();
      if (!trimmedName) return null;

      // キャッシュチェック
      const cached = cacheRef.current[trimmedName];
      const now = Date.now();

      if (cached && (now - cached.timestamp) < CACHE_DURATION) {
        console.log(`Using cached data for ${trimmedName}`);
        return cached.data;
      }

      // キャッシュがない、または期限切れの場合はフェッチ
      try {
        console.log(`Fetching data for ${trimmedName}`);
        const res = await fetch('/api/scrape-player', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ playerName: trimmedName })
        });

        if (res.ok) {
          const data = await res.json();
          // キャッシュに保存
          cacheRef.current[trimmedName] = {
            data,
            timestamp: now
          };
          return data;
        } else {
          console.error(`Failed to fetch data for ${trimmedName}`);
          return null;
        }
      } catch (error) {
        console.error(`Error fetching data for ${trimmedName}:`, error);
        return null;
      }
    });

    const results = await Promise.all(promises);
    const filteredResults = results.filter(r => r !== null);

    setScrapedPlayers(filteredResults);
    setScraping(false);
  }, [playerNames]);

  // キャッシュをクリアする関数
  const clearCache = useCallback(() => {
    cacheRef.current = {};
    console.log('Cache cleared');
  }, []);

  // 特定のプレイヤーのキャッシュをクリアする関数
  const clearPlayerCache = useCallback((playerName: string) => {
    delete cacheRef.current[playerName];
    console.log(`Cache cleared for ${playerName}`);
  }, []);

  return {
    playerNames,
    setPlayerNames,
    scrapedPlayers,
    scraping,
    fetchPlayerData,
    clearCache,
    clearPlayerCache
  };
}
