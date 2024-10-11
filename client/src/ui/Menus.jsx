import { createContext, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import useOutsideClick from '../hooks/useOutsideClick';

const MenusContext = createContext();

function Menu({ children }) {
  return <div className="flex items-center justify-start">{children}</div>;
}

function Toggle({ id }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest('button').getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    openId === '' || openId !== id ? open(id) : close();
  }

  return (
    <button
      type="button"
      className="bg-none border-none p-2 rounded-sm transition-transform translate-x-2 hover:bg-primary-50"
      onClick={handleClick}
    >
      <HiEllipsisVertical className="w-6 h-6 fill-primary-900" />
    </button>
  );
}
function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(() => close(), false);

  if (openId !== id) return null;

  return createPortal(
    <ul
      className="fixed bg-skin text-primary-900 shadow-sm rounded-md"
      style={{ right: `${position.x}px`, top: `${position.y}px` }}
      ref={ref}
    >
      {children}
    </ul>,
    document.body
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <button
        type="button"
        className="w-full text-left bg-none border-none p-2 text-base transition-all flex items-center gap-4 hover:bg-primary-50 hover:rounded-md"
        onClick={handleClick}
      >
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
}

export default function Menus({ children }) {
  const [openId, setOpenId] = useState('');
  const close = () => setOpenId('');
  const open = setOpenId;
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      close();
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
