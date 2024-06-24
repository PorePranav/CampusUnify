import { Link } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';

export default function Header() {
  const { user } = useUser();

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
    <header className="bg-[#fcfaf8] w-[80%] mx-auto">
      <div className="flex justify-between items-center mx-auto p-3">
        <Link to={user ? '/events' : '/'}>
          <div className="flex gap-4 items-center">
            <img src="/logo.png" className="h-12 w-12" alt="" />
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="text-primary-500">Campus</span>
              <span className="text-primary-800">Unify</span>
            </h1>
          </div>
        </Link>
        <ul className="flex gap-4 items-center">
          {user ? renderClubLinks() : renderGuestLinks()}
        </ul>
      </div>
    </header>
  );
}
