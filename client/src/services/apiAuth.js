import axios from 'axios';

export async function login({ email, password }) {
  const { data, error } = await axios.post(
    'http://localhost:3000/api/v1/users/login',
    { email, password },
    { withCredentials: true }
  );

  if (error) return new Error(error.message);
  return data;
}
