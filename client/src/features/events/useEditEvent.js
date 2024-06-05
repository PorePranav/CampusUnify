import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editEvent as editEventApi } from '../../services/apiEvents';
import { toast } from 'react-hot-toast';

export function useEditEvent() {
  const queryClient = useQueryClient();

  const { mutate: editEvent, isLoading: isEditing } = useMutation({
    mutationFn: ({ eventId, newEventData }) =>
      editEventApi({ eventId, newEventData }),
    onSuccess: () => {
      toast.success('Event edited successfully!');
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: () => toast.error('There was an error editing the event'),
  });

  return { editEvent, isEditing };
}
