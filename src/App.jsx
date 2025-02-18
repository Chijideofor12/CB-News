import "./index.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { NavBar } from "./Components/NavBar";
import { MobileMenu } from "./Components/MobileMenu";
import { useState } from "react";
import { HomePage } from "./Pages/HomePage";
import { SingleArticle } from "./Pages/SingleArticlePage";
import { ErrorPage } from "./Components/ErrorPage";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <section>
        <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main className="mt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/article" element={<HomePage />} />
            <Route path="/article/:article_id" element={<SingleArticle />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>

        <footer />
      </section>
    </>
  );
}

export default App;
