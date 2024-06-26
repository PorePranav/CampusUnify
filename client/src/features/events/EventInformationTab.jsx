import { formatShortDate, formatShortTime } from '../../utils/helpers';

export default function EventInformationTab({ event }) {
  console.log(event.date);

  return (
    <div className="mt-4 p-2">
      <p className="text-2xl font-bold">{event.description}</p>
      <div className="mt-4">
        <p className="text-xl font-semibold pb-4 border-b-2 border-primary-100">
          Date and Time
        </p>
        <div className="flex justify-between mt-4">
          <div className="w-1/2">
            <p className="text-primary-900">Start Date</p>
            <p className="text-lg">{formatShortDate(event.date)}</p>
          </div>
          <div className="w-1/2">
            <p className="text-primary-900">Start Time</p>
            <p className="text-lg">{formatShortTime(event.date)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
