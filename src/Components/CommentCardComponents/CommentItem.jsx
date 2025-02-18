import React from "react";

const CommentItem = ({ comment, avatarUrl }) => {
  return (
    <li className="border-b border-white/30 pb-2">
      <div className="flex items-center space-x-2 mb-1">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={`${comment.author}'s avatar`}
            className="w-6 h-6 rounded-full"
          />
        ) : (
          <div className="w-6 h-6 rounded-full bg-gray-500" />
        )}
        <span className="font-bold text-sm text-white">{comment.author}</span>
        <span className="text-xs text-gray-300">
          {new Date(comment.created_at).toLocaleString()}
        </span>
      </div>
      <p className="text-sm text-white">{comment.body}</p>
    </li>
  );
};

export default CommentItem;
