import { format } from 'date-fns';

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'INR',
  }).format(value);
};

export const formatDate = (value) => format(new Date(value), 'dd MMM yyy');

export const formatDateTime = (value) =>
  format(new Date(value), 'dd MMM yy HH:mm');
