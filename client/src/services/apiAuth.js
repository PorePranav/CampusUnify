import axios from 'axios';

export async function login({ email, password }) {
  const { data, error } = await axios.post(
    'http://localhost:3000/api/v1/users/login',
    { email, password },
    { withCredentials: true }
  );

  if (error) return new Error(error.message);
  return data.data;
}

export async function getCurrentUser() {
  const { data, error } = await axios.get(
    'http://localhost:3000/api/v1/users/me',
    { withCredentials: true }
  );

  if (error) return new Error(error.message);
  return data.data;
}
