import { RANK_VALUES, type RankValue } from '@/components/scatter/ScatterPlot';
import { Dispatch, SetStateAction, memo } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { SelectChangeEvent } from '@mui/material/Select';

interface ScatterPlotControlsProps {
  xAxis: string;
  setXAxis: Dispatch<SetStateAction<string>>;
  yAxis: string;
  setYAxis: Dispatch<SetStateAction<string>>;
  axisOptions: string[];
  visibleRanks: readonly RankValue[];
  onToggleRank: (rank: RankValue) => void;
}

const ScatterPlotControls = memo(function ScatterPlotControls({
  xAxis,
  setXAxis,
  yAxis,
  setYAxis,
  axisOptions,
  visibleRanks,
  onToggleRank
}: ScatterPlotControlsProps) {
  const handleXAxisChange = (event: SelectChangeEvent) => {
    setXAxis(event.target.value);
  };

  const handleYAxisChange = (event: SelectChangeEvent) => {
    setYAxis(event.target.value);
  };

  return (
    <Stack sx={{ gap: 2 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="x-axis-label" sx={{ fontSize: '1rem' }}>X軸</InputLabel>
        <Select
          labelId="x-axis-label"
          value={xAxis}
          label="X軸"
          onChange={handleXAxisChange}
          sx={{ fontSize: '1rem' }}
        >
          {axisOptions.map(key => (
            <MenuItem key={key} value={key} sx={{ fontSize: '1rem' }}>{key}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel id="y-axis-label" sx={{ fontSize: '1rem' }}>Y軸</InputLabel>
        <Select
          labelId="y-axis-label"
          value={yAxis}
          label="Y軸"
          onChange={handleYAxisChange}
          sx={{ fontSize: '1rem' }}
        >
          {axisOptions.map(key => (
            <MenuItem key={key} value={key} sx={{ fontSize: '1rem' }}>{key}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box>
        <FormLabel component="legend" sx={{ fontSize: '1rem', fontWeight: 'medium' }}>
          ランクフィルター
        </FormLabel>
        <Stack sx={{ gap: 0.5 }}>
          {RANK_VALUES.map(rank => (
            <FormControlLabel
              key={rank}
              control={
                <Checkbox
                  checked={visibleRanks.includes(rank)}
                  onChange={() => onToggleRank(rank)}
                  size="small"
                />
              }
              label={rank}
              sx={{ '& .MuiFormControlLabel-label': { fontSize: '1rem' } }}
            />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
});

export default ScatterPlotControls;
