import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { clearCart as clearCartApi } from '../../services/apiCart';

export function useClearCart() {
  const queryClient = useQueryClient();

  const { mutate: clearCart, isLoading: isClearing } = useMutation({
    mutationFn: () => clearCartApi(),
    onSuccess: () => {
      toast.success('Cart cleared successfully');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { clearCart, isClearing };
}
