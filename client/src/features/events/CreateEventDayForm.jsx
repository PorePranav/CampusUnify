import { useCreateEventDay } from './useCreateEventDay';
import {
  HiCube,
  HiCalendarDays,
  HiDocumentText,
  HiMapPin,
} from 'react-icons/hi2';
import { useState } from 'react';

export default function CreateEventDayForm({ onCloseModal, event }) {
  const [formData, setFormData] = useState({});

  const { createEventDay, isCreating } = useCreateEventDay();

  function handleChange(e) {
    setFormData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    createEventDay({ eventId: event._id, newEventDay: formData });
    onCloseModal?.();
  }

  return (
    <form
      className="flex flex-col gap-2 mt-4 w-[40rem]"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-2 gap-2 items-center">
        <div className="flex gap-2 items-center">
          <HiCube className="h-6 w-6 fill-primary-600" />
          <label>Serial Number</label>
        </div>
        <input
          id="serialNumber"
          required
          onChange={handleChange}
          type="text"
          placeholder="Event Day"
          className="border border-slate-400 p-2 rounded-md"
        />
      </div>
      <div className="grid grid-cols-2 gap-2 items-center">
        <div className="flex gap-2 items-center">
          <HiCalendarDays className="h-6 w-6 fill-primary-600" />
          <label>Date</label>
        </div>
        <input
          id="date"
          required
          onChange={handleChange}
          type="date"
          className="border border-slate-400 p-2 rounded-md"
        />
      </div>
      <div className="grid grid-cols-2 gap-2 items-center">
        <div className="flex gap-2 items-center">
          <HiMapPin className="h-6 w-6 fill-primary-600" />
          <label>Venue</label>
        </div>
        <input
          id="venue"
          required
          onChange={handleChange}
          type="text"
          placeholder="Event Venue"
          className="border border-slate-400 p-2 rounded-md"
        />
      </div>
      <div className="grid grid-cols-2 gap-2 items-center">
        <div className="flex gap-2 items-center">
          <HiDocumentText className="h-6 w-6 fill-primary-600" />
          <label>Event day description</label>
        </div>
        <input
          id="description"
          required
          onChange={handleChange}
          type="text"
          placeholder="Event Description"
          className="border border-slate-400 p-2 rounded-md"
        />
      </div>
      <div className="flex justify-end gap-4 mt-4">
        <button
          className="bg-red-700 text-white w-40 px-2 py-1 rounded-md font-semibold"
          disabled={isCreating}
          onClick={() => onCloseModal?.()}
        >
          Exit
        </button>
        <button
          disabled={isCreating}
          className="bg-primary-600 text-white w-40 px-2 py-1 rounded-md font-semibold"
        >
          Add Event Day
        </button>
      </div>
    </form>
  );
}
