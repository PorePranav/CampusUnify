import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteFromCart as deleteFromCartApi } from '../../services/apiCart';

export function useDeleteCartItem() {
  const queryClient = useQueryClient();

  const { mutate: deleteFromCart, isLoading: isDeleting } = useMutation({
    mutationFn: (eventId) => deleteFromCartApi(eventId),
    onSuccess: () => {
      toast.success('Event deleted from cart');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { deleteFromCart, isDeleting };
}
