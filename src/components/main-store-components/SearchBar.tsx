import React from "react";

const SearchBar = () => {
  return (
    <div className="w-full relative flex items-center justify-end">
      <input
        placeholder="search"
        className="block w-full h-12 p-4 pr-12 text-gray-900 border border-gray-300 rounded-xl bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <svg
        className="absolute right-4 cursor-pointer"
        width="26"
        height="26"
        viewBox="0 0 26 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="11.9167" cy="11" rx="6.5" ry="6" stroke="#585858" />
        <path
          d="M21.6667 20L18.4167 17"
          stroke="#585858"
          stroke-linecap="round"
        />
      </svg>
    </div>
  );
};

export default SearchBar;
