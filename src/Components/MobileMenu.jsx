import { NavLink } from "react-router";

export const MobileMenu = ({ menuOpen, setMenuOpen }) => {
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
      <section className="absolute top-21 right-12 flex flex-col items-end space-y-4">
        <NavLink
          to="/home"
          onClick={() => setMenuOpen(false)}
          className="text-2xl font-semibold text-white transform transition-transform duration-300"
        >
          Home
        </NavLink>
        <NavLink
          to="/login"
          onClick={() => setMenuOpen(false)}
          className="text-2xl font-semibold text-white transform transition-transform duration-300"
        >
          Login
        </NavLink>

        <NavLink
          to="/NewArticle"
          onClick={() => setMenuOpen(false)}
          className="text-2xl font-semibold text-white transform transition-transform duration-300"
        >
          New Article
        </NavLink>
        <NavLink
          to="/Users"
          onClick={() => setMenuOpen(false)}
          className="text-2xl font-semibold text-white transform transition-transform duration-300"
        >
          Users
        </NavLink>
      </section>
    </div>
  );
};
