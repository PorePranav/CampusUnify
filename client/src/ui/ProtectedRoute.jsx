import { Outlet, Navigate } from 'react-router-dom';
import Spinner from './Spinner';
import { useUser } from '../features/authentication/useUser';

export default function ProtectedRoute({ children }) {
  const { isLoading, user } = useUser();
  if (isLoading) return <Spinner />;
  return user ? (
    <>
      {children}
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
}
