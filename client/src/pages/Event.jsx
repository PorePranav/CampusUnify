import EventDetailClub from '../features/events/club/info/EventDetailClub';
import EventDetailUser from '../features/events/user/EventDetailUser';
import { useUser } from '../features/authentication/useUser';

export default function Event() {
  const { user } = useUser();

  if (user.role === 'club') return <EventDetailClub />;
  else return <EventDetailUser />;
}
