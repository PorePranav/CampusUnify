<<<<<<< HEAD
import axios from 'axios';

export async function login({ email, password }) {
  const { data, error } = await axios.post(
    'http://localhost:3000/api/v1/users/login',
    { email, password },
    { withCredentials: true }
=======
import axios from "axios";

export async function login({ email, password }) {
  const { data, error } = await axios.post(
    "http://localhost:3000/api/v1/users/login",
    { email, password },
    { withCredentials: true },
>>>>>>> b4fdd8b (sync commit)
  );

  if (error) return new Error(error.message);
  return data.data;
}

export async function signup({ name, email, password, passwordConfirm }) {
  const { data, error } = await axios.post(
<<<<<<< HEAD
    'http://localhost:3000/api/v1/users/signup',
    { name, email, password, passwordConfirm },
    { withCredentials: true }
=======
    "http://localhost:3000/api/v1/users/signup",
    { name, email, password, passwordConfirm },
    { withCredentials: true },
>>>>>>> b4fdd8b (sync commit)
  );

  if (error) return new Error(error.message);
  return data.data;
}

export async function updateUser(updatedData) {
  const { data, error } = await axios.patch(
<<<<<<< HEAD
    'http://localhost:3000/api/v1/users/updateMe',
    updatedData,
    { withCredentials: true }
=======
    "http://localhost:3000/api/v1/users/updateMe",
    updatedData,
    { withCredentials: true },
>>>>>>> b4fdd8b (sync commit)
  );

  if (error) return new Error(error.message);
  return data.data;
}

export async function deleteUser() {
  const { data, error } = await axios.delete(
<<<<<<< HEAD
    'http://localhost:3000/api/v1/users/deleteMe',
    { withCredentials: true }
=======
    "http://localhost:3000/api/v1/users/deleteMe",
    { withCredentials: true },
>>>>>>> b4fdd8b (sync commit)
  );

  if (error) return new Error(error.message);
  return { status: data.status };
}

export async function logout() {
  const { data, error } = await axios.get(
<<<<<<< HEAD
    'http://localhost:3000/api/v1/users/logout',
    { withCredentials: true }
=======
    "http://localhost:3000/api/v1/users/logout",
    { withCredentials: true },
>>>>>>> b4fdd8b (sync commit)
  );

  if (error) return new Error(error.message);
  return { status: data.status };
}

export async function getCurrentUser() {
  const { data, error } = await axios.get(
<<<<<<< HEAD
    'http://localhost:3000/api/v1/users/me',
    { withCredentials: true }
=======
    "http://localhost:3000/api/v1/users/me",
    { withCredentials: true },
>>>>>>> b4fdd8b (sync commit)
  );

  if (error) return new Error(error.message);
  return data.data;
}
