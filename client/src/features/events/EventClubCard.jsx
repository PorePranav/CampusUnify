import { formatCurrency, formatDate } from "../../utils/helpers";

export default function EventClubCard({ event }) {
  return (
    <div className="bg-white p-3 rounded-md shadow-md">
      <img src={event.cardImage} alt={`cardImage for ${event.name} event`} />
      <div className="flex flex-col gap-1 mt-2">
        <p>{event.name}</p>
        <p>{formatDate(event.days[0].date)}</p>
        <p className="font-sono">{formatCurrency(event.eventCharges)}</p>
      </div>
    </div>
  );
}
