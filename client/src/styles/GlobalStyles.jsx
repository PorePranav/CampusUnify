<<<<<<< HEAD
=======
import { Context } from '../main';
import { useContext } from 'react';

>>>>>>> da3e271997fea15943e51e8ac47a3818cb3a831d
export default function GlobalStyles({ children }) {
  return (
    <div className="font-inter min-h-screen transition-colors duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      {children}
    </div>
  );
}
