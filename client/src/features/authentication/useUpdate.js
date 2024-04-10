import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser as updateUserApi } from '../../services/apiAuth.js';
import toast from 'react-hot-toast';

export function useUpdate() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: (updatedData) => updateUserApi(updatedData),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      queryClient.invalidateQueries({ active: true });
      toast.success('User updated successfully');
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  return { updateUser, isLoading };
}
