import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRegistrations } from '../features/registrations/useRegistrations';
import api from '../services/api';
import PageLayout from '../styles/PageLayout';
import Spinner from '../ui/Spinner';
import { formatCurrency, formatDateTimeDetailed } from '../utils/helpers';

export default function MyRegistrations() {
  const { isLoading, registrations } = useRegistrations();
  const [tab, setTab] = useState('all');

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
        return registrations;
    }
  };
  const filteredRegistrations =
    registrations && filterRegistrations(registrations);

  return (
    <PageLayout>
      <div className="mx-auto p-6 transition-colors duration-300 bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200">
        <h2 className="text-3xl font-bold mb-6">Your Registrations</h2>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8" aria-label="Tabs">
                {['all', 'upcoming', 'past'].map((tabName) => (
                  <button
                    key={tabName}
                    type="button"
                    className={`py-2 px-1 font-medium text-sm border-b-2 ${
                      tab === tabName
                        ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:border-gray-300'
                    }`}
                    onClick={() => setTab(tabName)}
                  >
                    {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
                  </button>
                ))}
              </nav>
            </div>
            <div>
              {filteredRegistrations.length === 0 ? (
                <p className="text-lg">
                  You have not registered for any events yet!{' '}
                  <Link
                    to="/events"
                    className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                  >
                    Browse for new events →
                  </Link>
                </p>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-4">
                    {tab.charAt(0).toUpperCase() + tab.slice(1)} events
                  </h3>
                  <div className="overflow-x-auto rounded-md">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          {[
                            'Event',
                            'Date',
                            'Total Charges',
                            'Payment ID',
                            'Status',
                            'Actions',
                          ].map((header) => (
                            <th
                              key={header}
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        {filteredRegistrations.map((registration) => (
                          <tr key={registration._id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                              {registration.eventId.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {formatDateTimeDetailed(
                                registration.eventId.date
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {formatCurrency(
                                registration.paymentId.totalAmount
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {registration.paymentId.razorpayPaymentId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                                {registration.currentStatus
                                  .charAt(0)
                                  .toUpperCase() +
                                  registration.currentStatus.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                type="button"
                                onClick={() =>
                                  handleDownloadTicket(registration._id)
                                }
                                className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                              >
                                Download
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
