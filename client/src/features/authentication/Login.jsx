import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from './useLogin';
import Logo from '../../ui/Logo';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.email || !formData.password) return;
    login({ email: formData.email, password: formData.password });
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  return (
    <div className="flex flex-col w-96 mx-auto items-center bg-secondary-orange p-8 rounded-lg shadow-md">
      <Logo />
      <h1 className="mt-4 font-semibold">Sign In To Your Account</h1>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={isLoading}
          className="bg-primary-orange font-bold text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          Sign In
        </button>
      </form>
      <div className="flex gap-8 mt-5 justify-between text-sm">
        <Link to="/signup">
          <span className="text-blue-700">Don't have an account?</span>
        </Link>
        <Link to="/forgot-password">
          <span className="text-blue-700">Forgot password?</span>
        </Link>
      </div>
    </div>
  );
}
