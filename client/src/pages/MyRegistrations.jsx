import { useRegistrations } from '../features/registrations/useRegistrations';
import Spinner from '../ui/Spinner';
import { formatCurrency } from '../utils/helpers';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function MyRegistrations() {
  const { isLoading, error, registrations } = useRegistrations();

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

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="w-[80%] my-6 mx-auto">
          <p className="text-2xl">My Registrations</p>
          <div className="flex flex-col gap-4 mt-4 bg-gray-100">
            {registrations.length !== 0 ? (
              registrations.map((registration) => {
                const { eventId, paymentId, currentStatus } = registration;
                const eventDate = new Date(eventId.date).toLocaleDateString();

                return (
                  <div
                    key={registration._id}
                    className="flex flex-col md:flex-row bg-white shadow-md p-4 rounded-md"
                  >
                    <img
                      src={eventId.coverImage}
                      alt={eventId.name}
                      className="w-full md:w-40 h-40 object-cover rounded-md mb-4 md:mb-0 md:mr-4"
                    />
                    <div className="flex flex-col justify-between flex-1">
                      <h2 className="text-xl font-bold mb-2">{eventId.name}</h2>
                      <p className="text-gray-600 mb-2">
                        {eventId.description}
                      </p>
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                        <p className="text-sm text-gray-500">
                          Date: {eventDate}
                        </p>
                        <p className="text-lg text-green-600 font-semibold">
                          Charges:{' '}
                          <span className="font-sono">
                            {formatCurrency(eventId.eventCharges)}
                          </span>
                        </p>
                      </div>
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <p className="text-sm text-gray-500">
                          Payment ID: {paymentId.internalPaymentId}
                        </p>
                        <p
                          className={`text-sm font-semibold ${
                            currentStatus === 'confirmed'
                              ? 'text-green-500'
                              : 'text-red-500'
                          }`}
                        >
                          Status: {currentStatus.toUpperCase()}
                        </p>
                      </div>
                      <button
                        className="mt-4 bg-primary-600 font-semibold text-white py-2 px-4 rounded-md self-start"
                        onClick={() => handleDownloadTicket(registration._id)}
                      >
                        Download Ticket
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <h2 className="mt-2">
                You have not registered for any events yet!
                <Link
                  to="/events"
                  className="text-blue-500 hover:text-blue-700"
                >
                  {' '}
                  Browse for new events &rarr;
                </Link>
              </h2>
            )}
          </div>
        </div>
      )}
    </>
  );
}
