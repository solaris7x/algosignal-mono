import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useParams } from "react-router-dom";

export interface EventProps {
  _id: string;
  title: string;
  author: string;
  date: string;
  body: string;
}

const EventPage = () => {
  // Get event ID from URL
  const { eventId } = useParams();

  const [eventData, setEventData] = useState<EventProps | null>(null);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState<boolean>(false);

  const fetchPostData = async () => {
    setLoadingState(true);
    setErrorState(null);

    try {
      const eventListRes = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"
        }/events/${eventId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const { eventData } = (await eventListRes.json()) as {
        eventData: EventProps;
      };

      // console.log(eventData);
      setEventData(eventData);
    } catch (err: any) {
      setErrorState(err?.message || "Something went wrong");
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, []);

  if (loadingState) {
    return (
      <div className="flex flex-col items-center pt-8">Loading event...</div>
    );
  }

  if (errorState || !eventData) {
    return (
      <div className="flex flex-col items-center pt-8">
        <p className="text-red-500 dark:text-red-400">
          {errorState || "Couldnt fetch data"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center pt-8">
      <div className="w-3/4 my-4 text-white bg-blue-500 dark:bg-white dark:text-black p-4 rounded-lg">
        <h2 className="text-2xl dark:text-blue-500 font-semibold pb-4 text-start">
          {eventData.title || "Event Title"}
        </h2>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-4">
            <div className="flex flex-row gap-2 justify-center items-center">
              <Icon icon="mdi:account" className="text-lg" />
              <p>{eventData.author || "Author"}</p>
            </div>
            <div className="flex flex-row gap-2 justify-center items-center">
              <Icon icon="mdi:calendar" className="text-lg" />
              <p>{eventData.date.split("T")[0] || "Date"}</p>
            </div>
          </div>
          {/* <div className="flex flex-row gap-2 justify-center items-center">
            <Icon icon="mdi:tag" className="text-lg" />
            <p>Tags</p>
          </div> */}
        </div>
      </div>
      <div className="w-3/4 my-4 text-black  dark:bg-white p-4 rounded-lg">
        {eventData.body || "Event Body"}
      </div>
    </div>
  );
};

export default EventPage;
