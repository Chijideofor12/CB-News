import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    fetch("https://backend-nc-news-q8rj.onrender.com/api/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error fetching users");
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data.users || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setFetchError(
          "There was an error fetching users. Please try again later."
        );
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="pt-16 text-center text-white">Loading users...</p>;
  if (fetchError)
    return (
      <p className="pt-16 text-center text-red-500 font-bold">{fetchError}</p>
    );

  return (
    <section className="min-h-screen pt-16 p-4 bg-[rgba(10,10,10,0.8)] text-white">
      <h1 className="text-center text-3xl font-bold mb-6">Users</h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.username}
            className="rounded-xl p-6 border border-white/30 hover:translate-y-1 transition-all flex flex-col items-center"
          >
            <img
              src={user.avatar_url}
              alt={`${user.username}'s avatar`}
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-gray-300">@{user.username}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <NavLink to="/" className="text-blue-300 hover:underline">
          Back to Home
        </NavLink>
      </div>
    </section>
  );
};

export default UserPage;
