import { useEffect, useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import {
  HiBanknotes,
  HiCalendarDays,
  HiCube,
  HiMiniBars3,
  HiMiniUserGroup,
  HiDocumentText,
  HiArrowUpOnSquare,
} from 'react-icons/hi2';
import { app } from '../../../firebase';
import toast from 'react-hot-toast';
import { useEditEvent } from '../useEditEvent';

export default function EditEventForm({ event, onCloseModal }) {
  const [formData, setFormData] = useState({});
  const [coverImage, setCoverImage] = useState(undefined);
  const [cardImage, setCardImage] = useState(undefined);
  const [isUploading, setIsUploading] = useState(false);

  const { editEvent, isEditing } = useEditEvent();

  function handleChange(e) {
    setFormData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    editEvent({ eventId: event._id, newEventData: formData });
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
    <form
      className="flex flex-col gap-2 mt-4 w-[40rem]"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-2 gap-2 items-center">
        <div className="flex gap-2 items-center">
          <HiCube className="h-6 w-6 fill-primary-orange" />
          <label>Name</label>
        </div>
        <input
          id="name"
          required
          onChange={handleChange}
          defaultValue={event.name}
          type="text"
          placeholder="Event Name"
          className="border border-slate-400 p-2 rounded-md"
        />
      </div>
      <div className="grid grid-cols-2 gap-2 items-center">
        <div className="flex gap-2 items-center">
          <HiCalendarDays className="h-6 w-6 fill-primary-orange" />
          <label>Date</label>
        </div>
        <input
          id="date"
          required
          onChange={handleChange}
          defaultValue={new Date(event.date).toLocaleDateString()}
          type="date"
          className="border border-slate-400 p-2 rounded-md"
        />
      </div>
      <div className="grid grid-cols-2 gap-2 items-center">
        <div className="flex gap-2 items-center">
          <HiBanknotes className="h-6 w-6 fill-primary-orange" />
          <label>Charges</label>
        </div>
        <input
          id="eventCharges"
          required
          onChange={handleChange}
          defaultValue={event.eventCharges}
          type="number"
          placeholder="Event Charges"
          className="border border-slate-400 p-2 rounded-md"
        />
      </div>
      <div className="grid grid-cols-2 gap-2 items-center">
        <div className="flex gap-2 items-center">
          <HiMiniBars3 className="h-6 w-6 fill-primary-orange" />
          <label>Category</label>
        </div>
        <select
          id="category"
          required
          onChange={handleChange}
          defaultValue={event.category}
          placeholder="Event Category"
          className="border border-slate-400 p-2 rounded-md"
        >
          <option value="academic">Academic</option>
          <option value="artistic">Artistic</option>
          <option value="competition">Competition</option>
          <option value="cultural">Cultural</option>
          <option value="outdoor">Outdoor</option>
          <option value="technical">Technical</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-2 items-center">
        <div className="flex gap-2 items-center">
          <HiMiniUserGroup className="h-6 w-6 fill-primary-orange" />
          <label>Maximum Capacity</label>
        </div>
        <input
          id="maxCapacity"
          required
          onChange={handleChange}
          defaultValue={event.maxCapacity}
          type="number"
          placeholder="Maximum Capacity"
          className="border border-slate-400 p-2 rounded-md"
        />
      </div>
      <div className="grid grid-cols-2 gap-2 items-center">
        <div className="flex gap-2 items-center">
          <HiDocumentText className="h-6 w-6 fill-primary-orange" />
          <label>Event description</label>
        </div>
        <input
          id="description"
          required
          onChange={handleChange}
          defaultValue={event.description}
          type="text"
          placeholder="Event Description"
          className="border border-slate-400 p-2 rounded-md"
        />
      </div>
      <div className="grid grid-cols-2 gap-2 items-center">
        <div className="flex gap-2 items-center">
          <HiArrowUpOnSquare className="h-6 w-6 fill-primary-orange" />
          <label>Card Image</label>
        </div>
        <input
          id="cardImage"
          accept="image/*"
          onChange={(e) => setCardImage(e.target.files[0])}
          type="file"
          className="border border-slate-400 p-2 rounded-md"
        />
      </div>
      <div className="grid grid-cols-2 gap-2 items-center">
        <div className="flex gap-2 items-center">
          <HiArrowUpOnSquare className="h-6 w-6 fill-primary-orange" />
          <label>Cover Image</label>
        </div>
        <input
          id="coverImage"
          accept="image/*"
          onChange={(e) => setCoverImage(e.target.files[0])}
          type="file"
          className="border border-slate-400 p-2 rounded-md"
        />
      </div>
      <div className="flex justify-end gap-4 mt-4">
        <button
          className="bg-red-700 text-white w-40 px-2 py-1 rounded-md font-semibold"
          disabled={isUploading || isEditing}
          onClick={() => onCloseModal?.()}
        >
          Exit
        </button>
        <button
          disabled={isUploading || isEditing}
          className="bg-primary-orange text-white w-40 px-2 py-1 rounded-md font-semibold"
        >
          Add Event
        </button>
      </div>
    </form>
  );
}
