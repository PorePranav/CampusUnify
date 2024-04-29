import { useState } from "react";
import { useEvents } from "./useEvents";

import SearchFilter from "../../ui/SearchFilter";
import Spinner from "../../ui/Spinner";
import EventClubCard from "./EventClubCard";

export default function EventsClubTable() {
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
    .filter((event) => new Date(event.days[0]?.date) >= new Date(dateQuery));

  if (isLoading) return <Spinner />;

  return (
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
      <div className="w-3/4">
        <h1 className="text-xl">My Events</h1>
        <div className="grid grid-cols-3 mt-4 gap-4">
          {filteredEvents.length === 0 && (
            <p className="text-xl">No Events Found</p>
          )}
          {filteredEvents.map((event) => (
            <EventClubCard key={event._id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
