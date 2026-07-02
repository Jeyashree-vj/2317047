import axios from 'axios';

const API_BASE_URL = 'http://4.224.186.213/evaluation-service';
const NOTIFICATIONS_ENDPOINT = '/notifications';

export async function fetchNotifications() {
  const url = `${API_BASE_URL}${NOTIFICATIONS_ENDPOINT}`;
  const res = await axios.get(url);
  // Expecting: [{ id, type, message, timestamp }, ...]
  return res.data;
}

