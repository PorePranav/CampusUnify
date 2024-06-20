import { useMutation } from '@tanstack/react-query';
import { forgotPassword as forgotPasswordApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useForgotPassword() {
  const { mutate: forgotPassword, isLoading } = useMutation({
    mutationFn: (email) => forgotPasswordApi(email),
    onMutate: () => {
      toast.loading('Sending email...', {
        id: 'forgotPasswordLoading',
      });
    },
    onSuccess: () => {
      toast.dismiss('forgotPasswordLoading');
      toast.success('An email was sent to you');
    },
    onError: (err) => {
      toast.dismiss('forgotPasswordLoading');
      toast.error(err.response?.data?.message || 'An error occurred');
    },
  });

  return { forgotPassword, isLoading };
}
