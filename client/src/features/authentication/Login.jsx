import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageLayout from '../../styles/PageLayout';
import Logo from '../../ui/Logo';
import PasswordInput from '../../ui/PasswordInput';
import { useLogin } from './useLogin';
import { useUser } from './useUser';

export default function Login() {
  const { user } = useUser();
  const navigate = useNavigate();

  if (user) navigate('/events');

  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    login(formData);
  }

  function handleChange(e) {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  }

  return (
    <PageLayout>
      <div className="flex flex-col w-[600px] mx-auto items-center bg-primary-50 p-8 rounded-lg shadow-md">
        <Logo />
        <h1 className="mt-4 text-4xl font-bold text-primary-900">
          CampusUnify
        </h1>
        <p className="mt-2 font-semibold text-primary-900">
          Sign In To Your Account
        </p>

        <form
          onSubmit={(e) => handleSubmit(e)}
          className="mt-4 flex flex-col gap-4 w-full"
        >
          <input
            type="email"
            placeholder="Email"
            id="email"
            required
            className="border p-3 rounded-lg placeholder-primary-900 w-full text-primary-900"
            onChange={handleChange}
            value={formData.email}
          />
          <PasswordInput
            id="password"
            required
            className="border p-3 rounded-lg placeholder-primary-900 w-full text-primary-900"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <Link
            to="/forgot-password"
            className="text-sm underline text-primary-900"
          >
            Forgot Password?
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary-600 font-bold text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            onClick={(e) => handleSubmit(e)}
          >
            Sign In
          </button>
        </form>

        <Link to="/signup" className="mt-4 text-primary-900 underline text-sm">
          Don&apos;t have an account?
        </Link>
      </div>
    </PageLayout>
  );
}
