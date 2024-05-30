import { useMoveBack } from '../hooks/useMoveBack';

export default function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <div className="w-[80%] h-[50%] mx-auto">
      <div className="flex flex-col items-center justify-center text-center h-12 mt-6">
        <h2 className="text-xl">
          The page you are looking for could not be found
        </h2>
        <button
          className="bg-primary-orange text-white px-4 py-2 rounded-sm mt-4"
          onClick={moveBack}
        >
          &larr; Go Back
        </button>
      </div>
    </div>
  );
}
