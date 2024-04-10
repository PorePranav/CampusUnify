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

export async function signup({ name, email, password, passwordConfirm }) {
  const { data, error } = await axios.post(
    'http://localhost:3000/api/v1/users/signup',
    { name, email, password, passwordConfirm },
    { withCredentials: true }
  );

  if (error) return new Error(error.message);
  return data.data;
}

export async function updateUser(updatedData) {
  const { data, error } = await axios.patch(
    'http://localhost:3000/api/v1/users/updateMe',
    updatedData,
    { withCredentials: true }
  );

  if (error) return new Error(error.message);
  return data.data;
}

export async function deleteUser() {
  const { data, error } = await axios.delete(
    'http://localhost:3000/api/v1/users/deleteMe',
    { withCredentials: true }
  );

  if (error) return new Error(error.message);
  return { status: data.status };
}

export async function logout() {
  const { data, error } = await axios.get(
    'http://localhost:3000/api/v1/users/logout',
    { withCredentials: true }
  );

  if (error) return new Error(error.message);
  return { status: data.status };
}

export async function getCurrentUser() {
  const { data, error } = await axios.get(
    'http://localhost:3000/api/v1/users/me',
    { withCredentials: true }
  );

  if (error) return new Error(error.message);
  return data.data;
}
