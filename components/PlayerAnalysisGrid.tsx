import PlayerRadarChart from '@/components/RadarChart';

interface PlayerAnalysisGridProps {
  players: any[];
  colors: string[];
  stats: any;
}

function generateAdvice(playerData: any, stats: any): string[] {
  const advice: string[] = [];

  // 平均和了
  if (stats['平均和了']) {
    const val = parseFloat(playerData['平均和了']);
    const { mean, stdDev } = stats['平均和了'];
    if (val > mean + stdDev) {
      advice.push('高打点プレイヤー。高い手を狙う傾向があります。');
    } else if (val < mean - stdDev) {
      advice.push('低打点プレイヤー。素早い和了を重視します。');
    }
  }

  // 放銃率
  if (stats['放銃率']) {
    const val = parseFloat(playerData['放銃率']);
    const { mean, stdDev } = stats['放銃率'];
    if (val > mean + stdDev) {
      advice.push('放銃率が高め。降りのタイミングに注意が必要です。');
    } else if (val < mean - stdDev) {
      advice.push('守備力が高い。危険牌の見極めが上手です。');
    }
  }

  // 立直率
  if (stats['立直率']) {
    const val = parseFloat(playerData['立直率']);
    const { mean, stdDev } = stats['立直率'];
    if (val > mean + stdDev) {
      advice.push('積極的に立直を打つスタイル。');
    } else if (val < mean - stdDev) {
      advice.push('立直は控えめ。慎重な打ち回しです。');
    }
  }

  // 副露率
  if (stats['副露率']) {
    const val = parseFloat(playerData['副露率']);
    const { mean, stdDev } = stats['副露率'];
    if (val > mean + stdDev) {
      advice.push('鳴きを多用するスタイル。速度重視です。');
    } else if (val < mean - stdDev) {
      advice.push('門前派。手役を重視します。');
    }
  }

  // 和了率
  if (stats['和了率']) {
    const val = parseFloat(playerData['和了率']);
    const { mean, stdDev } = stats['和了率'];
    if (val > mean + stdDev) {
      advice.push('和了率が高い。安定した成績が期待できます。');
    } else if (val < mean - stdDev) {
      advice.push('和了率が低め。攻撃より守備を重視している可能性があります。');
    }
  }

  if (advice.length === 0) {
    advice.push('バランスの良いプレイスタイルです。');
  }

  return advice;
}

export default function PlayerAnalysisGrid({
  players,
  colors,
  stats
}: PlayerAnalysisGridProps) {
  if (players.length === 0) return null;

  return (
    <div className="flex-1 flex flex-col gap-2">
      <h3 className="text-xl font-bold">プレイヤー分析</h3>
      <div className="grid grid-cols-2 gap-3">
        {players.slice(0, 4).map((player: any, idx: number) => {
          const advice = generateAdvice(player, stats);

          return (
            <div key={idx} className="border border-black rounded p-1">
              <div className="flex items-center gap-2">
                <div
                  className="w-3.5 h-3.5 rounded-full border border-black"
                  style={{ backgroundColor: colors[idx] }}
                />
                <h4 className="text-sm font-bold text-black">
                  {player['名前'] || `プレイヤー ${idx + 1}`}
                </h4>
              </div>
              <PlayerRadarChart playerData={player} color={colors[idx]} />
              <div className=" bg-gray-50 rounded text-xs">
                <p className="font-bold">アドバイス:</p>
                <ul className="space-y-1">
                  {advice.map((item, i) => (
                    <li key={i} className="flex gap-1">
                      <span>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
