import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const CommentItem = ({ comment, avatarUrl, currentUser, onDeleteSuccess }) => {
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(null);

  const handleDelete = () => {
    if (deleting) return;
    setDeleting(true);
    setDeleteError(null);
    setDeleteSuccess(null);

    fetch(
      `https://backend-nc-news-q8rj.onrender.com/api/comments/${comment.comment_id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete comment");
        }
      })
      .then(() => {
        setDeleteSuccess("Comment deleted successfully!");
        setTimeout(() => {
          onDeleteSuccess(comment.comment_id);
        }, 3000);
      })
      .catch((err) => {
        console.error(err);
        setDeleteError("Unable to delete comment. Please try again.");
        setDeleting(false);
      });
  };

  return (
    <li className="border-b border-white/30 pb-2 mb-4">
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

      {deleteError && (
        <p className="text-red-500 text-xs mt-2">{deleteError}</p>
      )}
      {deleteSuccess && (
        <p className="text-green-500 text-xs mt-2">{deleteSuccess}</p>
      )}
      {currentUser === comment.author && !deleteSuccess && (
        <div className="mt-2 flex items-center space-x-2">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center text-sm px-3 py-1 border border-white/30 rounded hover:bg-gray-700 text-white disabled:opacity-50"
          >
            <FaTrashAlt className="mr-1" />
            {deleting ? "Deleting..." : "Delete comment"}
          </button>
        </div>
      )}
    </li>
  );
};

export default CommentItem;
