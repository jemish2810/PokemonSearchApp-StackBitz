import { fetchPokemonByType, fetchPokemonTypes } from "@/services/pokemonService";
import PokemonCard from "@/app/components/PokemonCard";
import PokemonFilter from '@/app/components/PokemonFilter'

const PokemonList = async ({ searchParams }: { searchParams: { type?: string; search?: string } }) => {
  const selectedType = searchParams.type || "normal";
  const searchQuery = searchParams.search || "";

  const typesResponse = await fetchPokemonTypes();
  const types = typesResponse.results.map((type: { name: string }) => type.name);

  const pokemonList = await fetchPokemonByType(selectedType);

  const filteredPokemon = pokemonList.filter((pokemon: { name: string }) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">Pokemon List</h1>

      <PokemonFilter types={types} />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredPokemon.length > 0 ? (
          filteredPokemon.map((pokemon: { name: string }, index: number) => (
            <PokemonCard key={pokemon.name} name={pokemon.name} id={index + 1} pokemonType={selectedType} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-6">No Pokémon found.</p>
        )}
      </div>
    </div>
  );
};

export default PokemonList;
