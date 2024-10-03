import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ name, email, role, password, passwordConfirm }) =>
      signupApi({ name, email, role, password, passwordConfirm }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      navigate('/events');
      toast.success('Account created successfully');
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  return { signup, isLoading };
}
