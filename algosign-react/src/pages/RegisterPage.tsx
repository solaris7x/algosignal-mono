import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import hashSHA256 from "../helperFunctions/hashSHA256";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
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
        username: { value: string };
        email: { value: string };
        password: { value: string };
        confirmPassword: { value: string };
      };

      // Destructure values for easier access
      const [username, email, password, confirmPassword] = [
        eTarget.username.value,
        eTarget.email.value,
        eTarget.password.value,
        eTarget.confirmPassword.value,
      ];
      // console.log(username, email, password, confirmPassword);

      // Validate password is the same as confirm password
      if (password !== confirmPassword) {
        setErrorState("Confirm Passwords do not match");
        return;
      }

      // Send post request to backend
      try {
        const res = await fetch("http://localhost:3000/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username,
            email,
            passwordHash: await hashSHA256(password),
          }),
        });

        const resData = await res.json();
        console.log(resData);
        // If successful, redirect to login page
        if (res.ok) {
          setMessageState(
            "User registered successfully 🎉 Redirecting to Home"
          );
          // Redirect to login page
          setTimeout(() => {
            console.log("Redirecting now");
            // window.location.href = "/";
            navigate("/");
          }, 2000);
        } else {
          // If unsuccessful, display error message
          setErrorState(resData?.message || "Could not register user");
        }
      } catch (err: any) {
        // Check for user already exists
        setErrorState(err?.message || "Could not register user");
      }
    } catch (err) {
      setErrorState("Could not register user");
    } finally {
      setLoadingState(false);
    }
  };

  return (
    // User registration form
    // Form with username, email, password, and confirm password
    <div className="">
      {/* Intro + tagline */}
      <div className="min-h-screen py-8 text-center flex flex-col justify-center items-center">
        {/* Form card */}
        <div className="text-white bg-blue-700 dark:bg-white dark:text-black p-4 rounded-lg w-2/3 md:w-1/3">
          <h2 className="text-3xl hover:text-blue-300 dark:text-blue-700 flex items-center justify-center gap-4 text-center">
            <Icon icon="mdi:register" className="text-4xl" />
            Register
          </h2>
          <form
            onSubmit={onSubmit}
            className="mt-5 py-6 flex flex-col items-center gap-4"
          >
            <input
              className="p-2 rounded-lg w-full border-2 border-blue-300 hover:border-blue-800"
              type="text"
              name="username"
              placeholder="Username"
              required
            />
            <input
              className="p-2 rounded-lg w-full border-2 border-blue-300 hover:border-blue-800"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
            <input
              className="p-2 rounded-lg w-full border-2 border-blue-300 hover:border-blue-800"
              type="password"
              name="password"
              minLength={8}
              placeholder="Password"
              required
            />
            <input
              className="p-2 rounded-lg w-full border-2 border-blue-300 hover:border-blue-800"
              type="password"
              minLength={8}
              name="confirmPassword"
              placeholder="Confirm Password"
              // Should be the same as password

              required
            />
            <button
              type="submit"
              className="w-1/3 bg-blue-500 hover:bg-blue-400 rounded-lg p-2 text-white"
              disabled={loadingState}
            >
              {loadingState ? "Loading" : "Register"}
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

export default RegisterPage;
