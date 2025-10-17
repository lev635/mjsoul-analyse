import PlayerRadarChart from '@/components/RadarChart';
import { Box, Typography, Paper, Stack, List, ListItem } from '@mui/material';
import Grid from '@mui/material/Grid';

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
    <Stack sx={{ flex: 1, gap: 2 }}>
      <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold' }}>
        プレイヤー分析
      </Typography>
      <Grid container spacing={1.5}>
        {players.slice(0, 4).map((player: any, idx: number) => {
          const advice = generateAdvice(player, stats);

          return (
            <Grid size={6} key={idx}>
              <Paper
                variant="outlined"
                sx={{
                  p: 0.5,
                  borderColor: 'black',
                  borderWidth: 1,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Box
                    sx={{
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      border: 1,
                      borderColor: 'black',
                      bgcolor: colors[idx],
                    }}
                  />
                  <Typography variant="body2" component="h4" sx={{ fontWeight: 'bold', color: 'black' }}>
                    {player['名前'] || `プレイヤー ${idx + 1}`}
                  </Typography>
                </Box>
                <PlayerRadarChart playerData={player} color={colors[idx]} />
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
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}
