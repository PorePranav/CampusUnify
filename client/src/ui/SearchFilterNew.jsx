import { HiMagnifyingGlass, HiChevronDown } from 'react-icons/hi2';

export default function SearchFilterNew({
  searchQuery,
  setSearchQuery,
  categoryQuery,
  setCategoryQuery,
  dateQuery,
  setDateQuery,
  sortQuery,
  setSortQuery,
}) {
  function handleReset() {
    setSearchQuery('');
    setCategoryQuery('all');
    setDateQuery(new Date('1970-01-01'));
    setSortQuery('all');
  }

  return (
    <>
      <div className="flex gap-2 justify-between mt-4">
        <div className="relative">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search for events"
            className="w-full pl-4 pr-10 py-2 rounded-lg bg-skin placeholder-primary-900 focus:outline-none"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <HiMagnifyingGlass className="text-primary-900" size={18} />
          </div>
        </div>
        <button
          className="px-3 rounded-lg w-[1fr] bg-primary-700 text-white font-semibold"
          onClick={handleReset}
        >
          Clear Filters
        </button>
      </div>
      <div className="flex gap-4 mt-4">
        <div className="w-1/3 h-32 border-2 border-skin flex flex-col gap-2 justify-center px-2 py-4 rounded-xl">
          <HiChevronDown size={24} />
          <p className="text-lg font-semibold">Category</p>
          <select
            className="bg-[#fcfaf8] appearance-none text-primary-900"
            value={categoryQuery}
            onChange={(e) => setCategoryQuery(e.target.value)}
          >
            <option value="all">All</option>
            <option value="academic">Academic</option>
            <option value="cultural">Cultural</option>
            <option value="competition">Competition</option>
            <option value="technical">Technical</option>
            <option value="artistic">Artistic</option>
            <option value="outdoor">Outdoor</option>
          </select>
        </div>
        <div className="w-1/3 h-32 border-2 border-skin flex flex-col gap-2 justify-center px-2 py-4 rounded-xl">
          <HiChevronDown size={24} />
          <p className="text-lg font-semibold">Date</p>
          <input
            type="date"
            className="appearance-none bg-[#fcfaf8] focus:outline-none text-primary-900 "
            onChange={(e) => setDateQuery(e.target.value)}
            value={dateQuery}
          />
        </div>
        <div className="w-1/3 h-32 border-2 border-skin flex flex-col gap-2 justify-center px-2 py-4 rounded-xl">
          <HiChevronDown size={24} />
          <p className="text-lg font-semibold">Sort By</p>
          <select
            className="bg-[#fcfaf8] appearance-none text-primary-900"
            value={sortQuery}
            onChange={(e) => setSortQuery(e.target.value)}
          >
            <option value="all">All</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </div>
      </div>
    </>
  );
}
