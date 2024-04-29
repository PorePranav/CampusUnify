import { Link } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";

export default function Header() {
  const { user } = useUser();
  console.log(user);

  return (
    <header>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={`${user ? "/events" : "/"}`}>
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
              <Link to="dashboard">
                <li className="hidden sm:inline hover:text-primary-orange font-bold">
                  Dashboard
                </li>
              </Link>
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
