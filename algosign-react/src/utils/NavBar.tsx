import { useState } from "react";
import { Icon } from "@iconify/react";
import { UserInfo } from "../App";
import { Link, useNavigate } from "react-router-dom";
import logoutUser from "../helperFunctions/logoutUser";

interface NavBarProps {
  title: string;
  links: {
    name: string;
    href: string;
    icon: string;
  }[];
  darkMode: boolean;
  toggleDarkMode: () => void;
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo | null) => void;
}

const NavBar = (props: NavBarProps) => {
  const [mobileMenuHidden, setMobileMenuHidden] = useState<boolean>(true);
  const navigate = useNavigate();

  return (
    // DARK: bg
    <header className="w-full fixed bottom-0 md:bottom-auto md:top-0 bg-white dark:bg-[#212121]">
      {/* Mobile Menu */}
      <nav className="py-3 md:py-6 px-4 md:px-8 flex items-center md:text-xl">
        <Link
          to="/"
          className="text-blue-700 hover:text-blue-300 dark:text-blue-700 dark:hover:text-white font-bold md:text-2xl md:ml-4 flex items-center gap-2"
        >
          <Icon icon="ic:sharp-rocket-launch" className="md:text-4xl" />
          {props.title}
        </Link>

        {/* Menu */}
        {/* DARK: bg */}
        <div
          className={`md:ml-auto absolute bottom-0 left-0 md:static md:block bg-white dark:bg-[#212121] w-full md:w-auto ${
            mobileMenuHidden ? "hidden" : "block"
          }`}
        >
          <ul className="grid grid-cols-3 gap-4 px-6 pt-8 md:flex md:p-0 md:gap-8">
            {props.links.map((link, index) => (
              <li key={index} className="p-2 md:py-0">
                <Link
                  to={link.href}
                  className="hover:text-blue-700 flex flex-col items-center justify-center"
                  // href={link.href}
                >
                  <Icon icon={link.icon} className="md:hidden" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="w-full hover:text-blue-700 flex justify-end md:hidden">
            <button
              className="p-2 mr-2 mb-2"
              onClick={() => {
                setMobileMenuHidden((prev) => !prev);
              }}
              aria-label="Hide Menu"
            >
              <Icon
                icon="ant-design:close-circle-outlined"
                className="text-2xl"
              />
            </button>
          </div>
        </div>

        {/* Theme toggle */}
        <button
          className="ml-auto md:ml-8 p-2 text-lg hover:text-blue-700 flex flex-col justify-center items-center"
          onClick={() => props.toggleDarkMode()}
          aria-label="Toggle dark mode"
        >
          <Icon icon={props.darkMode ? "bi:moon" : "bi:sun"} />
        </button>

        {/* Login / Register or Logout*/}
        {!props.userInfo ? (
          <>
            <button
              className="ml-auto md:ml-8 p-2 text-lg hover:text-blue-700"
              onClick={() => navigate("/user/login")}
              aria-label="Login"
            >
              <Icon icon="ic:baseline-login" />
              <div className="hidden md:block">Login</div>
            </button>
            <button
              className="ml-auto md:ml-8 p-2 text-lg hover:text-blue-700 flex flex-col justify-center items-center"
              onClick={() => navigate("/user/register")}
              aria-label="Register"
            >
              <Icon icon="mdi:register" />
              <div className="hidden md:block">Register</div>
            </button>
          </>
        ) : (
          <>
            <button
              className="ml-auto md:ml-8 p-2 text-lg hover:text-blue-700 flex flex-col justify-center items-center"
              onClick={() => navigate("/user/updatePassword")}
              aria-label="Update Password"
            >
              <Icon icon="ic:outline-password" />
              <div className="hidden md:block">Update Password</div>
            </button>
            <button
              className="ml-auto md:ml-8 p-2 text-lg hover:text-blue-700 flex flex-col justify-center items-center"
              onClick={() => logoutUser(props.setUserInfo)}
              aria-label="Logout"
            >
              <Icon icon="ant-design:logout-outlined" />
              <div className="hidden md:block">Logout</div>
            </button>
          </>
        )}

        {/* Mobile Menu button */}
        <button
          className="md:hidden mx-4 text-lg hover:text-blue-700"
          onClick={() => {
            setMobileMenuHidden((prev) => !prev);
          }}
          aria-label="Toggle mobile menu"
        >
          <Icon icon="uil:apps" />
        </button>
      </nav>
    </header>
  );
};
export default NavBar;
