import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useLogin } from './useLogin';
import Logo from '../../ui/Logo';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.email || !formData.password) return;
    login(
      { email: formData.email, password: formData.password },
      {
        onSettled: () => {
          setFormData({ email: '', password: '' });
          navigate('/dashboard');
        },
      }
    );
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  return (
    <div className="flex flex-col w-96 mx-auto items-center">
      <Logo />
      <h1>Sign In To Your Account</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={isLoading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
