import { Context } from "../main";
import { useContext } from "react";

export default function GlobalStyles({ children }) {
  const { isDarkMode } = useContext(Context);

  return (
    <div
      className={`font-inter min-h-screen text-[#333] ${
        isDarkMode ? 'bg-[#2D2D2D]' : 'bg-[#fcfaf8]'
      }`}
    >
      {children}
    </div>
  );
}

