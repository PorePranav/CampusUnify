import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser as deleteUserApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useDelete() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: deleteUser, isLoading } = useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate('/login', { replace: true });
      toast.success('Deleted your account successfully');
    },
  });

  return { deleteUser, isLoading };
}
