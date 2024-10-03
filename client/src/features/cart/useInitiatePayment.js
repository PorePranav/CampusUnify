import { initiatePayment } from '../../services/apiPayments';

export async function useInitiatePayment() {
  await initiatePayment();
}
