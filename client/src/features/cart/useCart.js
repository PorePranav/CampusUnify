import { useQuery } from '@tanstack/react-query';
import { getCart } from '../../services/apiCart';

export function useCart({ userId }) {
  const {
    isLoading,
    data: cart,
    error,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getCart(userId),
  });

  return { isLoading, error, cart };
}
