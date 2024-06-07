import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteEventDay as deleteEventDayApi } from '../../services/apiEvents';
import toast from 'react-hot-toast';

export default function useDeleteEventDay() {
  const queryClient = useQueryClient();

  const { mutate: deleteEventDay, isLoading: isDeleting } = useMutation({
    mutationFn: ({ eventId, dayId }) => deleteEventDayApi({ eventId, dayId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventDays'] });
      toast.success('Event day deleted successfully');
    },
    onError: () => toast.error('There was an error deleting the event day'),
  });

  return { deleteEventDay, isDeleting };
}
