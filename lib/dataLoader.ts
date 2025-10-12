import Papa from 'papaparse';
import fs from 'fs';
import path from 'path';
import { RANK_VALUES } from './constants';

const RATING_IDX: { [key: string]: number } = { "士": 0, "傑": 1, "豪": 2, "聖": 4, "魂": 8 };

const IGNORE_COLUMNS = [
  "記録対戦数", "記録点数", "流局率", "飛び率", "安定段位", "点数期待",
  "立直流局率", "最高段位", "最高点数", "最大連荘", "痛い親かぶり率",
  "痛い親かぶり平均", "局収支", "平均順位", "立直放銃A", "立直放銃B",
  "立直収支", "立直流局", "振聴率", "立直多面", "総計局数", "調整打点効率",
  "ダマ率", "ツモ率", "追っかけられ率"
];

interface DataRow {
  [key: string]: string;
}

const loadCSV = (filePath: string): Promise<DataRow[]> => {
  return new Promise((resolve, reject) => {
    const absolutePath = path.join(process.cwd(), 'data', filePath);
    const fileContent = fs.readFileSync(absolutePath, 'utf-8');

    Papa.parse(fileContent, {
      header: true,
      complete: (results) => resolve(results.data as DataRow[]),
      error: (error: Error) => reject(error)
    });
  });
};

export interface PlayerData {
  data: string[][];
  label: { [key: string]: number };
}

export async function getData(): Promise<PlayerData> {
  const [data_0, data_1, data_2] = await Promise.all([
    loadCSV('playerdata_1.csv'),
    loadCSV('playerdata_2.csv'),
    loadCSV('playerdata_3.csv'),
  ]);

  const data_raw = [data_0, data_1, data_2];
  const data: string[][] = [];
  const label: { [key: string]: number } = {};

  for (let i = 0; i < 3; i++) {
    data_raw[i].forEach((dat) => {
      const playerdata: string[] = [];
      let j = 0;

      playerdata.push("anonymous");
      label["name"] = j++;

      playerdata.push(RANK_VALUES[i]);
      label["rank"] = j++;

      for (const key in dat) {
        if (IGNORE_COLUMNS.includes(key)) continue;

        if (key === "記録段位") {
          const rating = String(RATING_IDX[dat[key].substring(0, 1)] || 0);
          const pt = dat[key].substring(1);
          playerdata.push(rating);
          label["rating"] = j++;
          playerdata.push(pt);
          label["point"] = j++;
        } else {
          playerdata.push(dat[key]);
          label[key] = j++;
        }
      }
      data.push(playerdata);
    });
  }

  return { data, label };
}
