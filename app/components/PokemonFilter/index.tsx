"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const PokemonFilter = ({ types }: { types: string[] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPathName = usePathname();

  const selectedType = searchParams.get("type") || "normal";
  const searchQuery = searchParams.get("search") || "";

  const [search, setSearch] = useState(searchQuery);

  useEffect(() => {
    setSearch(searchQuery); // Sync state with URL when it changes
  }, [searchQuery]);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.replace(`${currentPathName}?type=${e.target.value}&search=${search}`);
  };

  const handleSearchChange = (val: string) => {
    setSearch(val);
    router.replace(`${currentPathName}?type=${selectedType}&search=${val}`);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
      {/* Dropdown */}
      <select
        className="w-full sm:w-1/3 px-4 py-2 text-sm rounded-md shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedType}
        onChange={handleTypeChange}
      >
        {types.map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={search}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="w-full sm:w-1/3 px-4 py-2 text-sm rounded-md shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default PokemonFilter;
