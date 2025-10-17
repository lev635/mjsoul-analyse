// プレイヤーの統計データ
export interface PlayerStats {
  名前?: string;
  記録対戦数?: string;
  和了率?: string;
  放銃率?: string;
  平均和了?: string;
  ダマ率?: string;
  立直良形?: string;
  追っかけ率?: string;
  副露率?: string;
  和了巡数?: string;
  立直率?: string;
  先制率?: string;
  立直収支?: string;
  立直収入?: string;
  立直支出?: string;
  立直和了?: string;
  流局聴牌率?: string;
  和了時立直率?: string;
  和了時副露率?: string;
  和了時ダマ率?: string;
  立直巡目?: string;
  放銃時副露率?: string;
  副露後和了率?: string;
  銃点損失?: string;
  打点効率?: string;
  平均放銃?: string;
  [key: string]: string | undefined;
}

// 統計情報の各指標
export interface StatInfo {
  mean: number;
  stdDev: number;
}

// 全体の統計情報
export interface Stats {
  [key: string]: StatInfo;
}

// 散布図のデータポイント
export interface ScatterDataPoint {
  [key: string]: number | string;
}

// プレイヤーの散布図ポイント
export interface PlayerScatterPoint {
  data: ScatterDataPoint;
  color: string;
  name: string;
}
