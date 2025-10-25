import { Dispatch, SetStateAction } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface PlayerInputTableProps {
  playerNames: string[];
  setPlayerNames: Dispatch<SetStateAction<string[]>>;
  onFetchData: () => void;
  scraping: boolean;
}

const colors = ['red', 'blue', 'green', 'yellow'];

export default function PlayerInputTable({
  playerNames,
  setPlayerNames,
  onFetchData,
  scraping
}: PlayerInputTableProps) {
  const handleNameChange = (index: number, value: string) => {
    const newNames = [...playerNames];
    newNames[index] = value;
    setPlayerNames(newNames);
  };

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
          プレイヤー検索
        </Typography>
      </Grid>

      {/* 空白 */}
      <Grid size={4} />

      {/* 対面 */}
      <Grid size={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1.5, pr: 1 }}>
        <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: colors[2], border: 1, borderColor: 'black' }} />
        <TextField
          placeholder="対面"
          value={playerNames[2]}
          onChange={(e) => handleNameChange(2, e.target.value)}
          size="small"
          sx={{
            width: 112,
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderWidth: 2, borderColor: 'black' },
            },
            '& .MuiOutlinedInput-input': {
              padding: '4px 8px',
            },
          }}
        />
      </Grid>

      {/* 空白 */}
      <Grid size={4} />

      {/* 上家 */}
      <Grid size={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: colors[3], border: 1, borderColor: 'black' }} />
        <TextField
          placeholder="上家"
          value={playerNames[3]}
          onChange={(e) => handleNameChange(3, e.target.value)}
          size="small"
          sx={{
            width: 112,
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderWidth: 2, borderColor: 'black' },
            },
            '& .MuiOutlinedInput-input': {
              padding: '4px 8px',
            },
          }}
        />
      </Grid>

      {/* ボタン */}
      <Grid size={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box
          sx={{
            width: 128,
            height: 128,
            bgcolor: '#15803d',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            onClick={onFetchData}
            disabled={scraping || playerNames.every(n => !n.trim())}
            variant="contained"
            sx={{
              bgcolor: 'white',
              color: '#15803d',
              width: 80,
              height: 80,
              fontWeight: 'bold',
              fontSize: '0.75rem',
              '&:hover': { bgcolor: 'grey.100' },
              '&.Mui-disabled': {
                bgcolor: 'grey.300',
                color: 'grey.500',
              },
            }}
          >
            {scraping ? '取得中' : '取得'}
          </Button>
        </Box>
      </Grid>

      {/* 下家 */}
      <Grid size={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: colors[1], border: 1, borderColor: 'black' }} />
        <TextField
          placeholder="下家"
          value={playerNames[1]}
          onChange={(e) => handleNameChange(1, e.target.value)}
          size="small"
          sx={{
            width: 112,
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderWidth: 2, borderColor: 'black' },
            },
            '& .MuiOutlinedInput-input': {
              padding: '4px 8px',
            },
          }}
        />
      </Grid>

      {/* 空白 */}
      <Grid size={4} />

      {/* 自家 */}
      <Grid size={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1.5, pr: 1 }}>
        <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: colors[0], border: 1, borderColor: 'black' }} />
        <TextField
          placeholder="自家"
          value={playerNames[0]}
          onChange={(e) => handleNameChange(0, e.target.value)}
          size="small"
          sx={{
            width: 112,
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderWidth: 2, borderColor: 'black' },
            },
            '& .MuiOutlinedInput-input': {
              padding: '4px 8px',
            },
          }}
        />
      </Grid>

      {/* 空白 */}
      <Grid size={4} />
    </Grid>
  );
}
