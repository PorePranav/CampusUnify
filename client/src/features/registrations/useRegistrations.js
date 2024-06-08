import { useQuery } from '@tanstack/react-query';
import { getRegistrations } from '../../services/apiRegistrations';

export function useRegistrations() {
  const {
    isLoading,
    data: registrations,
    error,
  } = useQuery({
    queryKey: ['myRegistrations'],
    queryFn: getRegistrations,
  });

  return { isLoading, error, registrations };
}
