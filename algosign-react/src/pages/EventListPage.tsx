import EventListItem from "../components/home/EventListItem";

const EventListPage = () => {
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
          <EventListItem />
          <EventListItem />
          <EventListItem />
          <EventListItem />
        </ul>
      </div>
    </div>
  );
};

export default EventListPage;
