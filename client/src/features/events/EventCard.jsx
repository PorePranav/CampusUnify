import { formatCurrency, formatDate } from '../../utils/helpers';
import { useUser } from '../authentication/useUser';
import EventDetailMenu from './club/info/EventDetailMenu';
import { HiBanknotes, HiCalendarDays, HiCube } from 'react-icons/hi2';

export default function EventClubCard({ event }) {
  const { user } = useUser();

  return (
    <div className="bg-white p-3 rounded-md shadow-md">
      <img
        src={event.cardImage}
        alt={`cardImage for ${event.name} event`}
        className="h-72"
      />
      <div className="flex gap-2 mt-2">
        <div className="flex flex-col gap-1 text-sm">
          <div className="flex gap-4">
            <HiCube className="h-6 w-6 fill-primary-orange" />
            <p>{event.name}</p>
          </div>
          <div className="flex gap-4">
            <HiCalendarDays className="h-6 w-6 fill-primary-orange" />
            <p>{formatDate(event.date)}</p>
          </div>
          <div className="flex gap-4">
            <HiBanknotes className="h-6 w-6 fill-primary-orange" />
            <p className="font-sono">{formatCurrency(event.eventCharges)}</p>
          </div>
        </div>

        {user.role === 'club' && <EventDetailMenu event={event} />}
      </div>
    </div>
  );
}
