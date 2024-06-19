import { useEvents } from '../useEvents.js';
import { useState } from 'react';

import EventsClubTable from '../EventsTable.jsx';
import Spinner from '../../../ui/Spinner.jsx';
import SearchFilter from '../../../ui/SearchFilter.jsx';
import AddEvent from './AddEvent.jsx';

export default function EventsClub() {
  const { events = [], isLoading } = useEvents();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState('all');
  const [dateQuery, setDateQuery] = useState(new Date());

  function handleReset() {
    setSearchQuery('');
    setFilterQuery('all');
    setDateQuery(new Date('1970-01-01T00:00:00.000Z'));
  }

  const filteredEvents = events
    .filter((event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((event) =>
      filterQuery === 'all' ? true : event.category === filterQuery
    )
    .filter((event) => new Date(event.date) >= new Date(dateQuery));

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="flex gap-8 mb-4">
        <div className="flex flex-col gap-4 w-1/4">
          <h1 className="text-xl">Filter Options</h1>
          <SearchFilter
            onSearch={setSearchQuery}
            onFilter={setFilterQuery}
            onDate={setDateQuery}
            onReset={handleReset}
            searchQuery={searchQuery}
            filterQuery={filterQuery}
            dateQuery={dateQuery}
          />
        </div>
        <div>
          <AddEvent />
          {filteredEvents.length === 0 ? (
            <p className="text-xl mt-4">There are no events currently listed</p>
          ) : (
            <EventsClubTable events={filteredEvents} />
          )}
        </div>
      </div>
    </>
  );
}
