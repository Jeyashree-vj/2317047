import { useEffect, useMemo, useState } from 'react';
import { fetchNotifications } from '../services/notificationService.js';

export function useNotifications() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function run() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetchNotifications();
        if (mounted) setData(Array.isArray(res) ? res : []);
      } catch (e) {
        if (mounted) setError(e);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    run();
    return () => {
      mounted = false;
    };
  }, []);

  const stableData = useMemo(() => data, [data]);

  return { notifications: stableData, loading, error };
}

