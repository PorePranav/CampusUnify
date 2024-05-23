import EventClubCard from "../EventCard";

export default function EventsClubTable({ events }) {
  return (
    <div>
      <div className="grid grid-cols-4 mt-4 gap-4">
        {events.map((event) => (
          <EventClubCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}
