import { useQuery } from '@tanstack/react-query';
import { getLatestEvents } from '../../services/apiEvents';

export function useLatestEvents() {
  const {
    isLoading,
    data: latestEvents,
    error,
  } = useQuery({
    queryKey: ['latestEvents'],
    queryFn: getLatestEvents,
  });

  return { isLoading, error, latestEvents };
}
