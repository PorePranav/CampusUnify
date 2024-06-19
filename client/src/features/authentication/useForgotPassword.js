import { useMutation } from '@tanstack/react-query';
import { forgotPassword as forgotPasswordApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useForgotPassword() {
  const { mutate: forgotPassword, isLoading } = useMutation({
    mutationFn: (email) => forgotPasswordApi(email),
    onSuccess: () => {
      toast.success('An email was sent to to you if your account exists');
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  return { forgotPassword, isLoading };
}
