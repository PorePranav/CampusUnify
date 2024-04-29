<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import Header from './ui/Header';
import GlobalStyles from './styles/GlobalStyles';

import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import ProtectedRoute from './ui/ProtectedRoute';
import Profile from './features/authentication/Profile';
import Login from './features/authentication/Login';
import Signup from './features/authentication/Signup';
import ForgotPassword from './features/authentication/ForgotPassword';
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "./ui/Header";
import GlobalStyles from "./styles/GlobalStyles";

import LandingPage from "./pages/LandingPage";
import Events from "./pages/Events";
import ProtectedRoute from "./ui/ProtectedRoute";
import Profile from "./features/authentication/Profile";
import Login from "./features/authentication/Login";
import Signup from "./features/authentication/Signup";
import ForgotPassword from "./features/authentication/ForgotPassword";
>>>>>>> b4fdd8b (sync commit)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <GlobalStyles>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route element={<ProtectedRoute />}>
<<<<<<< HEAD
              <Route path="dashboard" element={<Dashboard />} />
=======
>>>>>>> b4fdd8b (sync commit)
              <Route path="events" element={<Events />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalStyles>
      <Toaster
        position="top-center"
        gutter={12}
<<<<<<< HEAD
        containerStyle={{ margin: '8px' }}
=======
        containerStyle={{ margin: "8px" }}
>>>>>>> b4fdd8b (sync commit)
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
<<<<<<< HEAD
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: '#ffffff',
            color: '#374151',
=======
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#ffffff",
            color: "#374151",
>>>>>>> b4fdd8b (sync commit)
          },
        }}
      />
    </QueryClientProvider>
  );
}
