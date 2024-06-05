import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteEventBooking as deleteEventBookingApi } from '../../services/apiEvents';
import toast from 'react-hot-toast';

export default function useDeleteEvent() {
  const queryClient = useQueryClient();

  const { mutate: deleteEventBooking, isLoading: isDeleting } = useMutation({
    mutationFn: ({ eventId, bookingId }) =>
      deleteEventBookingApi({ eventId, bookingId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventBookings'] });
      toast.success('Booking deleted successfully');
    },
    onError: () => {
      toast.error('There was an error deleting the booking');
    },
  });

  return { deleteEventBooking, isDeleting };
}
