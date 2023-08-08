import { Icon } from "@iconify/react/dist/iconify.js";

const EventPage = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-3/4 my-4 text-white bg-blue-500 dark:bg-white dark:text-black p-4 rounded-lg">
        <h2 className="text-2xl dark:text-blue-500 font-semibold pb-4 text-start">
          Event Title
        </h2>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-4">
            <div className="flex flex-row gap-2 justify-center items-center">
              <Icon icon="mdi:account" className="text-lg" />
              <p>Author</p>
            </div>
            <div className="flex flex-row gap-2 justify-center items-center">
              <Icon icon="mdi:calendar" className="text-lg" />
              <p>Date</p>
            </div>
          </div>
          <div className="flex flex-row gap-2 justify-center items-center">
            <Icon icon="mdi:tag" className="text-lg" />
            <p>Tags</p>
          </div>
        </div>
      </div>
      <div className="w-3/4 my-4 text-black  dark:bg-white p-4 rounded-lg">
        Event Body
      </div>
    </div>
  );
};

export default EventPage;
