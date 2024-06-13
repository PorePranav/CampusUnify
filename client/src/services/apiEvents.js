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
  console.log(error);

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

export async function getEventDays(eventId) {
  const { data, error } = await axios.get(
    `http://localhost:3000/api/v1/events/eventDays/${eventId}`,
    { withCredentials: true }
  );

  if (error) return new Error(error.message);
  return data.data;
}

export async function createEventDay({ eventId, newEventDay }) {
  const { data, error } = await axios.post(
    `http://localhost:3000/api/v1/events/eventDays/${eventId}`,
    newEventDay,
    { withCredentials: true }
  );

  if (error) return new Error(error.message);
  return data.data;
}

export async function deleteEventDay({ eventId, dayId }) {
  const { data, error } = await axios.delete(
    `http://localhost:3000/api/v1/events/eventDays/${eventId}/day/${dayId}`,
    { withCredentials: true }
  );

  if (error) return new Error(error.message);
  return data.data;
}

export async function editEventDay({ eventId, dayId, newEventDayData }) {
  const { data, error } = await axios.patch(
    `http://localhost:3000/api/v1/events/eventDays/${eventId}/day/${dayId}`,
    newEventDayData,
    { withCredentials: true }
  );

  if (error) return new Error(error.message);
  return data.data;
}
