import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEvent as createEventApi } from "../../services/apiEvents";

export function useCreateEvent() {
  const queryClient = useQueryClient();

  const { mutate: createEvent, isLoading: isCreating } = useMutation({
    mutationFn: (newEvent) => createEventApi(newEvent),
    onSuccess: () => {
      toast.success("New event created");
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createEvent, isCreating };
}
