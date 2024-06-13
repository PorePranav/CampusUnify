import { initiatePayment } from '../../services/apiPayments';

export async function useInitiatePayment() {
  const orderData = await initiatePayment();
  console.log(orderData);
}
