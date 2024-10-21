import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageLayout from '../../styles/PageLayout';
import Logo from '../../ui/Logo';
import { useForgotPassword } from './useForgotPassword';
import { useUser } from './useUser';

export default function ForgotPassword() {
  const { forgotPassword, isLoading } = useForgotPassword();
  const { user } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  if (user) navigate('/events');

  const [formData, setFormData] = useState({ email: '' });

  
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      await forgotPassword({ email: formData.email });
    } catch (error) {
      console.error('Forgot password error:', error);
      setError(error.message || 'An error occurred. Please try again.');
    }
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
          Reset Your Password
        </p>

        {error && (
          <p className="text-red-500 mt-2">{error}</p>
        )}

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
            {isLoading ? 'Sending...' : 'Mail Me'}
          </button>
        </form>

        <Link to="/signup" className="mt-4 text-primary-900 underline text-sm">
          Dont have an account?
        </Link>
      </div>
    </PageLayout>
  );
}