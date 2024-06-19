export default function PageLayout({ children }) {
  return (
    <div className="w-[80%] mx-auto m-2">
      {children}
      <p className="text-sm text-primary-700 text-center bottom-0 mt-12">
        &copy; 2024 CampusUnify. All rights reserved
      </p>
    </div>
  );
}
