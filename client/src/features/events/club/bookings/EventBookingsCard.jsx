import { formatDateTime, formatCurrency } from '../../../../utils/helpers';
import { useEventBookings } from '../../useEventBookings';

import SpinnerMini from '../../../../ui/SpinnerMini';
import toast from 'react-hot-toast';
import BookingDetailMenu from './BookingDetailMenu';

export default function EventBookingsCard({ event }) {
  const { isLoading, error, eventBookings } = useEventBookings(event._id);

  if (error) toast.error('There was an error fetching event registrations');

  return (
    <div className="mt-4">
      <p className="text-2xl">Event Registrations</p>
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_4rem] mt-4 p-2 bg-[#dadada] rounded-t-md font-bold">
        <p>Name</p>
        <p>Payment ID</p>
        <p>Razorpay ID</p>
        <p>Amount</p>
        <p>Payment Time</p>
        <p>Options</p>
      </div>
      {isLoading ? (
        <SpinnerMini />
      ) : (
        eventBookings.registeredUsers.map((registration) => (
          <div
            className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_4rem] p-2 border-l border-r border-b items-center"
            key={registration._id}
          >
            <p>{registration.userId.name}</p>
            <p>{registration.paymentId.internalPaymentId}</p>
            <p>{registration.paymentId.razorpayPaymentId}</p>
            <p className="font-sono">
              {formatCurrency(registration.paymentId.totalAmount)}
            </p>
            <p>{formatDateTime(registration.paymentId.paymentTime)}</p>
            <BookingDetailMenu booking={registration} event={event} />
          </div>
        ))
      )}
    </div>
  );
}
