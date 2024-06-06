import { useQuery } from '@tanstack/react-query';
import { getEventDays } from '../../services/apiEvents';

export function useEventDays(eventId) {
  const {
    isLoading,
    data: eventDays,
    error,
  } = useQuery({
    queryKey: ['eventDays'],
    queryFn: () => getEventDays(eventId),
  });

  return { isLoading, error, eventDays };
}
