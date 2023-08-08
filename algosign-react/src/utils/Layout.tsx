import { ReactNode, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

interface LayoutProps {
  children?: ReactNode;
}

/**
 * Default layout for the application
 */
const Layout = ({ children }: LayoutProps) => {
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
            {
              name: "Login",
              href: "/user/login",
              icon: "bi:gear-fill",
            },
            {
              name: "Register",
              href: "/user/register",
              icon: "bi:gear-fill",
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
              name: "Features",
              href: "/#features",
            },
            {
              name: "Tools",
              href: "/#tools",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Layout;
