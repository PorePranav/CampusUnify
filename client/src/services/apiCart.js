import api from './api';

export async function getCart() {
  const { data, error } = await api.get('/cart', {
    withCredentials: true,
  });

  if (error) return new Error(error.message);
  return data.data;
}

export async function addToCart(eventId) {
  const { data, error } = await api.post(`/cart/${eventId}`, null, {
    withCredentials: true,
  });

  if (error) return new Error(error.message);
  return data.data;
}

export async function deleteFromCart(eventId) {
  const { data, error } = await api.delete(`/cart/${eventId}`, {
    withCredentials: true,
  });

  if (error) return new Error(error.message);
  return data.data;
}

export async function clearCart() {
  const { data, error } = await api.delete(`/cart`, { withCredentials: true });

  if (error) throw new Error(error.message);
  return data.data;
}
