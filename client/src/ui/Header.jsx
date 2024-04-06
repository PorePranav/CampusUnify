import { Link } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';

export default function Header() {
  const { isLoading, user } = useUser();

  return (
    <header>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={`${user ? '/dashboard' : '/'}`}>
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-[#cf711f]">Campus</span>
            <span className="text-[#eb984e]">Unify</span>
          </h1>
        </Link>
        <ul className="flex gap-4 items-center">
          <Link>
            <li className="hidden sm:inline hover:text-primary-orange">
              Events
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
