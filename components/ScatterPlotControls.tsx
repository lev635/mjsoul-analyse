import { RANK_VALUES, type RankValue } from '@/components/ScatterPlot';
import { Dispatch, SetStateAction, memo } from 'react';
import {
  Box,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  FormControlLabel,
  Checkbox,
  SelectChangeEvent
} from '@mui/material';

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
    <Stack sx={{ width: 192, gap: 2 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="x-axis-label">X軸</InputLabel>
        <Select
          labelId="x-axis-label"
          value={xAxis}
          label="X軸"
          onChange={handleXAxisChange}
        >
          {axisOptions.map(key => (
            <MenuItem key={key} value={key}>{key}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel id="y-axis-label">Y軸</InputLabel>
        <Select
          labelId="y-axis-label"
          value={yAxis}
          label="Y軸"
          onChange={handleYAxisChange}
        >
          {axisOptions.map(key => (
            <MenuItem key={key} value={key}>{key}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box>
        <FormLabel component="legend" sx={{ fontSize: '0.875rem', fontWeight: 'medium', mb: 1 }}>
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
              sx={{ fontSize: '0.875rem' }}
            />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
});

export default ScatterPlotControls;
