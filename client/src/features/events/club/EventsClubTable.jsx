import EventClubCard from "./EventClubCard";

export default function EventsClubTable({ events }) {
  return (
    <div className="w-3/4">
      <div className="grid grid-cols-3 mt-4 gap-4">
        {events.map((event) => (
          <EventClubCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}
