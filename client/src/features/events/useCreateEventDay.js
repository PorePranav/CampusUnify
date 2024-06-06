import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createEventDay as createEventDayApi } from '../../services/apiEvents';

export function useCreateEventDay() {
  const queryClient = useQueryClient();

  const { mutate: createEventDay, isLoading: isCreating } = useMutation({
    mutationFn: ({ eventId, newEventDay }) =>
      createEventDayApi({ eventId, newEventDay }),
    onSuccess: () => {
      toast.success('New event day created');
      queryClient.invalidateQueries({ queryKey: ['eventDays'] });
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  return { createEventDay, isCreating };
}
