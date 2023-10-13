// import React, { useState, useEffect } from "react";
// import useToken from "@galvanize-inc/jwtdown-for-react";
// import EventCard from "./EventCard";
// import "./ListEvents.css";
// import { Link } from "react-router-dom";

// function ListEvents() {
//   const { token, fetchWithToken } = useToken();
//   const [events, setEvents] = useState([]);
//   const [searchInput, setSearchInput] = useState("");
//   const [filteredEvents, setFilteredEvents] = useState([]);

//   useEffect(() => {
//     if (token) {
//       fetchEvents();

//     }
//   }, [token]);

//   useEffect(() => {
//     setFilteredEvents(events);
//   }, [events]);

//   const fetchEvents = async () => {
//     const url = `${process.env.REACT_APP_API_HOST}/api/events/`;
//     try {
//       const data = await fetchWithToken(url);
//       setEvents(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleSearchInputChange = (e) => {
//     const inputValue = e.target.value;
//     setSearchInput(inputValue);

//     if (events) {
//       const filtered = events.filter(
//         (event) =>
//           event.event_name &&
//           event.event_name.toLowerCase().includes(inputValue.toLowerCase())
//       );
//       setFilteredEvents(filtered);
//     }
//   };

//   return (
//     <div className="event-list">
//         <div id="top-bar">
//           <div id="logo">Helping Hands</div>
//           <div id="search" className="top-right">
//             <input
//               type="text"
//               placeholder="Search Events"
//               value={searchInput}
//               onChange={handleSearchInputChange}
//             />
//             <button>Search</button>
//           </div>
//         </div>
//         <main>
//           <section id="event-cards" className="event-cards">
//             {filteredEvents.map((event) => (
//               <Link to={`/events/${event.id}`} key={event.id}>
//                 <EventCard event={event} />
//               </Link>
//             ))}
//           </section>
//         </main>
//     </div>
//   );
// }

// export default ListEvents;
import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import EventCard from "./EventCard";
import "./ListEvents.css";
import { Link } from "react-router-dom";

function ListEvents() {
  const { token, fetchWithToken } = useToken();
  const [events, setEvents] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    if (token) {
      fetchEvents();
    }
  }, [token]);

  useEffect(() => {
    setFilteredEvents(events);
  }, [events]);

  const fetchEvents = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/api/events/`;
    try {
      const data = await fetchWithToken(url);
      setEvents(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);

    if (events) {
      const filtered = events.filter(
        (event) =>
          event.event_name &&
          event.event_name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  };

  return (
    <div className="background">
      <div id="top-bar">
        <div id="logo">Helping Hands</div>
        <div id="search" className="top-right">
          <input
            type="text"
            placeholder="Search Events"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          <button>Search</button>
        </div>
      </div>
      <main>
        <section id="event-cards" className="event-cards">
          {filteredEvents.map((event) => (
            <Link to={`/events/${event.id}`} key={event.id}>
              <EventCard event={event} />
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}

export default ListEvents;

