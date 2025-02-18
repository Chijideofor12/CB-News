import React from "react";

const SortBar = ({ sortBy, setSortBy, order, setOrder }) => {
  return (
    <div className="mt-4 flex items-center space-x-6">
      <div className="flex items-center">
        <label htmlFor="sort-by" className="text-white font-bold mr-2 text-lg">
          Sort by:
        </label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-56 p-3 text-lg rounded bg-transparent border border-white/40 text-white"
        >
          <option value="title">Title</option>
          <option value="created_at">Date</option>
          <option value="votes">Votes</option>
        </select>
      </div>
      <div className="flex items-center">
        <label htmlFor="order" className="text-white font-bold mr-2 text-lg">
          Order:
        </label>
        <select
          id="order"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="w-56 p-3 text-lg rounded bg-transparent border border-white/40 text-white"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </div>
  );
};

export default SortBar;
