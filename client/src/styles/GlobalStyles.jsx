export default function GlobalStyles({ children }) {
  return (
    <div className="font-inter min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      {children}
    </div>
  );
}
