import React from "react";

const CommentForm = ({
  username,
  newComment,
  posting,
  onUsernameChange,
  onCommentChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} noValidate className="mb-4 space-y-2">
      <input
        type="text"
        placeholder="Your username"
        value={username}
        onChange={onUsernameChange}
        className="w-full p-2 border border-white/40 rounded bg-transparent text-white placeholder-gray-300"
        required
      />
      <textarea
        placeholder="Your comment"
        value={newComment}
        onChange={onCommentChange}
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
