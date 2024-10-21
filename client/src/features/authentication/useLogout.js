import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate('/login');
      toast.success('Logged out successfully');
    },
    onError: (error) => {
      console.error('Logout error:', error);
      toast.error('Failed to logout. Please try again.');
    },
  });

  return { logout, isLoading };
}