import { ReactNode, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { UserInfo } from "../App";

interface LayoutProps {
  children?: ReactNode;
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo | null) => void;
}

/**
 * Default layout for the application
 */
const Layout = ({ children, userInfo, setUserInfo }: LayoutProps) => {
  // DARK: setup
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    // addNotification(`🌓 Switched to ${darkMode ? "light" : "dark"} mode`)
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-white text-black dark:bg-[#212121] dark:text-white md:mt-0 relative text-xl">
        <NavBar
          title="AlgoSignal"
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          links={[
            {
              name: "Home",
              href: "/",
              icon: "ant-design:home-outlined",
            },
            {
              name: "Events",
              href: "/events",
              icon: "carbon:tools",
            },
          ]}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <div className="md:mt-20"></div>
        <div className="min-h-screen">{children && children}</div>
        <Footer
          name="AlgoSignal"
          subtitle="Auth assignment with JWT"
          links={[
            {
              name: "Home",
              href: "/",
            },
            {
              name: "Github",
              href: "https://github.com/solaris7x",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Layout;
