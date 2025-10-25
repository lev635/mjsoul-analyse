import PlayerRadarChart from '@/components/player/RadarChart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import { PlayerStats, Stats } from '@/lib/types';
import { useMemo, memo } from 'react';

interface PlayerAnalysisGridProps {
  players: PlayerStats[];
  colors: string[];
  stats: Stats;
}

interface PlayerCardProps {
  player: PlayerStats;
  color: string;
  stats: Stats;
}

// プレイヤーカードをメモ化
const PlayerCard = memo(function PlayerCard({ player, color, stats }: PlayerCardProps) {
  const advice = useMemo(() => generateAdvice(player, stats), [player, stats]);

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 0.5,
        borderColor: 'black',
        borderWidth: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            border: 1,
            borderColor: 'black',
            bgcolor: color,
          }}
        />
        <Typography variant="body2" component="h4" sx={{ fontWeight: 'bold', color: 'black' }}>
          {player['名前'] || 'プレイヤー'}
        </Typography>
      </Box>
      <PlayerRadarChart playerData={player} color={color} />
      <Box sx={{ bgcolor: 'grey.50', borderRadius: 1, p: 0.5 }}>
        <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
          アドバイス:
        </Typography>
        <List dense disablePadding sx={{ pl: 1 }}>
          {advice.map((item, i) => (
            <ListItem key={i} disableGutters sx={{ display: 'flex', gap: 0.5, py: 0.25 }}>
              <Typography variant="caption" component="span">•</Typography>
              <Typography variant="caption" component="span">{item}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
});

function generateAdvice(playerData: PlayerStats | undefined, stats: Stats): string[] {
  const advice: string[] = [];

  // playerData が undefined の場合
  if (!playerData) {
    return ['データがありません'];
  }

  // 平均和了
  if (stats['平均和了']) {
    const val = parseFloat(playerData['平均和了'] || '0');
    const { mean, stdDev } = stats['平均和了'];
    if (val > mean + stdDev) {
      advice.push('高打点プレイヤー。高い手を狙う傾向があります。');
    } else if (val < mean - stdDev) {
      advice.push('低打点プレイヤー。素早い和了を重視します。');
    }
  }

  // 放銃率
  if (stats['放銃率']) {
    const val = parseFloat(playerData['放銃率'] || '0');
    const { mean, stdDev } = stats['放銃率'];
    if (val > mean + stdDev) {
      advice.push('放銃率が高め。降りのタイミングに注意が必要です。');
    } else if (val < mean - stdDev) {
      advice.push('守備力が高い。危険牌の見極めが上手です。');
    }
  }

  // 立直率
  if (stats['立直率']) {
    const val = parseFloat(playerData['立直率'] || '0');
    const { mean, stdDev } = stats['立直率'];
    if (val > mean + stdDev) {
      advice.push('積極的に立直を打つスタイル。');
    } else if (val < mean - stdDev) {
      advice.push('立直は控えめ。慎重な打ち回しです。');
    }
  }

  // 副露率
  if (stats['副露率']) {
    const val = parseFloat(playerData['副露率'] || '0');
    const { mean, stdDev } = stats['副露率'];
    if (val > mean + stdDev) {
      advice.push('鳴きを多用するスタイル。速度重視です。');
    } else if (val < mean - stdDev) {
      advice.push('門前派。手役を重視します。');
    }
  }

  // 和了率
  if (stats['和了率']) {
    const val = parseFloat(playerData['和了率'] || '0');
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
    <Grid container spacing={1}>
      {players.slice(0, 4).map((player: PlayerStats, idx: number) => (
        <Grid size={6} key={idx}>
          <PlayerCard player={player} color={colors[idx]} stats={stats} />
        </Grid>
      ))}
    </Grid>
  );
}
