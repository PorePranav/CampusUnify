import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from './useSignup';
import Logo from '../../ui/Logo';
import PasswordInput from '../../ui/PasswordInput';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    role: '',
  });
  const { signup, isLoading } = useSignup();

  function handleSubmit(e) {
    e.preventDefault();
    signup({
      name: formData.name,
      email: formData.email,
      role: formData.role,
      password: formData.password,
      passwordConfirm: formData.passwordConfirm,
    });
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  return (
    <div className="flex flex-col w-96 mx-auto items-center bg-primary-50 p-8 rounded-lg shadow-md">
      <Logo />
      <h1 className="mt-4 text-4xl font-bold">CampusUnify</h1>
      <p className="mt-2 font-semibold">Create A New Account</p>
      <form className="mt-4 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          id="name"
          required
          className="border p-3 rounded-lg placeholder-primary-900"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          required
          className="border p-3 rounded-lg placeholder-primary-900"
          onChange={handleChange}
        />
        <PasswordInput
          id="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <PasswordInput
          id="passwordConfirm"
          placeholder="Confirm Password"
          value={formData.passwordConfirm}
          onChange={handleChange}
        />
        <select
          id="role"
          className="border p-3 rounded-lg bg-white"
          required
          onChange={handleChange}
        >
          <option className="text-primary-900">Select...</option>
          <option value="club" className="text-primary-900">
            Club
          </option>
          <option value="user">Student</option>
        </select>
        <button
          disabled={isLoading}
          className="bg-primary-600 font-bold text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          onClick={(e) => handleSubmit(e)}
        >
          Sign Up
        </button>
      </form>
      <Link to="/login" className="mt-4 text-sm">
        <span className="text-primary-900 underline">
          Already have an account?
        </span>
      </Link>
    </div>
  );
}
