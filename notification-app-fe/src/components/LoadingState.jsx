import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function LoadingState({ label = 'Loading notifications...' }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 6, gap: 2 }}>
      <CircularProgress />
      <Typography color="text.secondary">{label}</Typography>
    </Box>
  );
}

