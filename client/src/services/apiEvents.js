import axios from 'axios';

export async function getEvents() {
  const { data, error } = await axios.get(
    'http://localhost:3000/api/v1/events/',
    { withCredentials: true }
  );

  if (error) return new Error(error.message);
  return data.data;
}

export async function getEvent(eventId) {
  const { data, error } = await axios.get(
    `http://localhost:3000/api/v1/events/${eventId}`,
    { withCredentials: true }
  );

  if (error) return new Error(error.message);
  return data.data;
}

export async function createEvent(newEvent) {
  const { data, error } = await axios.post(
    'http://localhost:3000/api/v1/events/',
    newEvent,
    { withCredentials: true }
  );

  if (error) return new Error(error.message);
  return data.data;
}

export async function editEvent({ eventId, newEventData }) {
  const { data, error } = await axios.patch(
    `http://localhost:3000/api/v1/events/${eventId}`,
    newEventData,
    { withCredentials: true }
  );

  if (error) return new Error(error.message);
  return data.data;
}

export async function deleteEvent(eventId) {
  const { data, error } = await axios.delete(
    `http://localhost:3000/api/v1/events/${eventId}`,
    { withCredentials: true }
  );

  if (error) return new Error(error.message);
  return data.data;
}

export async function getEventBookings(eventId) {
  const { data, error } = await axios.get(
    `http://localhost:3000/api/v1/bookings/${eventId}`,
    { withCredentials: true }
  );

  if (error) return new Error(error.message);
  return data.data;
}

export async function getEventSingleBooking({ eventId, bookingId }) {
  const { data, error } = await axios.get(
    `http://localhost:3000/api/v1/bookings/${eventId}/booking/${bookingId}`,
    { withCredentials: true }
  );

  if (error) return new Error(error.message);
  return data.data;
}

export async function deleteEventBooking({ eventId, bookingId }) {
  const { data, error } = await axios.delete(
    `http://localhost:3000/api/v1/bookings/${eventId}/booking/${bookingId}`,
    { withCredentials: true }
  );

  if (error) return new Error(error.message);
  return data.data;
}
