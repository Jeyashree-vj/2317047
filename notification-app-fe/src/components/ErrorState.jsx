import React from 'react';
import { Alert } from '@mui/material';

export default function ErrorState({ error }) {
  const message = error?.message || 'Failed to load notifications.';
  return <Alert severity="error">{message}</Alert>;
}

