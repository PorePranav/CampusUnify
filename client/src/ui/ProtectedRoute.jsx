import { Outlet, Navigate } from 'react-router-dom';
import Spinner from './Spinner';
import { useUser } from '../features/authentication/useUser';

export default function ProtectedRoute() {
  const { isLoading, user } = useUser();

  if (isLoading) return <Spinner />;

  return user ? <Outlet /> : <Navigate to="/login" />;
}
