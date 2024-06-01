import { useQuery } from '@tanstack/react-query';
import { getEventBookings } from '../../services/apiEvents';

export function useEventBookings(eventId) {
  const {
    isLoading,
    data: eventBookings,
    error,
  } = useQuery({
    queryKey: ['eventBookings', eventId],
    queryFn: () => getEventBookings(eventId),
  });

  return { isLoading, error, eventBookings };
}
