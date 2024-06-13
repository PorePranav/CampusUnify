import { useState } from 'react';
import { initiatePayment as initiatePaymentApi } from '../../services/apiPayments';
import { useUser } from '../authentication/useUser';
import toast from 'react-hot-toast';

export function usePayment() {
  const { user } = useUser();
  const [isProcessing, setIsInitiating] = useState(false);

  async function initiatePayment() {
    setIsInitiating(true);
    try {
      const { orderId, amount, currency } = await initiatePaymentApi();

      const options = {
        key: 'rzp_test_m0idYNGokwfaSs',
        amount,
        currency,
        name: 'CampusUnify',
        order_id: orderId,
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: '#E67E22',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      toast.error('Payment initiation failed');
    } finally {
      setIsInitiating(false);
    }
  }

  return {
    initiatePayment,
    isProcessing,
  };
}
