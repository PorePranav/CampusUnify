export default function SearchFilter({
  onSearch,
  onFilter,
  onDate,
  onReset,
  searchQuery,
  filterQuery,
  dateQuery,
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="font-bold">Keyword</p>
        <input
          className="h-12 rounded-md shadow-sm p-2"
          onChange={(e) => onSearch(e.target.value)}
          value={searchQuery}
          type="text"
          placeholder="Search by keyword"
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-bold">Category</p>
        <select
          className="bg-white h-12 rounded-md shadow-sm p-2"
          value={filterQuery}
          onChange={(e) => onFilter(e.target.value)}
          type="select"
          placeholder="Search by keyword"
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
      <div className="flex flex-col gap-2">
        <p className="font-bold">Date after</p>
        <input
          value={dateQuery}
          className="h-12 rounded-md shadow-sm p-2"
          onChange={(e) => onDate(e.target.value)}
          type="date"
          placeholder="Search by keyword"
        />
      </div>
      <button
        onClick={onReset}
        className="mt-4 h-12 rounded-md shadow-sm p-2 bg-primary-600 text-white font-semibold"
      >
        Clear Filters
      </button>
    </div>
  );
}
