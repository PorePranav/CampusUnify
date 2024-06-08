import { Outlet, Navigate } from 'react-router-dom';
import Spinner from './Spinner';
import { useUser } from '../features/authentication/useUser';

export default function ProtectedRouteUser({ children }) {
  const { isLoading, user } = useUser();
  if (isLoading) return <Spinner />;

  return user.role === 'user' ? (
    <>
      {children}
      <Outlet />
    </>
  ) : (
    <Navigate to="/events" />
  );
}
