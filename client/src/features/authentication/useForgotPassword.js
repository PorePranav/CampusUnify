import { useMutation } from '@tanstack/react-query';
import { forgotPassword as forgotPasswordApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useForgotPassword() {
  const { mutate: forgotPassword, isLoading } = useMutation({
    mutationFn: forgotPasswordApi,
    onMutate: () => {
      toast.loading('Sending email...', { id: 'forgotPasswordLoading' });
    },
    onSuccess: (data) => {
      toast.dismiss('forgotPasswordLoading');
      toast.success(data.message || 'Password reset email sent successfully');
    },
    onError: (error) => {
      toast.dismiss('forgotPasswordLoading');
      toast.error(error.message || 'Failed to send password reset email');
    },
  });

  return { forgotPassword, isLoading };
}