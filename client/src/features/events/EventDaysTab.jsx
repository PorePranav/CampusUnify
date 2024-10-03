import { useEventDays } from './useEventDays';
import { useUser } from '../authentication/useUser';
import SpinnerMini from '../../ui/SpinnerMini';
import { HiCalendar } from 'react-icons/hi2';
import { formatShortDate } from '../../utils/helpers';
import AddEventDay from './AddEventDay';
import EventDayMenu from './EventDayMenu';

export default function EventDaysTab({ event }) {
  const { eventDays, isLoading } = useEventDays(event._id);
  const { user } = useUser();

  if (isLoading) return <SpinnerMini />;

  return (
    <div className="mt-4">
      <p className="text-xl font-semibold">Event Days</p>
      <div className="flex flex-col gap-4 mt-4">
        {eventDays.length === 0 ? (
          <p className="text-lg">No days have been added for this event yet!</p>
        ) : (
          eventDays.map((eventDay) => (
            <div
              key={eventDay._id}
              className="flex justify-between items-center"
            >
              <div className="flex gap-4">
                <div className="p-3 bg-skin rounded-lg">
                  <HiCalendar size={32} />
                </div>
                <div className="flex flex-col gap-1">
                  <p>Day {eventDay.serialNumber}</p>
                  <p>{formatShortDate(eventDay.date)}</p>
                </div>
              </div>
              {user.role === 'club' && (
                <EventDayMenu event={event} eventDay={eventDay} />
              )}
            </div>
          ))
        )}
      </div>
      {user.role === 'club' && (
        <div className="flex justify-center">
          <AddEventDay event={event} />
        </div>
      )}
    </div>
  );
}
