import { useState, useCallback } from 'react';

export function usePlayerData() {
  const [playerNames, setPlayerNames] = useState<string[]>(['', '', '', '']);
  const [scrapedPlayers, setScrapedPlayers] = useState<any[]>([]);
  const [scraping, setScraping] = useState(false);

  const fetchPlayerData = useCallback(async () => {
    setScraping(true);
    const results: any[] = [];

    for (let i = 0; i < playerNames.length; i++) {
      const name = playerNames[i].trim();
      if (!name) continue;

      try {
        const res = await fetch('/api/scrape-player', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ playerName: name, rank: 'g' })
        });

        if (res.ok) {
          const playerData = await res.json();
          results.push(playerData);
        } else {
          console.error(`Failed to fetch data for ${name}`);
        }
      } catch (error) {
        console.error(`Error fetching data for ${name}:`, error);
      }
    }

    setScrapedPlayers(results);
    setScraping(false);
  }, [playerNames]);

  return {
    playerNames,
    setPlayerNames,
    scrapedPlayers,
    scraping,
    fetchPlayerData
  };
}
