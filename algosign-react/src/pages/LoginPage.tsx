import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import hashSHA256 from "../helperFunctions/hashSHA256";
import { UserInfo } from "../App";

export interface LoginPageProps {
  setUserInfo: (userInfo: UserInfo) => void;
}

const LoginPage = (props: LoginPageProps) => {
  // Form state
  const [loadingState, setLoadingState] = useState(false);
  const [messageState, setMessageState] = useState<string | null>(null);
  const [errorState, setErrorState] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Dont refresh page
    e.preventDefault();
    // Reset states
    setLoadingState(true);
    setErrorState(null);
    setMessageState(null);

    try {
      // Setting explicit type for e.target to prevent using external libraries
      const eTarget = e.target as typeof e.target & {
        email: { value: string };
        password: { value: string };
      };

      // Destructure values for easier access
      const [email, password] = [eTarget.email.value, eTarget.password.value];
      // console.log(username, email, password, confirmPassword);

      // Send post request to backend
      const res = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"
        }/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            passwordHash: await hashSHA256(password),
          }),
        }
      );

      const resData = await res.json();
      console.log(resData);
      // If successful, redirect to login page
      if (res.ok) {
        setMessageState("User verified successfully 🎉 Redirecting to Events");
        // Set user info
        props.setUserInfo({
          username: resData.username,
          email: resData.email,
        });
        // Redirect to login page
        setTimeout(() => {
          console.log("Redirecting now");
          // window.location.href = "/";
          navigate("/events");
        }, 2000);
      } else {
        // If unsuccessful, display error message
        throw new Error(resData?.message || "Could not verify user");
      }
    } catch (err: any) {
      setErrorState(err?.message || "Could not verify user");
    } finally {
      setLoadingState(false);
    }
  };

  return (
    // User login form
    // Form with username/email, password
    <div className="">
      {/* Intro + tagline */}
      <div className="min-h-screen py-8 text-center flex flex-col justify-center items-center">
        {/* Form card */}
        <div className="text-white bg-blue-700 dark:bg-white dark:text-black p-4 rounded-lg w-2/3 md:w-1/3">
          <h2 className="text-3xl hover:text-blue-300 dark:text-blue-700 flex items-center justify-center gap-4 text-center">
            <Icon icon="ic:round-login" className="text-4xl" />
            Login
          </h2>
          <form
            onSubmit={onSubmit}
            className="mt-5 py-6 flex flex-col items-center gap-4"
          >
            <input
              className="p-2 rounded-lg w-full border-2 border-blue-300 hover:border-blue-800"
              type="text"
              name="email"
              placeholder="email"
            />
            <input
              className="p-2 rounded-lg w-full border-2 border-blue-300 hover:border-blue-800"
              type="password"
              name="password"
              placeholder="Password"
            />
            <button
              type="submit"
              className="w-1/3 bg-blue-500 hover:bg-blue-400 rounded-lg p-2 text-white"
              disabled={loadingState}
            >
              {
                // If loading, show spinner
                loadingState && (
                  <Icon icon="akar-icons:loading" className="animate-spin" />
                )
              }
              Login
            </button>
          </form>
          {errorState && (
            <p className="text-red-500 text-center">{errorState}</p>
          )}

          {messageState && (
            <p className="text-green-500 text-center">{messageState}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
