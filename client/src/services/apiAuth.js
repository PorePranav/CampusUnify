import api from './api';

export async function login({ email, password }) {
  const { data, error } = await api.post(
    `/users/login`,
    { email, password },
    { withCredentials: true }
  );

  if (error) return new Error(error.message);
  return data.data;
}

export async function signup({ name, email, role, password, passwordConfirm }) {
  const { data, error } = await api.post(
    `/users/signup`,
    { name, email, role, password, passwordConfirm },
    { withCredentials: true }
  );

  if (error) return new Error(error.message);
  return data.data;
}

export async function updateUser(updatedData) {
  const { data, error } = await api.patch(`/users/updateMe`, updatedData, {
    withCredentials: true,
  });

  if (error) return new Error(error.message);
  return data.data;
}

export async function deleteUser() {
  const { data, error } = await api.delete(`/users/deleteMe`, {
    withCredentials: true,
  });

  if (error) return new Error(error.message);
  return { status: data.status };
}

export async function logout() {
  const { data, error } = await api.get(`/users/logout`, {
    withCredentials: true,
  });

  if (error) return new Error(error.message);
  return { status: data.status };
}

export async function getCurrentUser() {
  const { data, error } = await api.get(`/users/me`, {
    withCredentials: true,
  });

  if (error) return new Error(error.message);
  return data.data;
}

export async function forgotPassword(email) {
  const { data, error } = await api.post(`/users/forgotPassword`, { email });

  if (error) return new Error(error.message);
  return data.data;
}
