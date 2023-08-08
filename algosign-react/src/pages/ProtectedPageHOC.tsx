import { ReactNode } from "react";
import { Link, Outlet } from "react-router-dom";

import { UserInfo } from "../App";

interface ProtectedPageProps {
  userInfo: UserInfo | null;
  children?: ReactNode;
}

const ProtectedPageHOC = ({ children, userInfo }: ProtectedPageProps) => {
  if (userInfo) {
    return (
      <>
        {children && children}
        <Outlet />
      </>
    );
  }
  return (
    <div className="flex flex-col items-center">
      <div className="w-3/4 my-6 mt-20 text-white bg-blue-500 dark:bg-white dark:text-black p-2 rounded-lg flex flex-col justify-center items-center">
        <h2 className="text-2xl dark:text-blue-500 font-semibold pb-4 text-center my-4">
          This page is required you to be logged in. <br />
        </h2>
        <Link to="/user/login">
          <button className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
            Head to login page.
          </button>
        </Link>
      </div>
    </div>
  );
};
export default ProtectedPageHOC;
