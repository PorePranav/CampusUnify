import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import GlobalStyles from './styles/GlobalStyles';
import Header from './ui/Header';

import ForgotPassword from './features/authentication/ForgotPassword';
import Login from './features/authentication/Login';
import Profile from './features/authentication/Profile';
import ResetPassword from './features/authentication/ResetPassword';
import Signup from './features/authentication/Signup';
import Cart from './pages/Cart';
import Event from './pages/Event';
import Events from './pages/Events';
import LandingPage from './pages/LandingPage';
import MyRegistrations from './pages/MyRegistrations';
import PageNotFound from './ui/PageNotFound';
import ProtectedRoute from './ui/ProtectedRoute';
import ProtectedRouteUser from './ui/ProtectedRouteUser';

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
            <Route
              path="/reset-password/:tokenId"
              element={<ResetPassword />}
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route element={<ProtectedRoute />}>
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
            // TODO fix theme styling for toast
            backgroundColor: '#ffffff',
            color: '#374151',
          },
        }}
      />
    </QueryClientProvider>
  );
}
