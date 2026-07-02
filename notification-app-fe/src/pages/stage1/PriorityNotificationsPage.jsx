import React, { useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { useNotificationContext } from '../../context/NotificationContext.jsx';
import { useNotifications } from '../../hooks/useNotifications.js';
import { sortNotificationsByPriorityAndTimestamp, getPriorityForType } from '../../utils/priority.js';

import NotificationCard from '../../components/NotificationCard.jsx';
import LoadingState from '../../components/LoadingState.jsx';
import ErrorState from '../../components/ErrorState.jsx';
import TopNSelector from '../../components/TopNSelector.jsx';

export default function PriorityNotificationsPage() {
  const { notifications, loading, error } = useNotifications();
  const { isRead, markAsRead } = useNotificationContext();

  const [topN, setTopN] = useState(10);

  const sorted = useMemo(() => {
    return sortNotificationsByPriorityAndTimestamp(notifications);
  }, [notifications]);

  const topNotifications = useMemo(() => {
    return sorted.slice(0, topN);
  }, [sorted, topN]);

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
        Priority Notifications (Top N)
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
        <TopNSelector value={topN} onChange={setTopN} />
      </Box>

      {loading && <LoadingState label="Loading priority notifications..." />}
      {error && <ErrorState error={error} />}

      {!loading && !error && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {topNotifications.length === 0 ? (
            <Typography color="text.secondary">No notifications found.</Typography>
          ) : (
            topNotifications.map((n) => {
              const priority = getPriorityForType(n.type);
              const read = isRead(n.id);

              return (
                <NotificationCard
                  key={n.id}
                  notification={n}
                  priority={priority}
                  read={read}
                  onClick={() => markAsRead(n.id)}
                />
              );
            })
          )}
        </Box>
      )}
    </Box>
  );
}

