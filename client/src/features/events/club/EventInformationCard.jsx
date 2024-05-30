import { HiPencil } from 'react-icons/hi2';
export default function EventInformationCard({ event }) {
  return (
    <div className="mt-4">
      <button className="bg-primary-orange px-4 py-2 text-white font-bold rounded-lg flex items-center">
        <HiPencil className="mr-1 h-4 w-4" /> Edit Event
      </button>
      <h2 className="font-bold text-2xl mt-4">{event.name}</h2>
      <div className="mt-2">
        <p className="text-xl font-bold">About the event</p>
        <p>{event.description}</p>
      </div>
    </div>
  );
}
