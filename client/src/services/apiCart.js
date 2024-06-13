import axios from 'axios';

export async function getCart() {
  const { data, error } = await axios.get('http://localhost:3000/api/v1/cart', {
    withCredentials: true,
  });

  if (error) return new Error(error.message);
  return data.data;
}

export async function addToCart(eventId) {
  const { data, error } = await axios.post(
    `http://localhost:3000/api/v1/cart/${eventId}`,
    null,
    { withCredentials: true }
  );

  if (error) return new Error(error.message);
  return data.data;
}

export async function deleteFromCart(eventId) {
  const { data, error } = await axios.delete(
    `http://localhost:3000/api/v1/cart/${eventId}`,
    { withCredentials: true }
  );

  if (error) return new Error(error.message);
  return data.data;
}

export async function clearCart() {
  const { data, error } = await axios.delete(
    `http://localhost:3000/api/v1/cart`,
    { withCredentials: true }
  );

  if (error) throw new Error(error.message);
  return data.data;
}
