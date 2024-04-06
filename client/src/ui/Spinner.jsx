import { Spinner } from '@material-tailwind/react';

export function CustomSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner className="h-16 w-16 text-gray-900/50" />
    </div>
  );
}
