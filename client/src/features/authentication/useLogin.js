import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth.js';
import toast from 'react-hot-toast';

export function useLogin() {
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      console.log(user);
      queryClient.setQueryData(['user'], user.user);
    },
    onError: (err) => {
      console.log('Error: ', err);
      toast.error('Provided an invalid email or password');
    },
  });

  return { login, isLoading };
}
