import { Icon } from "@iconify/react/dist/iconify.js";

const NewEventPage = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="text-3xl my-4 text-center font-bold text-white bg-blue-700 dark:bg-white dark:text-blue-700 p-4 rounded-lg w-2/3 md:w-1/3">
          New Events
        </div>
      </div>
      <form className="flex flex-col items-center">
        <div className="w-3/4 my-4 text-white bg-blue-500 dark:bg-white dark:text-black p-4 rounded-lg">
          <input
            className="text-2xl dark:text-blue-500 font-semibold p-4 text-start w-full border-2 "
            placeholder="Event Title"
          />

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
        <textarea
          className="w-3/4 my-4 text-black  dark:bg-white p-4 rounded-lg"
          placeholder="Event Body"
        />
        {/* Submit  */}
        <button className="w-1/2 md:w-1/3 my-4 font-semibold text-white bg-blue-500 dark:bg-blue-300 dark:text-black p-4 rounded-lg">
          Submit
        </button>
      </form>
    </>
  );
};

export default NewEventPage;
