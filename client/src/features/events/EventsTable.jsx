import Spinner from "./../../ui/Spinner";
import { useEvents } from "./useEvents";

export default function EventsTable() {
  const { events = [], isLoading } = useEvents();

  if (isLoading) return <Spinner />;

  return <div>Events Table</div>;
}
