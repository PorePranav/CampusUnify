import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { addToCart as addToCartApi } from '../../services/apiCart';

export function useAddCartItem() {
  const queryClient = useQueryClient();

  const { mutate: addToCart, isLoading: isCreating } = useMutation({
    mutationFn: (eventId) => addToCartApi(eventId),
    onSuccess: () => {
      toast.success('Event added to cart');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { addToCart, isCreating };
}
