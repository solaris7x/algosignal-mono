import { useState } from "react";

import { Icon } from "@iconify/react/dist/iconify.js";
import { UserInfo } from "../App";
import { useNavigate } from "react-router-dom";

export interface NewEventPageProps {
  userInfo: UserInfo;
}

const NewEventPage = ({ userInfo }: NewEventPageProps) => {
  // Form state
  const [loadingState, setLoadingState] = useState(false);
  const [messageState, setMessageState] = useState<string | null>(null);
  const [errorState, setErrorState] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Reset states
    setLoadingState(true);
    setErrorState(null);
    setMessageState(null);

    const eTarget = e.target as typeof e.target & {
      title: { value: string };
      author: { value: string };
      date: { value: string };
      body: { value: string };
    };

    const [title, _author, date, body] = [
      eTarget.title.value,
      eTarget.author.value,
      eTarget.date.value,
      eTarget.body.value,
    ];
    // console.log(title, author, date, body);

    // Send post request to backend
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"
        }/events/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            title,
            date,
            body,
          }),
        }
      );

      const resData = await res.json();
      console.log(resData);
      // If successful, redirect to login page
      if (res.ok) {
        setMessageState("Post created successfully 🎉 Redirecting to Events");
        // Redirect to login page
        setTimeout(() => {
          console.log("Redirecting now");
          // window.location.href = "/";
          navigate("/events");
        }, 2000);
      } else {
        // If unsuccessful, display error message
        throw new Error(resData?.message || "Could not create post");
      }
    } catch (err: any) {
      setErrorState(err?.message || "Could not create post");
    } finally {
      setLoadingState(false);
    }
  };

  // Get post author from userInfo
  const postAuthor = userInfo.email;

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="text-3xl mt-20 text-center font-bold text-white bg-blue-700 dark:bg-white dark:text-blue-700 p-4 rounded-lg w-2/3 md:w-1/3">
          New Events
        </div>
      </div>
      <form className="flex flex-col items-center" onSubmit={onSubmit}>
        <div className="w-3/4 my-4 text-white bg-blue-500 dark:bg-white dark:text-black p-4 rounded-lg">
          <input
            className="text-2xl dark:text-blue-500 font-semibold p-2 my-2 text-start w-full border-2 "
            name="title"
            type="text"
            placeholder="Event Title"
          />
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-4">
              <div className="flex flex-row gap-2 justify-center items-center">
                <Icon icon="mdi:account" className="text-lg" />
                <input
                  name="author"
                  type="text"
                  value={postAuthor || "Author"}
                  disabled
                />
              </div>
              <label className="flex flex-row gap-2 justify-center items-center">
                {/* <Icon icon="mdi:calendar" className="text-lg" /> */}
                <input
                  className="text-black text-center dark:bg-white p-2 rounded-lg"
                  name="date"
                  type="date"
                  defaultValue={new Date().toISOString().slice(0, 10)}
                />
              </label>
            </div>
            {/* <div className="flex flex-row gap-2 justify-center items-center">
              <Icon icon="mdi:tag" className="text-lg" />
              <p>Tags</p>
            </div> */}
          </div>
        </div>
        <textarea
          className="w-3/4 min-h-[30vh] my-4 text-black  dark:bg-white p-4 rounded-lg"
          name="body"
          placeholder="Event Body"
        />
        {/* Submit  */}
        <button
          className="w-1/2 md:w-1/3 my-4 font-semibold text-white bg-blue-500 dark:bg-blue-300 dark:text-black p-4 rounded-lg"
          disabled={loadingState}
        >
          {
            // If loading, show spinner
            loadingState && (
              <Icon icon="akar-icons:loading" className="animate-spin" />
            )
          }
          Submit
        </button>
        {errorState && <p className="text-red-500 text-center">{errorState}</p>}

        {messageState && (
          <p className="text-green-500 text-center">{messageState}</p>
        )}
      </form>
    </>
  );
};

export default NewEventPage;
