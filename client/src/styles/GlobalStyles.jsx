import { Context } from "../main";
import { useContext } from "react";

export default function GlobalStyles({ children }) {
  const { isDarkMode } = useContext(Context);

  return (
    <div
      className={`font-inter min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {children}
    </div>
  );
}
