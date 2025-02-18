import React from "react";
import { FaPlus } from "react-icons/fa";

const CommentsHeader = ({ onToggleForm }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-bold text-white">Comments</h2>
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-white/40 rounded hover:bg-gray-700 text-white"
        onClick={onToggleForm}
      >
        <FaPlus className="mr-2" />
        Add Comment
      </button>
    </div>
  );
};

export default CommentsHeader;
