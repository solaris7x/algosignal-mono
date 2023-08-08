import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import hashSHA256 from "../helperFunctions/hashSHA256";
import { UserInfo } from "../App";
import logoutUser from "../helperFunctions/logoutUser";

export interface UpdatePasswordPageProps {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo | null) => void;
}

const UpdatePasswordPage = ({
  userInfo,
  setUserInfo,
}: UpdatePasswordPageProps) => {
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

    console.log(userInfo);

    try {
      // Setting explicit type for e.target to prevent using external libraries
      const eTarget = e.target as typeof e.target & {
        email: { value: string };
        existingPassword: { value: string };
        newPassword: { value: string };
        confirmPassword: { value: string };
      };

      // Destructure values for easier access
      const [email, existingPassword, newPassword, confirmPassword] = [
        eTarget.email.value,
        eTarget.existingPassword.value,
        eTarget.newPassword.value,
        eTarget.confirmPassword.value,
      ];
      console.log(email, existingPassword, newPassword, confirmPassword);

      // Validate password is the same as confirm password
      if (newPassword !== confirmPassword) {
        setErrorState("Confirm Passwords do not match");
        return;
      }

      if (email !== userInfo.email) {
        setErrorState("Invalid credentials");
        return;
      }

      // Send post request to backend
      try {
        const requestBody = {
          email: userInfo.email,
          passwordHash: await hashSHA256(existingPassword),
          newPasswordHash: await hashSHA256(newPassword),
        };

        console.log(requestBody);
        const res = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"
          }/user/updatePassword`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(requestBody),
          }
        );

        const resData = await res.json();
        console.log(resData);
        // If successful, redirect to UpdatePassword page
        if (res.ok) {
          setMessageState(
            "Password Updated successfully 🎉 Redirecting to Home"
          );
          // Redirect to UpdatePassword page
          setTimeout(() => {
            console.log("Please login again");
            // window.location.href = "/";
            logoutUser(setUserInfo);
            navigate("/");
          }, 2000);
        } else {
          // If unsuccessful, display error message
          setErrorState(resData?.message || "Could not verify user");
        }
      } catch (err: any) {
        // If unsuccessful, display error message
        setErrorState(err?.message || "Could not update password");
      }
    } catch (err) {
      setErrorState("Could not update password");
    } finally {
      setLoadingState(false);
    }
  };

  return (
    // User UpdatePassword form
    // Form with username/email, password
    <div className="">
      {/* Intro + tagline */}
      <div className="min-h-screen py-8 text-center flex flex-col justify-center items-center">
        {/* Form card */}
        <div className="text-white bg-blue-700 dark:bg-white dark:text-black p-4 rounded-lg w-2/3 md:w-1/3">
          <h2 className="text-3xl hover:text-blue-300 dark:text-blue-700 flex items-center justify-center gap-4 text-center">
            <Icon icon="ic:outline-password" className="text-4xl" />
            Update Password
          </h2>
          <form
            onSubmit={onSubmit}
            className="mt-5 py-6 flex flex-col items-center gap-4"
          >
            <input
              className="p-2 rounded-lg w-full border-2 border-blue-300 hover:border-blue-800"
              type="text"
              name="email"
              value={userInfo?.email}
              disabled
            />
            <input
              className="p-2 rounded-lg w-full border-2 border-blue-300 hover:border-blue-800"
              type="password"
              name="existingPassword"
              placeholder="Old Password"
            />
            <input
              className="p-2 rounded-lg w-full border-2 border-blue-300 hover:border-blue-800"
              type="password"
              name="newPassword"
              placeholder="Password"
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
              {
                // If loading, show spinner
                loadingState && (
                  <Icon icon="akar-icons:loading" className="animate-spin" />
                )
              }
              Update Password
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

export default UpdatePasswordPage;
