import React from 'react';
import { Box, Chip, Paper, Typography } from '@mui/material';

import { formatTimestamp } from '../utils/priority.js';

function typeToLabel(type) {
  return type;
}

export default function NotificationCard({ notification, priority, read, onClick }) {
  return (
    <Paper
      variant="outlined"
      onClick={() => onClick?.(notification)}
      sx={{
        p: 2,
        cursor: 'pointer',
        borderColor: read ? 'divider' : 'primary.main',
        bgcolor: read ? 'background.paper' : 'primary.lighter',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip label={typeToLabel(notification.type)} size="small" />
            <Chip label={`Priority ${priority}`} size="small" color={read ? 'default' : 'primary'} />
            {!read && <Chip label="Unread" size="small" color="secondary" />}
          </Box>

          <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 600 }}>
            {notification.message}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {formatTimestamp(notification.timestamp)}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

