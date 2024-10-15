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
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4 dark:text-white">
        Create New Event Day
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="serialNumber"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            <HiCube className="inline-block mr-2 h-5 w-5 text-primary-600" />
            Serial Number
          </label>
          <input
            id="serialNumber"
            required
            onChange={handleChange}
            type="text"
            placeholder="Event Day"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            <HiCalendarDays className="inline-block mr-2 h-5 w-5 text-primary-600" />
            Date
          </label>
          <input
            id="date"
            required
            onChange={handleChange}
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="venue"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            <HiMapPin className="inline-block mr-2 h-5 w-5 text-primary-600" />
            Venue
          </label>
          <input
            id="venue"
            required
            onChange={handleChange}
            type="text"
            placeholder="Event Venue"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            <HiDocumentText className="inline-block mr-2 h-5 w-5 text-primary-600" />
            Event Day Description
          </label>
          <input
            id="description"
            required
            onChange={handleChange}
            type="text"
            placeholder="Event Description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700"
          disabled={isCreating}
          onClick={onCloseModal}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isCreating}
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-primary-700 dark:hover:bg-primary-800"
        >
          {isCreating ? 'Processing...' : 'Add Event Day'}
        </button>
      </div>
    </form>
  );
}
