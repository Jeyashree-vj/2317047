import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Container, Box, Typography, AppBar, Toolbar, Button } from '@mui/material';

import AllNotificationsPage from './pages/AllNotificationsPage.jsx';
import PriorityNotificationsPage from './pages/PriorityNotificationsPage.jsx';

export default function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Campus Notification System
          </Typography>
          <Button color="inherit" href="#/" onClick={(e) => e.preventDefault()}>
            Home
          </Button>
          <Button color="inherit" href="#/all" onClick={(e) => e.preventDefault()}>
            All
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/priority" replace />} />
          <Route path="/all" element={<AllNotificationsPage />} />
          <Route path="/priority" element={<PriorityNotificationsPage />} />
        </Routes>
      </Container>
    </Box>
  );
}

