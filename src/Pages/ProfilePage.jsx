import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("currentUser");

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setLoading(true);
    fetch(`https://backend-nc-news-q8rj.onrender.com/api/users/${currentUser}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("User not found");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [currentUser, navigate]);

  if (loading)
    return <p className="pt-16 text-center text-white">Loading...</p>;

  if (!user)
    return (
      <section className="pt-16 text-center text-red-500 font-bold">
        <p>User not found.</p>
        <NavLink to="/" className="text-blue-300 hover:underline">
          Back to Home
        </NavLink>
      </section>
    );

  return (
    <section className="min-h-screen pt-16 flex flex-col items-center bg-[rgba(10,10,10,0.8)] text-white">
      <div className="flex flex-col items-center">
        <img
          src={user.avatar_url}
          alt={`${user.username}'s avatar`}
          className="w-32 h-32 rounded-full mb-4 border border-white/40"
        />
        <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
        <p className="text-lg">@{user.username}</p>
      </div>
      <NavLink
        to="/"
        className="mt-8 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
      >
        Back to Home
      </NavLink>
    </section>
  );
};

export default ProfilePage;
