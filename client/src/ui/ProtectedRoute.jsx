<<<<<<< HEAD
import { Outlet, Navigate } from 'react-router-dom';
import Spinner from './Spinner';
import { useUser } from '../features/authentication/useUser';
=======
import { Outlet, Navigate } from "react-router-dom";
import Spinner from "./Spinner";
import { useUser } from "../features/authentication/useUser";
>>>>>>> b4fdd8b (sync commit)

export default function ProtectedRoute() {
  const { isLoading, user } = useUser();

  if (isLoading) return <Spinner />;

  return user ? <Outlet /> : <Navigate to="/login" />;
}
