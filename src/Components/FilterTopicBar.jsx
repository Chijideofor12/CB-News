import React from "react";

const FilterTopicBar = ({ topic, setTopic }) => {
  return (
    <div className="mt-4 flex items-center">
      <label
        htmlFor="topic-select"
        className="text-white font-bold mr-4 text-lg"
      >
        Topics:
      </label>
      <select
        id="topic-select"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-56 p-3 text-lg rounded bg-transparent border border-white/40 text-white"
      >
        <option value="">All</option>
        <option value="coding">Coding</option>
        <option value="cooking">Cooking</option>
        <option value="football">Football</option>
      </select>
    </div>
  );
};

export default FilterTopicBar;
