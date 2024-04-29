<<<<<<< HEAD
import { Link } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
=======
import { Link } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
>>>>>>> b4fdd8b (sync commit)

export default function Header() {
  const { user } = useUser();

  return (
    <header>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
<<<<<<< HEAD
        <Link to={`${user ? '/dashboard' : '/'}`}>
=======
        <Link to={`${user ? "/events" : "/"}`}>
>>>>>>> b4fdd8b (sync commit)
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-[#cf711f]">Campus</span>
            <span className="text-[#eb984e]">Unify</span>
          </h1>
        </Link>
        <ul className="flex gap-4 items-center">
          {user ? (
            <>
              <Link to="events">
                <li className="hidden sm:inline hover:text-primary-orange font-bold">
                  Events
                </li>
              </Link>
<<<<<<< HEAD
              <Link to="dashboard">
                <li className="hidden sm:inline hover:text-primary-orange font-bold">
                  Dashboard
                </li>
              </Link>
=======
>>>>>>> b4fdd8b (sync commit)
              <Link to="profile">
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  className="rounded-full h-8 w-8 object-cover"
                />
              </Link>
            </>
          ) : (
            <Link to="/login">
              <li className="hover:underline bg-primary-orange rounded-lg px-4 py-2 text-white font-bold">
                Sign In
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
