import { FaExclamationTriangle } from 'react-icons/fa';
import { useMoveBack } from '../hooks/useMoveBack';

export default function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <div className="w-full h-[calc(100vh-72px)] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center text-center">
        <FaExclamationTriangle className="text-6xl text-primary-600 mb-4" />
        <h2 className="text-xl">
          The page you are looking for could not be found
        </h2>
        <button
          type="button"
          className="bg-primary-600 text-white px-4 py-2 rounded-xl mt-4 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition duration-200"
          onClick={moveBack}
          aria-label="Go back to the previous page"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
}
