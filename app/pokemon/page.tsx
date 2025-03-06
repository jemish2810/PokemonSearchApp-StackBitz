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

  const debouncedType = useDebounce(selectedType, 500);
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
        console.error("Error fetching Pokémon types", error);
      }
    };

    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchByType = async () => {
      setLoading(true);
      try {
        const response = await fetchPokemonByType(debouncedType);
        setPokemonList(response);
      } catch (error) {
        console.error("Error fetching Pokémon by type", error);
      } finally {
        setLoading(false);
      }
    };

    if (debouncedType) {
      fetchByType();
    }
  }, [debouncedType]);

  const filteredPokemon = useMemo(() => {
    return pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [pokemonList, debouncedSearch]);

  useEffect(() => {
    router.replace(
      `${currentPathName}?type=${debouncedType}&search=${debouncedSearch}`,
      {
        scroll: false,
      }
    );
  }, [debouncedType, debouncedSearch, currentPathName, router]);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Pokémon List</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          className="w-full rounded md:w-1/3 px-8 py-3 shadow-md"
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
        <div className="flex justify-center my-6">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
            <p className="col-span-full text-center text-gray-500">
              No Pokémon found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PokemonList;
