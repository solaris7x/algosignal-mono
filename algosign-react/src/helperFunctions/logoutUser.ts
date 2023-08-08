import { UserInfo } from "../App";

const logoutUser = async (setUserInfo: (userInfo: UserInfo | null) => void) => {
  try {
    // Call logout endpoint
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"
      }/user/logout`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    // Check if logout was successful
    if (!response.ok) {
      throw new Error("Server responded with " + response.status + " status");
    }

    // Clear user info
    setUserInfo(null);
  } catch (err) {
    console.error(err);
    alert("Failed to logout" + err);
  }
};

export default logoutUser;
