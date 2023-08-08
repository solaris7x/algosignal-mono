import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Layout from "./utils/Layout";
import Page404 from "./utils/Page404";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import EventListPage from "./pages/EventListPage";
import EventPage from "./pages/EventPage";
import NewEventPage from "./pages/NewEventPage";
import ProtectedPageHOC from "./pages/ProtectedPageHOC";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";

export interface UserInfo {
  username: string;
  email: string;
}

const App = () => {
  // Auth state
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const setUserInfoWithLocalStorage = (userInfo: UserInfo | null) => {
    // TODO: Check expiry
    if (userInfo === null) {
      localStorage.removeItem("userInfo");
      setUserInfo(null);
      return;
    }
    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        ...userInfo,
        expireAt:
          Date.now() + parseInt(import.meta.env.VITE_JWT_EXPIRY || "43200000"),
      })
    );
    setUserInfo(userInfo);
  };

  console.log(userInfo);

  // Persist auth state with local storage
  useEffect(() => {
    if (!userInfo) {
      const localUserInfowithExpiry = localStorage.getItem("userInfo");
      if (localUserInfowithExpiry) {
        const { expireAt, ...localUserInfo } = JSON.parse(
          localUserInfowithExpiry
        );
        if (Date.now() > expireAt) {
          localStorage.removeItem("userInfo");
          setUserInfo(null);
          return;
        }
        setUserInfoWithLocalStorage(localUserInfo);
      }
    }
  }, [userInfo]);

  return (
    <BrowserRouter>
      <Layout userInfo={userInfo} setUserInfo={setUserInfoWithLocalStorage}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user">
            <Route
              path=""
              element={<LoginPage setUserInfo={setUserInfoWithLocalStorage} />}
            />
            <Route
              path="register"
              element={
                <RegisterPage setUserInfo={setUserInfoWithLocalStorage} />
              }
            />
            <Route
              path="login"
              element={<LoginPage setUserInfo={setUserInfoWithLocalStorage} />}
            />
            <Route
              path="updatePassword"
              element={
                <ProtectedPageHOC userInfo={userInfo}>
                  <UpdatePasswordPage
                    userInfo={userInfo!}
                    setUserInfo={setUserInfoWithLocalStorage}
                  />
                </ProtectedPageHOC>
              }
            />
          </Route>
          <Route
            path="/events"
            element={<ProtectedPageHOC userInfo={userInfo} />}
          >
            <Route path="" element={<EventListPage />} />
            <Route path=":eventId" element={<EventPage />} />
            <Route path="new" element={<NewEventPage userInfo={userInfo!} />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
