import { HiMagnifyingGlass } from 'react-icons/hi2';
import { useEventBookings } from './useEventBookings';
import SpinnerMini from '../../ui/SpinnerMini';
import { formatCurrency, formatDateTime } from '../../utils/helpers';
import { useState } from 'react';

export default function EventRegistrationsTab({ event }) {
  const { eventBookings, isLoading } = useEventBookings(event._id);
  const [searchQuery, setSearchQuery] = useState('');

  if (isLoading) return <SpinnerMini />;

  const filteredUsers = eventBookings.registeredUsers.filter((user) =>
    user.userId.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-4">
      <p className="text-xl font-semibold">Event Registrations</p>

      {filteredUsers.length === 0 ? (
        <p className="text-lg mt-4">
          No users have registered for this event yet!
        </p>
      ) : (
        <>
          <div className="relative mt-4">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search for registrants"
              className="w-full pl-4 pr-10 py-2 rounded-lg bg-skin placeholder-primary-900 focus:outline-none"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <HiMagnifyingGlass className="text-primary-900" size={18} />
            </div>
          </div>
          <div className="mt-4 rounded-lg border-2 border-skin">
            <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] border-b p-3 items-center">
              <div className="font-bold">Name</div>
              <div className="font-bold">Payment ID</div>
              <div className="font-bold">Razorpay ID</div>
              <div className="font-bold">Paid Amount</div>
              <div className="font-bold">Registration Date</div>
            </div>

            {filteredUsers.length !== 0 &&
              filteredUsers.map((booking) => (
                <div
                  key={booking._id}
                  class="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] border-b p-3 items-center"
                >
                  <p>{booking.userId.name}</p>
                  <p className="text-primary-900">
                    {booking.paymentId.internalPaymentId}
                  </p>
                  <p className="text-primary-900">
                    {booking.paymentId.razorpayPaymentId}
                  </p>
                  <p className="text-primary-900">
                    {formatCurrency(booking.paymentId.totalAmount)}
                  </p>
                  <p className="text-primary-900">
                    {formatDateTime(booking.paymentId.paymentTime)}
                  </p>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
