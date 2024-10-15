import React from 'react';
import { HiChevronDown, HiMagnifyingGlass, HiXMark } from 'react-icons/hi2';

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
    setDateQuery('');
    setSortQuery('all');
  }

  return (
    <div className="my-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search for events"
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <HiMagnifyingGlass
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:white"
            size={18}
          />
        </div>
        <button
          type="button"
          className="px-4 py-2 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          onClick={handleReset}
        >
          <span className="flex items-center justify-center">
            <HiXMark className="mr-2" size={18} />
            Clear Filters
          </span>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        <div className="my-2">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Category
          </label>
          <div className="relative mt-2">
            <select
              id="category"
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md appearance-none bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <HiChevronDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
        <div className="my-2">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            className="block mt-2 w-full pl-3 pr-10 py-2 border text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white "
            onChange={(e) => setDateQuery(e.target.value)}
            value={dateQuery}
          />
        </div>
        <div className="my-2">
          <label
            htmlFor="sort"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Sort By
          </label>
          <div className="relative mt-2">
            <select
              id="sort"
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md appearance-none bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={sortQuery}
              onChange={(e) => setSortQuery(e.target.value)}
            >
              <option value="all">All</option>
              <option value="date">Date</option>
              <option value="priceL2H">Price: Low to High</option>
              <option value="priceH2L">Price: High to Low</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <HiChevronDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
