import { ScatterDataPoint, PlayerStats, PlayerScatterPoint, Stats } from './types';

const colors = ['red', 'blue', 'green', 'yellow'];

interface DataResponse {
  data: string[][];
  label: Record<string, number>;
}

export function convertToScatterData(data: DataResponse | null): ScatterDataPoint[] {
  if (!data) return [];
  return data.data.map((row: string[]) => {
    const obj: ScatterDataPoint = {};
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
  players: PlayerStats[]
): PlayerScatterPoint[] {
  if (!players || players.length === 0) return [];

  return players.slice(0, 4).map((player: PlayerStats, idx: number) => {
    const pointData: ScatterDataPoint = {};

    for (const key of Object.keys(player)) {
      if (key === 'name' || key === 'rank' || key === '名前') {
        pointData[key] = player[key] || '';
      } else {
        const value = parseFloat(player[key] || '0');
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

export function getAxisOptions(data: DataResponse | null): string[] {
  if (!data) return [];
  return Object.keys(data.label).filter(k => !['name', 'rank', 'rating', 'point'].includes(k));
}

export function calculateStats(data: DataResponse | null): Stats {
  if (!data || !data.data) return {};

  const stats: Stats = {};
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
