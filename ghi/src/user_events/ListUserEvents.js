import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

function ListUserEvents({ userId }) {
  const { token, fetchWithToken } = useToken();
  const [userEvents, setUserEvents] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredUserEvents, setFilteredUserEvents] = useState([]);
  console.log(userId)
  useEffect(() => {
    if (userId && token) {
      fetchUserEvents(userId);
    }
  }, [token, userId]);

  useEffect(() => {
    setFilteredUserEvents(userEvents);
  }, [userEvents]);

  const fetchUserEvents = async (userId) => {
    const url = `${process.env.REACT_APP_API_HOST}/api/user/events/my-events?user_id=${userId}`;
    try {
      const data = await fetchWithToken(url);
      setUserEvents(data);
      setFilteredUserEvents(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);

    if (userEvents) {
      const filtered = userEvents.filter((event) => {
        const eventId = event.event_id || ""; 
        return eventId.toLowerCase().includes(inputValue.toLowerCase());
      });
      setFilteredUserEvents(filtered);
    }
  };


  return (
    <div className="background">
      <div id="top-bar">
        <div id="logo">Helping Hands</div>
        <div id="search" className="top-right">
          <input
            type="text"
            placeholder="Search User Events"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          <button>Search</button>
        </div>
      </div>
      <main>
        <section id="event-names" className="event-names">
          <ul>
            {filteredUserEvents.map((event) => (
              <li key={event.id} className="event-name">
                {event.event_id}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default ListUserEvents;
