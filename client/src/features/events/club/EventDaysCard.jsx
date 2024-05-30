import { HiPlusCircle } from 'react-icons/hi';

export default function EventDaysCard({ event }) {
  return (
    <div className="mt-4">
      <button className="bg-primary-orange text-white font-bold px-4 py-2 rounded-md flex items-center gap-2">
        <HiPlusCircle />
        Add Event Day
      </button>
    </div>
  );
}
