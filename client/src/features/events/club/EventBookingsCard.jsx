import { formatDateTime, formatCurrency } from '../../../utils/helpers';
import { useEventBookings } from '../useEventBookings';

export default function EventBookingsCard({ event }) {
  const { isLoading, error, eventBookings } = useEventBookings(event._id);

  return (
    <div className="mt-6">
      <div className="grid grid-cols-5">
        <p>Name</p>
        <p>Payment ID</p>
        <p>Razorpay Id</p>
        <p>Amount</p>
        <p>Payment Time</p>
      </div>
      {eventBookings.registeredUsers.map((registration) => (
        <div className="grid grid-cols-5" key={registration._id}>
          <p>{registration.userId.name}</p>
          <p>{registration.paymentId.internalPaymentId}</p>
          <p>{registration.paymentId.razorpayPaymentId}</p>
          <p className="font-sono">
            {formatCurrency(registration.paymentId.totalAmount)}
          </p>
          <p>{formatDateTime(registration.paymentId.paymentTime)}</p>
        </div>
      ))}
    </div>
  );
}
