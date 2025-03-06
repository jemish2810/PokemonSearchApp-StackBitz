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
    <div className="relative w-full max-w-md">
      <button type="button" className="absolute left-2 top-1/2 -translate-y-1/2 p-1">
        <svg width="17" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          className="w-5 h-5 text-gray-700">
          <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
            strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </button>

      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
        className="w-full px-8 py-3 placeholder-gray-400 transition-all duration-300 shadow-md"
      />

      {query && (
        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 p-1" onClick={clearSearch}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchInput;
