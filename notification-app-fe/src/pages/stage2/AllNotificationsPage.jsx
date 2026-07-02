import React, { useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { useNotificationContext } from '../../context/NotificationContext.jsx';
import { useNotifications } from '../../hooks/useNotifications.js';
import { sortNotificationsByPriorityAndTimestamp, getPriorityForType } from '../../utils/priority.js';

import NotificationCard from '../../components/NotificationCard.jsx';
import LoadingState from '../../components/LoadingState.jsx';
import ErrorState from '../../components/ErrorState.jsx';
import PaginationBar from '../../components/PaginationBar.jsx';
import TypeFilter from '../../components/TypeFilter.jsx';
import ReadFilter from '../../components/ReadFilter.jsx';

export default function AllNotificationsPage() {
  const { notifications, loading, error } = useNotifications();
  const { isRead, markAsRead } = useNotificationContext();

  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);

  const [typeValue, setTypeValue] = useState('All');
  const [readValue, setReadValue] = useState('All');

  const sorted = useMemo(() => sortNotificationsByPriorityAndTimestamp(notifications), [notifications]);

  const filtered = useMemo(() => {
    return sorted.filter((n) => {
      const matchesType = typeValue === 'All' ? true : n.type === typeValue;

      const read = isRead(n.id);
      const matchesRead =
        readValue === 'All'
          ? true
          : readValue === 'Unread'
            ? !read
            : readValue === 'Read'
              ? read
              : true;

      return matchesType && matchesRead;
    });
  }, [sorted, typeValue, readValue, isRead]);

  const totalCount = filtered.length;

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
  };

  // reset page when filters change
  React.useEffect(() => {
    setPage(1);
  }, [typeValue, readValue]);

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
        All Notifications
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
        <TypeFilter value={typeValue} onChange={setTypeValue} />
        <ReadFilter value={readValue} onChange={setReadValue} />
      </Box>

      {loading && <LoadingState label="Loading notifications..." />}
      {error && <ErrorState error={error} />}

      {!loading && !error && (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {paged.length === 0 ? (
              <Typography color="text.secondary">No notifications match your filters.</Typography>
            ) : (
              paged.map((n) => {
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

          <PaginationBar
            page={page}
            pageSize={pageSize}
            totalCount={totalCount}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </Box>
  );
}

