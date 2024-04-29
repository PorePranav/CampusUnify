import Spinner from "../ui/Spinner";
import EventsClub from "../features/events/EventsClub";
import { useUser } from "./../features/authentication/useUser";

export default function Events() {
  const { user, isLoading } = useUser();

  if (isLoading) return <Spinner />;

  if (user.role === "club")
    return (
      <div className="w-[80%] mx-auto mt-6">
        <EventsClub />
      </div>
    );

  return <></>;
}
