// src/Components/FilterTopicBar.jsx
import React, { useEffect, useState } from "react";
import Select from "react-select";

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
        // Map topics to react-select options
        const options = (data.topics || []).map((t) => ({
          value: t.slug,
          label: t.slug.charAt(0).toUpperCase() + t.slug.slice(1),
        }));
        setTopics(options);
      })
      .catch((err) => {
        console.error("Error fetching topics:", err);
      });
  }, []);

  // Find the currently selected option
  const selectedOption = topics.find((opt) => opt.value === topic) || null;

  // Custom styles for react-select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "1px solid rgba(255,255,255,0.4)",
      minHeight: "2.5rem",
      boxShadow: "none",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#1F2937",
      zIndex: 100,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#3B82F6" : "#1F2937",
      color: "white",
      "&:hover": {
        backgroundColor: "#3B82F6",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "rgba(255,255,255,0.7)",
    }),
  };

  return (
    <div className="mt-4 flex items-center">
      <label
        htmlFor="topic-select"
        className="text-white font-bold mr-6 text-lg"
      >
        Topics:
      </label>
      <Select
        inputId="topic-select"
        options={topics}
        value={selectedOption}
        onChange={(selected) => setTopic(selected ? selected.value : "")}
        styles={customStyles}
        placeholder="All"
        className="w-56"
      />
    </div>
  );
};

export default FilterTopicBar;
