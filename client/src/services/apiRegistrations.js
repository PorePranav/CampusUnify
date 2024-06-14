import api from './api';

export async function getRegistrations() {
  const { data, error } = await api.get('/bookings', { withCredentials: true });

  if (error) return new Error(error.message);
  return data.data;
}
