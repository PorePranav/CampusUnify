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
import Event from './pages/Event';
import ForgotPassword from './features/authentication/ForgotPassword';
import PageNotFound from './ui/PageNotFound';
import ProtectedRouteUser from './ui/ProtectedRouteUser';
import Cart from './pages/Cart';
import MyRegistrations from './pages/MyRegistrations';

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
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:eventId" element={<Event />} />
              <Route path="/profile" element={<Profile />} />
              <Route element={<ProtectedRouteUser />}>
                <Route path="/cart" element={<Cart />} />
                <Route path="/registration" element={<MyRegistrations />} />
              </Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </GlobalStyles>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: '#ffffff',
            color: '#374151',
          },
        }}
      />
    </QueryClientProvider>
  );
}
