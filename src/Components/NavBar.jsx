import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export const NavBar = ({ menuOpen, setMenuOpen }) => {
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);
  return (
    <nav className="fixed top-0 w-full z-40 bg-[rgba(10,10,10,0.8)] backdrop-blur-lg border-b-2 border-white/30 shadow-lg">
      <div className="w-full pl-4 pr-16">
        <section className="flex items-center h-16">
          <NavLink to="/" className="font-mono text-xl font-bold text-white">
            CB<span className="text-blue-500">.News</span>
          </NavLink>
          <div className="flex-1" />

          {/* Hamburger menu that will be visible on mobile */}
          <div
            className="text-2xl relative cursor-pointer z-40 md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            &#9776;
          </div>

          {/* Navigation links that will be visible for desktop */}
          <section className="hidden md:flex items-center space-x-8 ml-auto">
            <NavLink
              to="/home"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Home
            </NavLink>
            <NavLink
              to="/login"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Login
            </NavLink>
            <NavLink
              to="/NewArticle"
              className="text-gray-300 hover:text-white transition-colors"
            >
              New Article
            </NavLink>
            <NavLink
              to="/Users"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Users
            </NavLink>
          </section>
        </section>
      </div>
    </nav>
  );
};
