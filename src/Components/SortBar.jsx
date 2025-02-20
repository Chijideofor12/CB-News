import React from "react";
import Select from "react-select";

const SortBar = ({ sortBy, setSortBy, order, setOrder }) => {
  const sortByOptions = [
    { value: "created_at", label: "Date" },
    { value: "title", label: "Title" },
    { value: "votes", label: "Votes" },
  ];

  const orderOptions = [
    { value: "desc", label: "Descending" },
    { value: "asc", label: "Ascending" },
  ];

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

  const selectedSortBy =
    sortByOptions.find((opt) => opt.value === sortBy) || null;
  const selectedOrder = orderOptions.find((opt) => opt.value === order) || null;

  return (
    <div className="mt-4 flex flex-col md:flex-row gap-4 justify-start">
      <div className="flex items-center">
        <label className="text-white font-bold text-lg w-24">Sort By:</label>
        <Select
          options={sortByOptions}
          value={selectedSortBy}
          onChange={(selected) => setSortBy(selected ? selected.value : "")}
          styles={customStyles}
          placeholder="Select"
          className="w-56"
        />
      </div>
      <div className="flex items-center">
        <label className="text-white font-bold text-lg w-24">Order By:</label>
        <Select
          options={orderOptions}
          value={selectedOrder}
          onChange={(selected) => setOrder(selected ? selected.value : "")}
          styles={customStyles}
          placeholder="Select"
          className="w-56"
        />
      </div>
    </div>
  );
};

export default SortBar;
