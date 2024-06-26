import {
  formatCurrency,
  formatShortDate,
  formatShortTime,
} from '../../utils/helpers';

export default function EventInformationTab({ event }) {
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
      <div className="mt-8">
        <p className="text-xl font-semibold pb-4 border-b-2 border-primary-100">
          Registration
        </p>
        <div className="grid grid-cols-[20%_80%] mt-4 items-end">
          <p className="text-primary-900">Cost</p>
          <p className="text-lg">{formatCurrency(event.eventCharges)}</p>
        </div>
        <div className="grid grid-cols-[20%_80%] mt-4 items-end">
          <p className="text-primary-900">Capacity</p>
          <p className="text-lg">{event.maxCapacity}</p>
        </div>
      </div>
    </div>
  );
}
