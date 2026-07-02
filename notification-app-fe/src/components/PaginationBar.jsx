import React from 'react';
import { Box, Pagination } from '@mui/material';

export default function PaginationBar({ page, pageSize, totalCount, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, v) => onPageChange?.(v)}
        color="primary"
      />
    </Box>
  );
}

