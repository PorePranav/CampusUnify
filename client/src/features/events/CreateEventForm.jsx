import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  HiArrowUpOnSquare,
  HiBanknotes,
  HiCalendarDays,
  HiCube,
  HiDocumentText,
  HiMiniBars3,
  HiMiniUserGroup,
} from 'react-icons/hi2';
import { app } from '../../firebase';
import { useCreateEvent } from './useCreateEvent';

export default function CreateEventForm({ onCloseModal }) {
  const [formData, setFormData] = useState({});
  const [coverImage, setCoverImage] = useState(undefined);
  const [cardImage, setCardImage] = useState(undefined);
  const [isUploading, setIsUploading] = useState(false);

  const { createEvent, isCreating } = useCreateEvent();

  function handleChange(e) {
    setFormData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    createEvent(formData);
    onCloseModal?.();
  }

  useEffect(() => {
    const handleFileUpload = (file, fieldName) => {
      setIsUploading(true);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      toast.promise(
        new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            () => {},
            () => {
              reject('Image size should be less than 2 MB');
              setIsUploading(false);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    [fieldName]: downloadURL,
                  }));
                  resolve('Photo uploaded successfully');
                })
                .catch((error) => {
                  reject(error.message);
                });
              setIsUploading(false);
            }
          );
        }),
        {
          loading: 'Uploading photo...',
          success: 'Uploaded photo successfully',
          error: 'Select an image with size < 2MB',
        }
      );
    };

    if (cardImage) {
      handleFileUpload(cardImage, 'cardImage');
      setCardImage(undefined);
    }

    if (coverImage) {
      handleFileUpload(coverImage, 'coverImage');
      setCoverImage(undefined);
    }
  }, [cardImage, coverImage]);

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4 dark:text-white">
        Create New Event
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            <HiCube className="inline-block mr-2 h-5 w-5 text-primary-600" />
            Event Name
          </label>
          <input
            id="name"
            required
            onChange={handleChange}
            type="text"
            placeholder="Enter event name"
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
            htmlFor="eventCharges"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            <HiBanknotes className="inline-block mr-2 h-5 w-5 text-primary-600" />
            Event Charges
          </label>
          <input
            id="eventCharges"
            required
            onChange={handleChange}
            type="number"
            placeholder="Enter event charges"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            <HiMiniBars3 className="inline-block mr-2 h-5 w-5 text-primary-600" />
            Category
          </label>
          <select
            id="category"
            required
            onChange={handleChange}
            defaultValue="technical"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="academic">Academic</option>
            <option value="artistic">Artistic</option>
            <option value="competition">Competition</option>
            <option value="cultural">Cultural</option>
            <option value="outdoor">Outdoor</option>
            <option value="technical">Technical</option>
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="maxCapacity"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            <HiMiniUserGroup className="inline-block mr-2 h-5 w-5 text-primary-600" />
            Maximum Capacity
          </label>
          <input
            id="maxCapacity"
            required
            onChange={handleChange}
            type="number"
            placeholder="Enter maximum capacity"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            <HiDocumentText className="inline-block mr-2 h-5 w-5 text-primary-600" />
            Event Description
          </label>
          <textarea
            id="description"
            required
            onChange={handleChange}
            placeholder="Enter event description"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="cardImage"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            <HiArrowUpOnSquare className="inline-block mr-2 h-5 w-5 text-primary-600" />
            Card Image
          </label>
          <input
            id="cardImage"
            accept="image/*"
            onChange={(e) => setCardImage(e.target.files[0])}
            type="file"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="coverImage"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            <HiArrowUpOnSquare className="inline-block mr-2 h-5 w-5 text-primary-600" />
            Cover Image
          </label>
          <input
            id="coverImage"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files[0])}
            type="file"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700"
          disabled={isUploading || isCreating}
          onClick={onCloseModal}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isUploading || isCreating}
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-primary-700 dark:hover:bg-primary-800"
        >
          {isUploading || isCreating ? 'Processing...' : 'Add Event'}
        </button>
      </div>
    </form>
  );
}
