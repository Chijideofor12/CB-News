import React, { useState } from "react";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (username.trim() === "") {
      setError("Username is required.");
      return;
    }

    setLoading(true);

    fetch(`https://backend-nc-news-q8rj.onrender.com/api/users/${username}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("User not found");
        }
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("currentUser", data.user.username);
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Login failed. Please try again.");
        setLoading(false);
      });
  };

  return (
    <section className="min-h-screen pt-15 flex justify-center items-center bg-[rgba(10,10,10,0.8)] text-white">
      <div className="w-full max-w-xl p-16 border border-white/30 rounded-xl bg-gray-800 shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Login
        </h1>
        <form onSubmit={handleSubmit} noValidate>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <div className="mb-6">
            <label htmlFor="username" className="block mb-2">
              Username (Please use sample username to log in: tickle122 )
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full p-3 rounded border border-gray-600 bg-gray-700 text-white placeholder-gray-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded transition-colors"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
