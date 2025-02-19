import React, { useState } from "react";
const CommentForm = ({ onSubmit, posting }) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ usernameInput, newComment });
    setUsernameInput("");
    setNewComment("");
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="mb-4 space-y-2">
      <input
        type="text"
        placeholder="Your username"
        value={usernameInput}
        onChange={(e) => setUsernameInput(e.target.value)}
        className="w-full p-2 border border-white/40 rounded bg-transparent text-white placeholder-gray-300"
        required
      />
      <textarea
        placeholder="Your comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="w-full p-2 border border-white/40 rounded bg-transparent text-white placeholder-gray-300"
        required
      />
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-white/40 rounded hover:bg-gray-700 text-white"
        disabled={posting}
      >
        {posting ? "Posting..." : "Submit Comment"}
      </button>
    </form>
  );
};

export default CommentForm;
