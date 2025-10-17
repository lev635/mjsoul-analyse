import { Dispatch, SetStateAction } from 'react';
import { Box, Stack, Typography, TextField, Button } from '@mui/material';

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
    <Stack sx={{ gap: 2 }}>
      <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
        プレイヤー検索
      </Typography>
      <Box sx={{ position: 'relative', height: 280 }}>
        {/* 対面 */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: colors[2] }} />
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
            }}
          />
        </Box>

        {/* 上家 */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: colors[3] }} />
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
            }}
          />
        </Box>

        {/* ボタン */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
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
              width: 64,
              height: 64,
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

        {/* 下家 */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            right: 0,
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: colors[1] }} />
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
            }}
          />
        </Box>

        {/* 自家 */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: colors[0] }} />
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
            }}
          />
        </Box>
      </Box>
    </Stack>
  );
}
