import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";

export const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser(localStorage.getItem("currentUser"));
  }, [menuOpen]);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-40 bg-[rgba(10,10,10,0.8)] transition-all duration-300 ease-in-out ${
        menuOpen
          ? "h-screen opacity-100 pointer-events-auto"
          : "h-0 opacity-0 pointer-events-none"
      }`}
    >
      <button
        onClick={() => setMenuOpen(false)}
        className="text-3xl absolute top-6 right-6 text-white focus:outline-none cursor-pointer"
        aria-label="Close Menu"
      >
        &times;
      </button>
      <section className="absolute top-[84px] right-4 flex flex-col items-end space-y-4">
        <NavLink
          to="/home"
          onClick={() => setMenuOpen(false)}
          className="text-2xl font-semibold text-white"
        >
          Home
        </NavLink>
        {currentUser ? (
          <>
            <NavLink
              to="/NewArticle"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-semibold text-white"
            >
              New Article
            </NavLink>
            <NavLink
              to="/users"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-semibold text-white"
            >
              Users
            </NavLink>
            <NavLink
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-semibold text-white"
            >
              Profile
            </NavLink>
            <button
              onClick={() => {
                localStorage.removeItem("currentUser");
                setMenuOpen(false);
              }}
              className="text-2xl font-semibold text-white focus:outline-none"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-semibold text-white"
            >
              Login
            </NavLink>
            <NavLink
              to="/NewArticle"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-semibold text-white"
            >
              New Article
            </NavLink>
            <NavLink
              to="/users"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-semibold text-white"
            >
              Users
            </NavLink>
          </>
        )}
      </section>
    </div>
  );
};

export default MobileMenu;
