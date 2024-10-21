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
  try {
    const res = await api.post('/users/signup', {
      name,
      email,
      role,
      password,
      passwordConfirm,
    });
    return res.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export async function verifyEmail({ email, otp }) {
  const res = await api.post('/users/verifyEmail', { email, otp });
  return res.data;
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
  try {
    const { data } = await api.get(`/users/logout`, {
      withCredentials: true,  // Ensures that cookies are sent for the request
    });

    // Check for successful response from the backend
    if (data?.status === 'success') {
      return { status: data.status };
    } else {
      throw new Error('Failed to logout. Please try again.');
    }
  } catch (error) {
    // Handle the error thrown by Axios
    console.error('Logout error:', error);
    throw new Error(error.response?.data?.message || error.message || 'Logout failed.');
  }
}

export async function getCurrentUser() {
  const { data, error } = await api.get(`/users/me`, {
    withCredentials: true,
  });

  if (error) return new Error(error.message);
  return data.data;
}

export async function forgotPassword(email) {
  try {
    const res = await api.post('/users/forgotPassword', { email });
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

export async function resetPassword({ tokenId, password, passwordConfirm }) {
  const { data, error } = await api.patch(`/users/resetPassword/${tokenId}`, {
    password,
    passwordConfirm,
  });

  if (error) return new Error(error.message);
  return data.data;
}
