import { useContext, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
import { Context } from '../main';
import Sidebar from './Sidebar'; // Import the Sidebar component

export default function Header() {
  const { user } = useUser();
  const { isDarkMode, setIsDarkMode } = useContext(Context);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null); // Ref for the sidebar

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const renderUserLinks = () => {
    if (user?.role === 'user') {
      return (
        <>
          <Link to="/registration">
            <li className="hover:text-primary-900">My Registrations</li>
          </Link>
          <Link to="/cart">
            <li className="hover:text-primary-900">My Cart</li>
          </Link>
        </>
      );
    }
    return null;
  };

  const renderClubLinks = () => (
    <>
      <Link to="/events">
        <li className="hover:text-primary-900">Events</li>
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
      <li className="bg-primary-700 rounded-2xl px-4 py-2 text-white">
        Sign In
      </li>
    </Link>
  );

  // Close the sidebar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    // Attach event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarRef]);

  return (
    <header className="w-[80%] mx-auto">
      <div
        className={`flex justify-between items-center p-3 transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
        }`}
      >
        <Link to={user ? '/events' : '/'}>
          <div className="flex gap-4 items-center">
            <img src="/logo.png" className="h-12 w-12" alt="" />
            <h1 className="font-bold text-sm sm:text-xl">
              Campus <span className="text-primary-400">Unify</span>
            </h1>
          </div>
        </Link>

        {/* Button to open the sidebar on mobile */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="block sm:hidden p-2 focus:outline-none"
        >
          {isSidebarOpen ? '✖️' : '☰'}
        </button>

        <ul className="hidden sm:flex gap-4 items-center">
          {user ? renderClubLinks() : renderGuestLinks()}

          {/* Dark/Light mode toggle button */}
          <li
            onClick={toggleDarkMode}
            className={`cursor-pointer p-2 rounded-full transition-colors duration-300 ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
            }`}
          >
            <span className="text-lg">{isDarkMode ? '🌙' : '☀️'}</span>
          </li>
        </ul>
      </div>

      {/* Sidebar for mobile view */}
      <div ref={sidebarRef}>
        <Sidebar
          isOpen={isSidebarOpen}
          closeSidebar={() => setIsSidebarOpen(false)}
        />
      </div>
    </header>
  );
}
