import React from "react";
import { NavLink } from "react-router";

export const ErrorPage = () => {
  return (
    <section className="min-h-screen pt-16 flex flex-col items-center justify-center bg-[rgba(10,10,10,0.8)] text-white">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Page Not Found</p>
      <NavLink
        to="/"
        className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
      >
        Back to Home
      </NavLink>
    </section>
  );
};
