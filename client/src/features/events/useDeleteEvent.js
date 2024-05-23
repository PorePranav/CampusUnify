import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEvent as deleteEventApi } from "../../services/apiEvents";
import toast from "react-hot-toast";

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  const { mutate: deleteEvent, isLoading } = useMutation({
    mutationFn: (eventId) => deleteEventApi(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event deleted successfully");
    },
    onError: () => {
      toast.error("There was an error deleting the event");
    },
  });

  return { deleteEvent, isLoading };
}
