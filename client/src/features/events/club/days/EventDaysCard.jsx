import SpinnerMini from '../../../../ui/SpinnerMini';
import { useEventDays } from '../../useEventDays';
import AddEventDay from './AddEventDay';

export default function EventDaysCard({ event }) {
  const { isLoading, eventDays } = useEventDays(event._id);

  return (
    <div className="mt-4">
      <p className="text-2xl mt-4">Event Days</p>
      <AddEventDay event={event} />
      <div className="mt-4 grid grid-cols-[0.5fr_1fr_2fr_1fr_4rem] p-2 rounded-t-md font-bold bg-[#dadada]">
        <p>Day</p>
        <p>Date</p>
        <p>Description</p>
        <p>Venue</p>
        <p>Options</p>
      </div>
      {isLoading ? (
        <SpinnerMini />
      ) : (
        eventDays.map((eventDay) => (
          <div
            className="grid grid-cols-[0.5fr_1fr_2fr_1fr_4rem] p-2 border-b border-r border-l items-center"
            key={eventDay._id}
          >
            <p>{eventDay.serialNumber}</p>
            <p>{new Date(eventDay.date).toLocaleDateString()}</p>
            <p>{eventDay.description}</p>
            <p>{eventDay.venue}</p>
            <p>Options</p>
          </div>
        ))
      )}
    </div>
  );
}
