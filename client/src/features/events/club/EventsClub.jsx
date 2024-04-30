import { useEvents } from "../useEvents.js";
import { useState } from "react";

import EventsClubTable from "./EventsClubTable.jsx";
import Spinner from "../../../ui/Spinner.jsx";
import SearchFilter from "../../../ui/SearchFilter.jsx";

export default function EventsClub() {
  const { events = [], isLoading } = useEvents();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("all");
  const [dateQuery, setDateQuery] = useState(new Date());

  function handleReset() {
    setSearchQuery("");
    setFilterQuery("all");
    setDateQuery(new Date());
  }

  const filteredEvents = events
    .filter((event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((event) =>
      filterQuery === "all" ? true : event.category === filterQuery,
    )
    .filter((event) => new Date(event.date) >= new Date(dateQuery));

  console.log(filteredEvents);

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="flex gap-8">
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
          <button className="bg-primary-orange px-4 py-2 rounded-md text-white font-semibold">
            Add New Event
          </button>
          {filteredEvents.length === 0 ? (
            <p className="text-xl">No Events Found</p>
          ) : (
            <EventsClubTable events={filteredEvents} />
          )}
        </div>
      </div>
    </>
  );
}
