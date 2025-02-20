import "./index.css";
import { Route, Routes } from "react-router";
import "./App.css";
import { useState } from "react";
import { HomePage } from "./Pages/HomePage";
import { SingleArticle } from "./Pages/SingleArticlePage";
import { ErrorPage } from "./Components/ErrorPage";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import UserPage from "./Pages/UserPage";
import { NewArticle } from "./Pages/NewArticle";
import Layout from "./Components/Layout";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Layout menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/article" element={<HomePage />} />
        <Route path="/article/:article_id" element={<SingleArticle />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/NewArticle" element={<NewArticle />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
