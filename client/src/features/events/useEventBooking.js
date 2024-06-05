import { useQuery } from '@tanstack/react-query';
import { getEventSingleBooking } from '../../services/apiEvents';

export function useEventBooking({ eventId, bookingId }) {
  const {
    isLoading,
    data: eventBooking,
    error,
  } = useQuery({
    queryKey: ['eventBooking'],
    queryFn: () => getEventSingleBooking({ eventId, bookingId }),
  });

  return { isLoading, eventBooking, error };
}
