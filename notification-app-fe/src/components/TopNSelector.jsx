import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function TopNSelector({ value, onChange }) {
  return (
    <FormControl size="small" sx={{ minWidth: 200 }}>
      <InputLabel id="topn-label">Top N</InputLabel>
      <Select
        labelId="topn-label"
        label="Top N"
        value={value}
        onChange={(e) => onChange?.(Number(e.target.value))}
      >
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={15}>15</MenuItem>
        <MenuItem value={20}>20</MenuItem>
      </Select>
    </FormControl>
  );
}

