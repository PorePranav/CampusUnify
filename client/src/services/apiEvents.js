import api from './api';

export async function getEvents() {
  const { data, error } = await api.get('/events/', { withCredentials: true });

  if (error) return new Error(error.message);
  return data.data;
}

export async function getEvent(eventId) {
  const { data, error } = await api.get(`/events/${eventId}`, {
    withCredentials: true,
  });

  if (error) return new Error(error.message);
  return data.data;
}

export async function createEvent(newEvent) {
  const { data, error } = await api.post('/events/', newEvent, {
    withCredentials: true,
  });
  console.log(error);

  if (error) return new Error(error.message);
  return data.data;
}

export async function editEvent({ eventId, newEventData }) {
  const { data, error } = await api.patch(`/events/${eventId}`, newEventData, {
    withCredentials: true,
  });

  if (error) return new Error(error.message);
  return data.data;
}

export async function deleteEvent(eventId) {
  const { data, error } = await api.delete(`/events/${eventId}`, {
    withCredentials: true,
  });

  if (error) return new Error(error.message);
  return data.data;
}

export async function getLatestEvents() {
  const { data, error } = await api.get('/events/latestEvents', {
    withCredentials: true,
  });

  if (error) return new Error(error.message);
  return data.data;
}

export async function getEventBookings(eventId) {
  const { data, error } = await api.get(`/bookings/${eventId}`, {
    withCredentials: true,
  });

  if (error) return new Error(error.message);
  return data.data;
}

export async function getEventSingleBooking({ eventId, bookingId }) {
  const { data, error } = await api.get(
    `/bookings/${eventId}/booking/${bookingId}`,
    { withCredentials: true }
  );

  if (error) return new Error(error.message);
  return data.data;
}

export async function deleteEventBooking({ eventId, bookingId }) {
  const { data, error } = await api.delete(
    `/bookings/${eventId}/booking/${bookingId}`,
    { withCredentials: true }
  );

  if (error) return new Error(error.message);
  return data.data;
}

export async function getEventDays(eventId) {
  const { data, error } = await api.get(`/events/eventDays/${eventId}`, {
    withCredentials: true,
  });

  if (error) return new Error(error.message);
  return data.data;
}

export async function createEventDay({ eventId, newEventDay }) {
  const { data, error } = await api.post(
    `/events/eventDays/${eventId}`,
    newEventDay,
    { withCredentials: true }
  );

  if (error) return new Error(error.message);
  return data.data;
}

export async function deleteEventDay({ eventId, dayId }) {
  const { data, error } = await api.delete(
    `/events/eventDays/${eventId}/day/${dayId}`,
    { withCredentials: true }
  );

  if (error) return new Error(error.message);
  return data.data;
}

export async function editEventDay({ eventId, dayId, newEventDayData }) {
  const { data, error } = await api.patch(
    `/events/eventDays/${eventId}/day/${dayId}`,
    newEventDayData,
    { withCredentials: true }
  );

  if (error) return new Error(error.message);
  return data.data;
}
