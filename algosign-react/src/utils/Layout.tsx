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
          title="AlgoSign"
          links={[
            {
              name: "Home",
              href: "/",
              icon: "ant-design:home-outlined",
            },
            {
              name: "Features",
              href: "/#features",
              icon: "bi:gear-fill",
            },
            {
              name: "Tools",
              href: "/#tools",
              icon: "carbon:tools",
            },
          ]}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <div className="min-h-screen md:mt-20">{children && children}</div>
        {/* <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/merge"
                  element={
                    <Suspense fallback={<LoadingPage />}>
                      <MergePage />
                    </Suspense>
                  }
                />
                <Route path="*" element={<Page404 />} />
              </Routes>
            </BrowserRouter> */}
        <Footer
          name="AlgoSign"
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
