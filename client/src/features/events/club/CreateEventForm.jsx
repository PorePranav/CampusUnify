import { useCreateEvent } from "../useCreateEvent";
import { useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../../firebase";
import toast from "react-hot-toast";

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
            "state_changed",
            () => {},
            () => {
              reject("Image size should be less than 2 MB");
              setIsUploading(false);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    [fieldName]: downloadURL,
                  }));
                  resolve("Photo uploaded successfully");
                })
                .catch((error) => {
                  reject(error.message);
                });
              setIsUploading(false);
            },
          );
        }),
        {
          loading: "Uploading photo...",
          success: "Uploaded photo successfully",
          error: "Select an image with size < 2MB",
        },
      );
    };

    if (cardImage) {
      handleFileUpload(cardImage, "cardImage");
      setCardImage(undefined);
    }

    if (coverImage) {
      handleFileUpload(coverImage, "coverImage");
      setCoverImage(undefined);
    }
  }, [cardImage, coverImage]);

  return (
    <form
      className="flex flex-col gap-2 mt-4 w-[40rem]"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-2 gap-2 items-center">
        <label>Name</label>
        <input
          id="name"
          required
          onChange={handleChange}
          type="text"
          placeholder="Event Name"
          className="border border-slate-400 p-2 rounded-md"
        />
      </div>
      <div className="grid grid-cols-2 gap-2 items-center">
        <label>Date</label>
        <input
          id="date"
          required
          onChange={handleChange}
          type="date"
          className="border border-slate-400 p-2 rounded-md"
        />
      </div>
      <div className="grid grid-cols-2 gap-2 items-center">
        <label>Charges</label>
        <input
          id="eventCharges"
          onChange={handleChange}
          type="number"
          placeholder="Event Charges"
          className="border border-slate-400 p-2 rounded-md"
        />
      </div>
      <div className="grid grid-cols-2 gap-2 items-center">
        <label>Venue</label>
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
        <label>Category</label>
        <select
          id="category"
          required
          onChange={handleChange}
          defaultValue="technical"
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
        <label>Maximum Capacity</label>
        <input
          id="maxCapacity"
          required
          onChange={handleChange}
          type="number"
          placeholder="Maximum Capacity"
          className="border border-slate-400 p-2 rounded-md"
        />
      </div>
      <div className="grid grid-cols-2 gap-2 items-center">
        <label>Event description</label>
        <input
          id="description"
          required
          onChange={handleChange}
          type="text"
          placeholder="Event Description"
          className="border border-slate-400 p-2 rounded-md"
        />
      </div>
      <div className="grid grid-cols-2 gap-2 items-center">
        <label>Card Image</label>
        <input
          id="cardImage"
          accept="image/*"
          onChange={(e) => setCardImage(e.target.files[0])}
          type="file"
          className="border border-slate-400 p-2 rounded-md"
        />
      </div>
      <div className="grid grid-cols-2 gap-2 items-center">
        <label>Cover Image</label>
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
          disabled={isUploading || isCreating}
          onClick={() => onCloseModal?.()}
        >
          Exit
        </button>
        <button
          disabled={isUploading || isCreating}
          className="bg-primary-orange text-white w-40 px-2 py-1 rounded-md font-semibold"
        >
          Add Event
        </button>
      </div>
    </form>
  );
}
