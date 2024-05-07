import React from "react";

export default function ConfirmDelete({
  onCloseModal,
  resourceName,
  onDeleteHandler,
}) {
  return (
    <div>
      <h1 className="text-xl font-bold">Delete {resourceName}</h1>
      <p className="mt-4">
        Are you sure that you want to delete this {resourceName}
        <br /> permanently? This action cannot be undone
      </p>
      <div className="flex justify-end mt-4 gap-4 w-1/2 mx-auto">
        <button
          className="px-2 py-1 rounded-md text-white font-semibold bg-red-700 w-40"
          onClick={() => onCloseModal?.()}
        >
          Exit
        </button>
        <button
          className="px-4 py-2 bg-red-700 text-white font-bold rounded-md w-40"
          onClick={onDeleteHandler}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
