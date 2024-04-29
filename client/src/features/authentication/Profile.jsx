import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import toast from "react-hot-toast";

import { useUpdate } from "./useUpdate";
import { useUser } from "./useUser";
import { useLogout } from "./useLogout";
import { useDelete } from "./useDelete";

export default function Profile() {
  const { user } = useUser();
  const { logout } = useLogout();
  const { deleteUser } = useDelete();

  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [formData, setFormData] = useState({});
  const { updateUser, isLoading } = useUpdate();

  function handleSubmit(e) {
    e.preventDefault();
    updateUser(formData, {
      onSettled: () => {
        setFormData({});
      },
    });
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    const handleFileUpload = (file) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      toast.promise(
        new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setFilePerc(Math.round(progress));
            },
            (error) => {
              reject("Image size should be less than 2 MB");
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    avatar: downloadURL,
                  }));
                  resolve("Photo uploaded successfully");
                })
                .catch((error) => {
                  reject(error.message);
                });
            },
          );
        }),
        {
          loading: "Uploading photo",
          success: "Uploaded photo successfully",
          error: "Select an image with size < 2MB",
        },
      );
    };
    if (file) handleFileUpload(file);
  }, [file]);

  return (
    <div className="flex flex-col w-96 mx-auto items-center bg-secondary-orange p-8 rounded-lg shadow-md">
      <h1 className="mt-4 font-semibold text-2xl">Profile</h1>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
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
          className="border p-3 rounded-lg"
          onChange={handleChange}
          defaultValue={user.name}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
          defaultValue={user.email}
        />
        <button
          disabled={isLoading}
          className="bg-primary-orange font-bold text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          Update
        </button>
      </form>
      <div className="flex gap-8 mt-5 justify-between text-sm">
        <button className="text-red-700" onClick={logout}>
          Logout
        </button>
        <button className="text-red-700" onClick={deleteUser}>
          Delete Account
        </button>
      </div>
    </div>
  );
}
