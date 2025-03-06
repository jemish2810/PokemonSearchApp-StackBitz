"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import {
  fetchPokemonByType,
  fetchPokemonTypes,
  Pokemon,
} from "@/services/pokemonService";
import PokemonCard from "@/app/components/PokemonCard";
import SearchInput from "@/app/components/UI/SearchInput";
import Loader from "@/app/components/UI/Loader";

const PokemonList = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPathName = usePathname();

  const selectedType = searchParams.get("type") || "normal";
  const searchQuery = searchParams.get("search") || "";

  const debouncedSearch = useDebounce(searchQuery, 500);

  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetchPokemonTypes();
        setTypes(response.results.map((type: { name: string }) => type.name));
      } catch (error) {
        console.error("Error fetching Pokemon types", error);
      }
    };

    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchByType = async () => {
      setLoading(true);
      try {
        const response = await fetchPokemonByType(selectedType);
        setPokemonList(response);
      } catch (error) {
        console.error("Error fetching Pokemon by type", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedType) {
      fetchByType();
    }
  }, [selectedType]);

  const filteredPokemon = useMemo(() => {
    return pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [pokemonList, debouncedSearch]);

  useEffect(() => {
    router.replace(
      `${currentPathName}?type=${selectedType}&search=${debouncedSearch}`,
      { scroll: false }
    );
  }, [selectedType, debouncedSearch, currentPathName, router]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">
        Pokemon List
      </h1>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
        <select
          className="w-full sm:w-1/3 px-4 py-2 text-sm rounded-md shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedType}
          onChange={(e) =>
            router.replace(
              `${currentPathName}?type=${e.target.value}&search=${searchQuery}`
            )
          }
        >
          {types.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>

        <SearchInput
          onSearch={(val) =>
            router.replace(
              `${currentPathName}?type=${selectedType}&search=${val}`
            )
          }
        />
      </div>

      {loading ? (
        <div className="flex justify-center my-8">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredPokemon.length > 0 ? (
            filteredPokemon.map((pokemon, index) => (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                id={index + 1}
                pokemonType={selectedType}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 py-6">
              No Pokemon found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PokemonList;
