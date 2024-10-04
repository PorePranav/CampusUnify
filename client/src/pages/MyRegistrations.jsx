import Spinner from '../ui/Spinner';
import PageLayout from '../styles/PageLayout';
import { useRegistrations } from '../features/registrations/useRegistrations';
import { formatCurrency } from '../utils/helpers';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { formatDateTimeDetailed } from '../utils/helpers';
import { useState,useContext } from 'react';
import { Context } from '../main';

export default function MyRegistrations() {
  const { isLoading, registrations } = useRegistrations();
  const [tab, setTab] = useState('all');
  const { isDarkMode, setIsDarkMode } = useContext(Context);
  function handleDownloadTicket(registrationId) {
    api
      .get(`/bookings/generateTicket/${registrationId}`, {
        responseType: 'blob',
        withCredentials: true,
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;

        const filename = 'ticket.pdf';
        link.setAttribute('download', filename);

        document.body.appendChild(link);

        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Error downloading the ticket:', error);
      });
  }

  const filterRegistrations = (registrations) => {
    const now = new Date();

    switch (tab) {
      case 'upcoming':
        return registrations.filter((reg) => new Date(reg.eventId.date) > now);
      case 'past':
        return registrations.filter((reg) => new Date(reg.eventId.date) < now);
      case 'all':
      default:
        return registrations;
    }
  };

  const filteredRegistrations =
    registrations && filterRegistrations(registrations);

  return (
    <PageLayout>
    <div className="w-[80%] mx-auto"
      style={{
        backgroundColor: isDarkMode ? '#2D2D2D' : '#fcfaf8',
        color: isDarkMode ? 'white' : 'black',
      }}>
    <h2 className="text-3xl font-bold mt-4">Your Registrations</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="mt-4 border-b-2 p-2 border-skin flex gap-6">
            <button
              className={`font-semibold hover:text-black pb-1 ${
                tab === 'all'
                  ? 'text-black  border-b-2 border-primary-700'
                  : 'text-primary-900'
              }`}
              onClick={() => setTab('all')}
            >
              All
            </button>
            <button
              className={`font-semibold hover:text-black pb-1 ${
                tab === 'upcoming'
                  ? 'text-black  border-b-2 border-primary-700'
                  : 'text-primary-900'
              }`}
              onClick={() => setTab('upcoming')}
            >
              Upcoming
            </button>
            <button
              className={`font-semibold hover:text-black pb-1 ${
                tab === 'past'
                  ? 'text-black  border-b-2 border-primary-700'
                  : 'text-primary-900'
              }`}
              onClick={() => setTab('past')}
            >
              Past
            </button>
          </div>
          <div>
            {filteredRegistrations.length === 0 ? (
              <p className="mt-2">
                You have not registered for any events yet!
                <Link
                  to="/events"
                  className="text-blue-500 hover:text-blue-700"
                >
                  {' '}
                  Browse for new events &rarr;
                </Link>
              </p>
            ) : (
              <>
                <p className="text-xl mt-6 font-semibold">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} events
                </p>
                <div className="mt-2 rounded-lg border-2 border-skin text-center">
                  <div className="grid grid-cols-[1fr_2fr_1fr_2fr_1fr_1fr] border-b p-3 items-center">
                    <div className="font-bold">Event</div>
                    <div className="font-bold">Date</div>
                    <div className="font-bold">Total Charges</div>
                    <div className="font-bold">Payment ID</div>
                    <div className="font-bold">Status</div>
                    <div className="font-bold">Actions</div>
                  </div>

                  {filteredRegistrations.map((registration) => (
                    <div
                      key={registration._id}
                      className="grid grid-cols-[1fr_2fr_1fr_2fr_1fr_1fr] border-b p-3 items-center"
                    >
                      <p>{registration.eventId.name}</p>
                      <p className="text-primary-900">
                        {formatDateTimeDetailed(registration.eventId.date)}
                      </p>
                      <p className="text-primary-900">
                        {formatCurrency(registration.paymentId.totalAmount)}
                      </p>
                      <p>{registration.paymentId.razorpayPaymentId}</p>
                      <p className="bg-skin py-1 px-3 rounded-3xl self-center text-center">
                        {registration.currentStatus.charAt(0).toUpperCase() +
                          registration.currentStatus.slice(1)}
                      </p>
                      <button
                        onClick={() => handleDownloadTicket(registration._id)}
                        className="text-primary-900"
                      >
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
    </PageLayout>
  );
}
