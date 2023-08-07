import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Layout from "./utils/Layout";
import Page404 from "./utils/Page404";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import EventListPage from "./pages/EventListPage";

const App = () => {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user">
            <Route path="" element={<RegisterPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
          </Route>
          <Route path="/events">
            <Route path="" element={<EventListPage />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
};

export default App;
