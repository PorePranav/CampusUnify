import { useState,useContext } from 'react';
import { useEvent } from '../features/events/useEvent';
import PageLayout from '../styles/PageLayout';
import PageNotFound from '../ui/PageNotFound';
import Spinner from '../ui/Spinner';
import { useUser } from '../features/authentication/useUser';
import EventInformationTab from '../features/events/EventInformationTab';
import EventDaysTab from '../features/events/EventDaysTab';
import EventRegistrationsTab from '../features/events/EventRegistrationsTab';
import { Context } from '../main';

export default function Event() {
  const { event, isLoading: isLoadingOne } = useEvent();
  const { user, isLoading: isLoadingTwo } = useUser();
  const [activeTab, setActiveTab] = useState('info');
  const { isDarkMode } = useContext(Context);


  if (!isLoadingOne && !event)
    return (
      <PageLayout>
        <PageNotFound />
      </PageLayout>
    );

  return (
    <PageLayout>
    <div  className="w-[80%] mx-auto"
      style={{
        backgroundColor: isDarkMode ? '#2D2D2D' : '#fcfaf8',
        color: isDarkMode ? 'white' : 'black',
      }}>
    {isLoadingOne || isLoadingTwo ? (
        <Spinner />
      ) : (
        <>
          <div className="relative flex flex-col items-center px-4 sm:px-8">
            <img
              className="w-full sm:w-[75%] mx-auto rounded-lg shadow-md"
              src={event.coverImage}
              alt=""
            />
            <div className="absolute bottom-[10%] sm:bottom-[5%] left-[10%] sm:left-[15%] p-2 text-white">
              <p className="text-xl sm:text-6xl font-bold leading-tight">
                {event.name}
              </p>
              <p className="mt-2 text-sm sm:text-base">
                {`Hosted by ${event.clubId.name}`}
              </p>
            </div>
          </div>
          <h2 className="text-4xl mt-4 font-bold">{event.name}</h2>
          <div className="w-full mt-4 flex items-center gap-4 border-b-2 p-4 border-primary-100">
            <button
              className={`font-semibold hover:text-black pb-2 ${
                activeTab === 'info'
                  ? 'text-black border-b-2 border-primary-700'
                  : 'text-primary-900'
              }`}
              onClick={() => setActiveTab('info')}
            >
              Event Information
            </button>
            <button
              className={`font-semibold hover:text-black pb-2 ${
                activeTab === 'daydetails'
                  ? 'text-black border-b-2 border-primary-700'
                  : 'text-primary-900'
              }`}
              onClick={() => setActiveTab('daydetails')}
            >
              Daily Event Details
            </button>
            {user.role === 'club' && (
              <button
                className={`font-semibold hover:text-black pb-2 ${
                  activeTab === 'registrations'
                    ? 'text-black border-b-2 border-primary-700'
                    : 'text-primary-900'
                }`}
                onClick={() => setActiveTab('registrations')}
              >
                Registrations
              </button>
            )}
          </div>
          {activeTab === 'info' && <EventInformationTab event={event} />}
          {activeTab === 'daydetails' && <EventDaysTab event={event} />}
          {activeTab === 'registrations' && (
            <EventRegistrationsTab event={event} />
          )}
        </>
      )}
    </div>
    </PageLayout>
  );
}
