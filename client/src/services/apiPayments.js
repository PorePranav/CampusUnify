import api from './api';

export async function initiatePayment() {
  const { data, error } = await api.get('/payments/createOrder', {
    withCredentials: true,
  });

  if (error) return new Error(error.message);
  return data.data;
}
