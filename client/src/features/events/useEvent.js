import { useQuery } from '@tanstack/react-query';
import { getEvent } from '../../services/apiEvents';
import { useParams } from 'react-router-dom';

export function useEvent() {
  const { eventId } = useParams();

  const {
    isLoading,
    data: event,
    error,
  } = useQuery({
    queryKey: ['event'],
    queryFn: () => getEvent(eventId),
  });

  return { isLoading, error, event };
}
