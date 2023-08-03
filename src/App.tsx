import { Route, Routes, useNavigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import PageNotFound from "./pages/404/PageNotFound";
import BookmarksPage from "./pages/Bookmarks/BookmarksPage";
import HomePage from "./pages/Home/HomePage";
import ProfilePage from "./pages/Profile/ProfilePage";

import {
  handleIncomingRedirect,
  onSessionRestore,
} from "@inrupt/solid-client-authn-browser";
import { useEffect } from "react";
import { PrivateRoute } from "./components/PrivateRoute";
import LoginCallBack from "./pages/LoginCallBack/LoginCallBack";

function App() {
  const navigate = useNavigate();
  onSessionRestore((url) => {
    console.log(
      "🚀 ~ file: App.tsx:42 ~ onSessionRestore ~ navigate:",
      navigate
    );
    navigate(url);
  });
  // useEffect(() => {
  // }, [navigate]);
  useEffect(() => {
    handleIncomingRedirect({
      restorePreviousSession: true,
    })
      .then((info: any) => {
        console.log("🚀 ~ file: App.tsx:50 ~ .then ~ info:", info);
      })
      .catch((error) => {
        console.log("🚀 ~ file: App.tsx:54 ~ useEffect ~ error:", error);
      });
  }, []);

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/callback" element={<LoginCallBack />} />
        <Route element={<PrivateRoute />}>
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
