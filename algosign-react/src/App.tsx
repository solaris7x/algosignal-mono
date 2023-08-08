import { useState } from "react";
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

  console.log(userInfo);

  return (
    <BrowserRouter>
      <Layout userInfo={userInfo} setUserInfo={setUserInfo}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user">
            <Route path="" element={<LoginPage setUserInfo={setUserInfo} />} />
            <Route
              path="register"
              element={<RegisterPage setUserInfo={setUserInfo} />}
            />
            <Route
              path="login"
              element={<LoginPage setUserInfo={setUserInfo} />}
            />
            <Route
              path="updatePassword"
              element={
                <ProtectedPageHOC userInfo={userInfo}>
                  <UpdatePasswordPage
                    userInfo={userInfo!}
                    setUserInfo={setUserInfo}
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
            <Route path="id" element={<EventPage />} />
            <Route path="new" element={<NewEventPage />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
