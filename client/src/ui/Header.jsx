import { useState } from 'react';
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
import useTheme from '../hooks/useTheme';

export default function Header() {
  const { user } = useUser();
  const { theme, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle the sidebar on mobile view
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderUserLinks = () => {
    if (user?.role === 'user') {
      return (
        <>
          <Link to="/registration">
            <li className="text-gray-800 dark:text-white/90 hover:text-primary-600 font-bold">
              My Registrations
            </li>
          </Link>
          <Link to="/cart">
            <li className="text-gray-800 dark:text-white/90 hover:text-primary-600 font-bold">
              My Cart
            </li>
          </Link>
        </>
      );
    }
    return null;
  };

  const renderClubLinks = () => (
    <>
      <Link to="/events">
        <li className="text-gray-800 dark:text-white/90 hover:text-primary-600 font-bold">
          Events
        </li>
      </Link>
      {renderUserLinks()}
      <Link to="/profile">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="rounded-full h-8 w-8 object-cover"
        />
      </Link>
    </>
  );

  const renderGuestLinks = () => (
    <Link to="/login">
      <li className="hover:underline bg-primary-700 rounded-2xl px-4 py-2 text-white font-bold">
        Sign In
      </li>
    </Link>
  );

  return (
    <header className="w-full sm:w-[80%] mx-auto px-5 sm:px-0">
      <div className="flex justify-between items-center mx-auto py-3 sm:py-3 transition-colors duration-300 text-black dark:text-white">
        <Link to={user ? '/events' : '/'}>
          <div className="flex gap-4 items-center">
            <img src="/logo.png" className="h-12 w-12" alt="Logo" />
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="text-primary-800 dark:text-primary-300">
                Campus
              </span>
              <span className="text-primary-500 dark:text-primary-400">
                Unify
              </span>
            </h1>
          </div>
        </Link>

        {/* Hamburger button for mobile view */}
        <button
          onClick={toggleSidebar}
          className="block sm:hidden text-2xl focus:outline-none"
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop view links */}
        <ul className="hidden sm:flex gap-4 items-center">
          {user ? renderClubLinks() : renderGuestLinks()}

          {/* Dark/Light mode toggle button */}
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
      </div>

      {/* Sidebar for mobile view */}
      <div
        className={`fixed top-0 left-0 h-full w-[250px] bg-white dark:bg-gray-800 z-50 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 sm:hidden`}
      >
        <ul className="flex flex-col gap-4 p-5">
          {user ? renderClubLinks() : renderGuestLinks()}

          {/* Dark/Light mode toggle button in sidebar */}
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
      </div>

      {/* Overlay to close sidebar when clicking outside */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 sm:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </header>
  );
}
