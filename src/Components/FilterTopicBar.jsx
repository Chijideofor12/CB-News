import React, { useEffect, useState } from "react";

const FilterTopicBar = ({ topic, setTopic }) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetch("https://backend-nc-news-q8rj.onrender.com/api/topics")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch topics");
        }
        return res.json();
      })
      .then((data) => {
        setTopics(data.topics || []);
      })
      .catch((err) => {
        console.error("Error fetching topics:", err);
      });
  }, []);

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
        {topics.map((t) => (
          <option key={t.slug} value={t.slug}>
            {t.slug}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterTopicBar;
