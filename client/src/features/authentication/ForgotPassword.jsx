import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import PageLayout from '../../styles/PageLayout';
import Logo from '../../ui/Logo';
import { useForgotPassword } from './useForgotPassword';
import { useUser } from './useUser';

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Handles the forgot password flow.
 *
 * @returns {ReactElement} The JSX Element
 */
/******  a6d1db75-04c8-4b15-a43a-cb3103c217af  *******/export default function ForgotPassword() {
  const { forgotPassword, isLoading } = useForgotPassword();
  const { user } = useUser();
  const navigate = useNavigate();

  if (user) navigate('/events');

  const [formData, setFormData] = useState({ email: '' });

  function handleSubmit(e) {
    e.preventDefault();
    forgotPassword(formData.email);
  }

  function handleChange(e) {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  }

  return (
    <PageLayout>
      <div className="flex flex-col w-full max-w-md mx-auto items-center bg-primary-50 p-8 rounded-lg shadow-md">
        <Logo />
        <h1 className="mt-4 text-4xl font-bold text-primary-900">
          CampusUnify
        </h1>
        <p className="mt-2 font-semibold text-primary-900">
          Reset Your Password
        </p>

        <form
          onSubmit={handleSubmit}
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
          <Link to="/login" className="text-sm underline text-primary-900">
            Remember Password?
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary-600 font-bold text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            Mail Me
          </button>
        </form>

        <Link to="/signup" className="mt-4 text-primary-900 underline text-sm">
          Don&apos;t have an account?
        </Link>
      </div>
    </PageLayout>
  );
}
