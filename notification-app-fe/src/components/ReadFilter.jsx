import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function ReadFilter({ value, onChange }) {
  return (
    <FormControl size="small" sx={{ minWidth: 170 }}>
      <InputLabel id="read-filter-label">Read</InputLabel>
      <Select
        labelId="read-filter-label"
        label="Read"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Unread">Unread</MenuItem>
        <MenuItem value="Read">Read</MenuItem>
      </Select>
    </FormControl>
  );
}

