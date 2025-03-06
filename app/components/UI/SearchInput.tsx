import { useState } from "react";

const SearchInput = ({ onSearch }: { onSearch?: (query: string) => void }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  const clearSearch = () => {
    setQuery("");
    onSearch?.("");
  };

  return (
    <div className="relative w-full sm:w-1/3">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
        className="w-full px-4 py-2 text-sm rounded-md shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {query && (
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
          onClick={clearSearch}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchInput;
