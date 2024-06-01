import EventInformationCard from './EventInformationCard';
import EventDaysCard from './EventDaysCard';
import EventBookingsCard from './EventBookingsCard';
import PageNotFound from '../../../ui/PageNotFound';
import Spinner from '../../../ui/Spinner';

import { useEvent } from '../useEvent';
import { useState } from 'react';

export default function EventDetailClub() {
  const { isLoading, error, event } = useEvent();
  const [activeTab, setActiveTab] = useState('info');

  if (isLoading) return <Spinner />;
  if (!isLoading && !event) return <PageNotFound />;

  return (
    <div className="w-[80%] mx-auto mt-6 pb-6">
      <img
        className="w-full h-128 rounded-lg"
        src={event.coverImage}
        alt={`Cover image for ${event.name}`}
      />
      <div className="mt-4">
        <div className="flex gap-4 mt-4">
          <button
            className={`px-4 py-2 font-bold rounded-md hover:bg-primary-orange hover:text-white ${
              activeTab === 'info'
                ? 'bg-primary-orange text-white'
                : 'bg-[#dadada]'
            }`}
            onClick={() => setActiveTab('info')}
          >
            Event Info
          </button>
          <button
            className={`px-4 py-2 font-bold rounded-md hover:bg-primary-orange hover:text-white ${
              activeTab === 'days'
                ? 'bg-primary-orange text-white'
                : 'bg-[#dadada]'
            }
            `}
            onClick={() => setActiveTab('days')}
          >
            Event Days
          </button>
          <button
            className={`px-4 py-2 font-bold rounded-md hover:bg-primary-orange hover:text-white
           ${
             activeTab === 'registrations'
               ? 'bg-primary-orange text-white'
               : 'bg-[#dadada]'
           } 
            `}
            onClick={() => setActiveTab('registrations')}
          >
            Event Registrations
          </button>
        </div>
        {activeTab === 'info' && <EventInformationCard event={event} />}
        {activeTab === 'days' && <EventDaysCard event={event} />}
        {activeTab === 'registrations' && <EventBookingsCard event={event} />}
      </div>
    </div>
  );
}
