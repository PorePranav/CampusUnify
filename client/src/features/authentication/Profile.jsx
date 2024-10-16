import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { app } from '../../firebase';
import { useDelete } from './useDelete';
import { useLogout } from './useLogout';
import { useUpdate } from './useUpdate';
import { useUser } from './useUser';

export default function Profile() {
  const { user } = useUser();
  const { logout } = useLogout();
  const { deleteUser } = useDelete();

  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [formData, setFormData] = useState({ avatar: user.avatar });
  const { updateUser, isLoading } = useUpdate();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData, {
      onSettled: () => {
        setFormData({ avatar: user.avatar }); // Reset to current avatar after update
      },
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    const handleFileUpload = (file) => {
      const storage = getStorage(app);
      const fileName = `${Date.now()}_${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      toast.promise(
        new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            null,
            () => {
              reject('Image size should be less than 2 MB');
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => {
                  setFormData((prev) => ({ ...prev, avatar: downloadURL }));
                  resolve('Photo uploaded successfully');
                })
                .catch((error) => {
                  reject(error.message);
                });
            }
          );
        }),
        {
          loading: 'Uploading photo...',
          success: 'Uploaded photo successfully!',
          error: 'Select an image with size < 2MB',
        }
      );
    };

    if (file) handleFileUpload(file);
  }, [file]);

  return (
    <div className="flex flex-col w-full max-w-md mt-5 mx-auto items-center bg-primary-50 p-6 rounded-lg shadow-md">
      <h1 className="mt-4 font-semibold text-2xl text-primary-900 text-center">Profile</h1>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4 w-full">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileRef}
          className="hidden"
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || user.avatar}
          alt="Profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <input
          type="text"
          placeholder="Name"
          id="name"
          className="border p-3 rounded-lg placeholder-primary-900 w-full text-primary-900"
          onChange={handleChange}
          defaultValue={user.name}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border p-3 rounded-lg placeholder-primary-900 w-full text-primary-900"
          onChange={handleChange}
          defaultValue={user.email}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary-600 font-bold text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          Update
        </button>
      </form>
      <div className="flex flex-col sm:flex-row gap-4 mt-5 w-full justify-between text-sm">
        <button type="button" className="text-red-700 flex-1" onClick={logout}>
          Logout
        </button>
        <button type="button" className="text-red-700 flex-1" onClick={deleteUser}>
          Delete Account
        </button>
      </div>
    </div>
  );
}
