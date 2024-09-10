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

export const formatDateTimeDetailed = (value) =>
  format(new Date(value), 'MMMM dd, yyyy @ h.mm a');

export const formatDateTimeEvent = (value) =>
  format(new Date(value), `EEEE, MMMM dd`);

export const formatShortDate = (value) =>
  format(new Date(value), 'EEE, MMM d, yyyy');

export const formatShortTime = (value) => format(new Date(value), 'h:mm a');
