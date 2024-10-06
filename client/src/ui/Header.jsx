import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
import { Context } from '../main';

export default function Header() {
  const { user } = useUser();
  const { isDarkMode, setIsDarkMode } = useContext(Context);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const renderUserLinks = () => {
    if (user?.role === 'user') {
      return (
        <>
          <Link to="/registration">
            <li className="hidden sm:inline hover:text-primary-900 font-bold">
              My Registrations
            </li>
          </Link>
          <Link to="/cart">
            <li className="hidden sm:inline hover:text-primary-900 font-bold">
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
        <li className="hidden sm:inline hover:text-primary-900 font-bold">
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
    <header className="w-[80%] mx-auto">
      <div
        className={`flex justify-between items-center mx-auto p-3 transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
        }`}
      >
        <Link to={user ? '/events' : '/'}>
          <div className="flex gap-4 items-center">
            <img src="/logo.png" className="h-12 w-12" alt="" />
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className={`${isDarkMode ? 'text-primary-300' : 'text-primary-800'}`}>Campus</span>
              <span className={`${isDarkMode ? 'text-primary-400' : 'text-primary-500'}`}>Unify</span>
            </h1>
          </div>
        </Link>

        <ul className="flex gap-4 items-center">
          {user ? renderClubLinks() : renderGuestLinks()}

          {/* Dark/Light mode toggle button */}
          <li
            onClick={toggleDarkMode}
            className={`cursor-pointer p-2 rounded-full transition-colors duration-300 ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
            }`}
          >
            <span className="text-lg">
              {isDarkMode ? '🌙' : '☀️'}
            </span>
          </li>
        </ul>
      </div>
    </header>
  );
}
