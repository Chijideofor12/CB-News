import React from "react";

export const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center mt-4 space-x-4">
      <button
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span className="text-lg">
        Page {page} of {totalPages}
      </span>
      <button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
