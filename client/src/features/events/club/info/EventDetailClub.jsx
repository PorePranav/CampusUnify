import EventInformationCard from './EventInformationCard';
import EventDaysCard from '../days/EventDaysCard';
import EventBookingsCard from '../bookings/EventBookingsCard';
import PageNotFound from '../../../../ui/PageNotFound';
import Spinner from '../../../../ui/Spinner';
import { useMoveBack } from '../../../../hooks/useMoveBack';
import { HiArrowLeft } from 'react-icons/hi2';

import { useEvent } from '../../useEvent';
import { useState } from 'react';

export default function EventDetailClub() {
  const moveBack = useMoveBack();
  const { isLoading, error, event } = useEvent();
  const [activeTab, setActiveTab] = useState('info');

  if (isLoading) return <Spinner />;
  if (!isLoading && !event) return <PageNotFound />;

  return (
    <div className="w-[80%] mx-auto mt-6 pb-6">
      <button onClick={() => moveBack()}>
        <div className="flex gap-2 items-center bg-primary-orange text-white font-semibold rounded-md px-2 py-1">
          <HiArrowLeft size={18} />
          Go Back
        </div>
      </button>

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
