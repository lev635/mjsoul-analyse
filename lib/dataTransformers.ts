const colors = ['red', 'blue', 'green', 'yellow'];

export function convertToScatterData(data: any) {
  if (!data) return [];
  return data.data.map((row: string[]) => {
    const obj: any = {};
    for (const key in data.label) {
      const value = row[data.label[key]];
      if (key === 'name' || key === 'rank') {
        obj[key] = value;
      } else {
        obj[key] = parseFloat(value) || 0;
      }
    }
    return obj;
  });
}

export function convertToPlayerScatterPoints(
  players: any[]
) {
  if (!players || players.length === 0) return [];

  return players.slice(0, 4).map((player: any, idx: number) => {
    const pointData: any = {};

    for (const key of Object.keys(player)) {
      if (key === 'name' || key === 'rank' || key === '名前') {
        pointData[key] = player[key];
      } else {
        const value = parseFloat(player[key]);
        pointData[key] = isNaN(value) ? 0 : value;
      }
    }

    return {
      data: pointData,
      color: colors[idx],
      name: player['名前'] || `プレイヤー ${idx + 1}`
    };
  });
}

export function getAxisOptions(data: any) {
  if (!data) return [];
  return Object.keys(data.label).filter(k => !['name', 'rank', 'rating', 'point'].includes(k));
}

export function calculateStats(data: any) {
  if (!data || !data.data) return {};

  const stats: any = {};
  const keys = Object.keys(data.label).filter(k => !['name', 'rank', 'rating', 'point'].includes(k));

  keys.forEach(key => {
    const values = data.data
      .map((row: string[]) => parseFloat(row[data.label[key]]))
      .filter((v: number) => !isNaN(v));

    if (values.length > 0) {
      const mean = values.reduce((a: number, b: number) => a + b, 0) / values.length;
      const variance = values.reduce((a: number, b: number) => a + Math.pow(b - mean, 2), 0) / values.length;
      const stdDev = Math.sqrt(variance);

      stats[key] = { mean, stdDev };
    }
  });

  return stats;
}

export { colors };
