import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { verifyEmail as verifyEmailApi } from '../../services/apiAuth.js';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

export function useVerifyEmail() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: verifyEmail, isLoading: isVerifying } = useMutation({
    mutationFn: verifyEmailApi,
    onSuccess: (data) => {
      toast.success('Email verified successfully');
      queryClient.setQueryData(['user'], data.user);
      navigate('/events');
    },
    onError: (err) => {
      console.error('Verification error:', err);
      toast.error(err.response?.data?.message || 'An error occurred during verification');
    },
  });

  return { verifyEmail, isVerifying };
}
