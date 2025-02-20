import React from "react";
import NavBar from "./NavBar";
import { MobileMenu } from "./MobileMenu";
import { Footer } from "../Pages/FooterPage";

const Layout = ({ children, menuOpen, setMenuOpen }) => {
  return (
    <div className="min-h-screen bg-[rgba(10,10,10,0.8)] text-white flex flex-col">
      <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main className="flex-grow w-full px-4 sm:px-6 md:px-8 pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
