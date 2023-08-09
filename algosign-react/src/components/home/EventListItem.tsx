import { Icon } from "@iconify/react/dist/iconify.js";
import { EventProps } from "../../pages/EventPage";
import { Link } from "react-router-dom";
import deleteEvent from "../../helperFunctions/deleteEvent";

// Event title card with Event title, author, date, and tags
const EventListItem = (
  props: Omit<EventProps, "body"> & { fetchEvents: () => Promise<void> }
) => {
  return (
    <li className="text-white bg-blue-500 dark:bg-white dark:text-black p-4 rounded-lg flex">
      <Link to={`/events/${props._id}`} className="hover:underline w-11/12">
        <h2 className="text-2xl dark:text-blue-500 font-semibold pb-4 text-start">
          {props.title || "Event Title"}
        </h2>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-4">
            <div className="flex flex-row gap-2 justify-center items-center">
              <Icon icon="mdi:account" className="text-lg" />
              <p>{props.author || "Author"}</p>
            </div>
            <div className="flex flex-row gap-2 justify-center items-center">
              <Icon icon="mdi:calendar" className="text-lg" />
              <p>{props.date.split("T")[0] || "Date"}</p>
            </div>
          </div>
          {/* <div className="flex flex-row gap-2 justify-center items-center">
          <Icon icon="mdi:tag" className="text-lg" />
          <p>Tags</p>
        </div> */}
        </div>
      </Link>
      {/* Delete post button */}
      <button
        className="flex flex-row gap-2 justify-center items-center bg-red-400 p-2 rounded-lg w-1/12"
        onClick={async () => {
          // console.log("Delete post button clicked");
          await deleteEvent(props._id);
          await props.fetchEvents();
        }}
      >
        <Icon icon="mdi:delete" className="text-2xl" />
      </button>
    </li>
  );
};

export default EventListItem;
