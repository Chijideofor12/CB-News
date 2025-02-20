import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router";

export const NavBar = ({ menuOpen, setMenuOpen }) => {
  const [user, setUser] = useState(null);
  const currentUser = localStorage.getItem("currentUser");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (currentUser) {
      fetch(
        `https://backend-nc-news-q8rj.onrender.com/api/users/${currentUser}`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("User not found");
          }
          return res.json();
        })
        .then((data) => setUser(data.user))
        .catch((err) => {
          console.error(err);
          setUser(null);
        });
    }
  }, [currentUser]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 w-full z-40 bg-[rgba(10,10,10,0.8)] backdrop-blur-lg border-b-2 border-white/30 shadow-lg">
      <div className="w-full pl-4 pr-4 md:pr-16">
        <section className="flex flex-wrap items-center h-16">
          <NavLink to="/" className="font-mono text-xl font-bold text-white">
            CB<span className="text-blue-500">.News</span>
          </NavLink>
          <div className="flex-1" />
          {/* Hamburger menu for mobile */}
          <div
            className="text-2xl relative cursor-pointer z-40 md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            &#9776;
          </div>

          {/* Desktop Navigation */}
          <section className="hidden md:flex items-center space-x-8 ml-auto">
            <NavLink
              to="/home"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Home
            </NavLink>
            {currentUser && user ? (
              <>
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
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="flex items-center focus:outline-none"
                  >
                    <img
                      src={user.avatar_url}
                      alt={`${user.username}'s avatar`}
                      className="w-10 h-10 rounded-full cursor-pointer"
                    />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-4 w-40 bg-gray-800 rounded shadow-lg">
                      <NavLink
                        to="/profile"
                        className="block px-4 py-2 text-white hover:bg-gray-700"
                        onClick={() => setDropdownOpen(false)}
                      >
                        View Profile
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-white hover:bg-gray-700"
                      >
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
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
                  to="/users"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Users
                </NavLink>
              </>
            )}
          </section>
        </section>
      </div>
    </nav>
  );
};

export default NavBar;
