import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function TypeFilter({ value, onChange }) {
  return (
    <FormControl size="small" sx={{ minWidth: 200 }}>
      <InputLabel id="type-filter-label">Type</InputLabel>
      <Select
        labelId="type-filter-label"
        label="Type"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Placement">Placement</MenuItem>
        <MenuItem value="Result">Result</MenuItem>
        <MenuItem value="Event">Event</MenuItem>
      </Select>
    </FormControl>
  );
}

