import Spinner from '../ui/Spinner';
import EventsClub from '../features/events/club/EventsClub';
import { useUser } from './../features/authentication/useUser';
import EventsUser from '../features/events/user/EventsUser';

export default function Events() {
  const { user, isLoading } = useUser();
  if (isLoading) return <Spinner />;

  return (
    <div className="w-[80%] mx-auto mt-6">
      {user.role === 'club' ? <EventsClub /> : <EventsUser />}
    </div>
  );
}
