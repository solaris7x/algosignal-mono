import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { EventProps } from "./EventPage";
import EventListItem from "../components/home/EventListItem";

const EventListPage = () => {
  // List of Events with pagination
  const [eventsList, setEventsList] = useState<EventProps[]>([]);

  const fetchEvents = async () => {
    // Fetch events list from backend
    // console.log("Fetch event triggered");
    const eventListRes = await fetch(
      `${import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"}/events/`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const { events: eventListData } = (await eventListRes.json()) as {
      events: EventProps[];
    };
    // console.log(eventListData);
    setEventsList(eventListData);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // List of Events with pagination
  return (
    <div className="">
      <div className="min-h-screen py-8 text-center flex flex-col justify-start items-center">
        {/* Heading */}
        <div className="text-3xl font-bold text-white bg-blue-700 dark:bg-white dark:text-blue-700 p-4 rounded-lg w-2/3 md:w-1/3">
          Events Timeline
        </div>
        {/* List of latest 5 Events */}
        <ul className="w-3/4 flex flex-col gap-4 mt-5">
          <li className="text-xl font-bold text-white bg-blue-700 dark:bg-white dark:text-blue-700 p-2 rounded-lg w-2/3 md:w-1/3 mx-auto">
            <Link to="new">Create new event</Link>
          </li>
          {
            // List of Events
            eventsList.length > 0 ? (
              eventsList.map((event, i) => (
                <EventListItem key={i} {...event} fetchEvents={fetchEvents} />
              ))
            ) : (
              <p>No events found</p>
            )
          }
        </ul>
      </div>
    </div>
  );
};

export default EventListPage;
