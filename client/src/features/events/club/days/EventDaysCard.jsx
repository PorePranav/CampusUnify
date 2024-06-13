import SpinnerMini from '../../../../ui/SpinnerMini';
import { useUser } from '../../../authentication/useUser';
import { useEventDays } from '../../useEventDays';
import AddEventDay from './AddEventDay';
import DayDetailMenu from './DayDetailMenu';

export default function EventDaysCard({ event }) {
  const { isLoading, eventDays } = useEventDays(event._id);
  const { user } = useUser();

  if (isLoading) return <SpinnerMini />;

  return (
    <>
      <div className="mt-4">
        <p className="text-2xl mt-4">Event Days</p>
        <AddEventDay event={event} />
        {eventDays.length === 0 ? (
          <p className="mt-4">No Event Days Added!</p>
        ) : (
          <>
            <div className="mt-4 grid grid-cols-[0.5fr_1fr_2fr_1fr_4rem] p-2 rounded-t-md font-bold bg-[#dadada]">
              <p>Day</p>
              <p>Date</p>
              <p>Description</p>
              <p>Venue</p>
              {user.role === 'club' && <p>Options</p>}
            </div>
            {eventDays.map((eventDay) => (
              <div
                className="grid grid-cols-[0.5fr_1fr_2fr_1fr_4rem] p-2 border-b border-r border-l items-center"
                key={eventDay._id}
              >
                <p>{eventDay.serialNumber}</p>
                <p>{new Date(eventDay.date).toLocaleDateString()}</p>
                <p>{eventDay.description}</p>
                <p>{eventDay.venue}</p>
                {user.role === 'club' && (
                  <DayDetailMenu event={event} day={eventDay} />
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
