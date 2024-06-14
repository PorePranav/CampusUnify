import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from './useSignup';
import Logo from '../../ui/Logo';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const { signup, isLoading } = useSignup();

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !formData.email ||
      !formData.password ||
      !formData.name ||
      !formData.passwordConfirm
    )
      return;
    signup({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      passwordConfirm: formData.passwordConfirm,
    });
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  return (
    <div className="flex flex-col w-96 mx-auto items-center bg-secondary-orange p-8 rounded-lg shadow-md">
      <Logo />
      <h1 className="mt-4 font-semibold">Create A New Account</h1>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          id="name"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          id="passwordConfirm"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={isLoading}
          className="bg-primary-orange font-bold text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          onClick={(e) => handleSubmit(e)}
        >
          Sign Up
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
