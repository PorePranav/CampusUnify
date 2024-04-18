import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../../services/apiEvents";

export function useEvents() {
  const {
    isLoading,
    data: events,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  return { isLoading, error, events };
}
