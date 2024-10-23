import { useState } from 'react';
import { FaBars, FaMoon, FaSun, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
import useTheme from '../hooks/useTheme';

export default function Header() {
  const { user } = useUser();
  const { theme, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderNavLinks = () => {
    if (user) {
      return (
        <>
          <Link to="/events">
            <li className="text-gray-800 dark:text-white/90 hover:text-primary-600 font-bold py-2">
              Events
            </li>
          </Link>
          {user.role === 'user' && (
            <>
              <Link to="/registration">
                <li className="text-gray-800 dark:text-white/90 hover:text-primary-600 font-bold py-2">
                  My Registrations
                </li>
              </Link>
              <Link to="/cart">
                <li className="text-gray-800 dark:text-white/90 hover:text-primary-600 font-bold py-2">
                  My Cart
                </li>
              </Link>
            </>
          )}
          <Link to="/profile">
            <li className="text-gray-800 dark:text-white/90 hover:text-primary-600 font-bold py-2 flex items-center">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="rounded-full h-8 w-8 object-cover mr-2"
              />
              Profile
            </li>
          </Link>
        </>
      );
    }
    return (
      <Link to="/login">
        <li className="hover:underline bg-primary-700 rounded-2xl px-4 py-2 text-white font-bold">
          Sign In
        </li>
      </Link>
    );
  };

  return (
    <header className="w-full px-4 sm:px-0 sm:w-[90%] lg:w-[80%] mx-auto">
      <div className="flex justify-between items-center mx-auto py-3 transition-colors duration-300 text-black dark:text-white">
        <Link to={user ? '/' : '/'} className="z-19">
          <div className="flex gap-4 items-center">
            <img src="/logo.png" className="h-10 w-10 sm:h-12 sm:w-12" alt="" />
            <h1 className="font-bold text-lg sm:text-xl flex flex-wrap">
              <span className="text-primary-800 dark:text-primary-300">
                Campus
              </span>
              <span className="text-primary-500 dark:text-primary-400">
                Unify
              </span>
            </h1>
          </div>
        </Link>

        <nav className="hidden sm:block">
          <ul className="flex gap-4 items-center">
            {renderNavLinks()}
            <li>
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 rounded-full transition-colors duration-300 bg-gray-300 dark:bg-gray-700"
              >
                {theme === 'dark' ? <FaMoon /> : <FaSun />}
              </button>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="sm:hidden z-20"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Collapsible Sidebar */}
        <div
          className={`fixed inset-y-0 right-0 z-10 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${
            isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 ease-in-out sm:hidden`}
        >
          <nav className="flex flex-col h-full justify-start pt-4 items-start">
            <ul className="space-y-4 px-4">
              {renderNavLinks()}
              <li>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="p-2 rounded-full transition-colors duration-300 bg-gray-300 dark:bg-gray-700"
                >
                  {theme === 'dark' ? <FaMoon /> : <FaSun />}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}