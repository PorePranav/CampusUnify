import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editEventDay as editEventDayApi } from '../../services/apiEvents';
import toast from 'react-hot-toast';

export function useEditEventDay() {
  const queryClient = useQueryClient();

  const { mutate: editEventDay, isLoading: isEditing } = useMutation({
    mutationFn: ({ eventId, dayId, newEventDayData }) =>
      editEventDayApi({ eventId, dayId, newEventDayData }),
    onSuccess: () => {
      toast.success('Event day edited successfully');
      queryClient.invalidateQueries({ queryKey: ['eventDays'] });
    },
    onError: () => toast.error('There was an error editing the event day'),
  });

  return { editEventDay, isEditing };
}
