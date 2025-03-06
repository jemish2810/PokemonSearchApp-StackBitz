import { fetchPokemonDetail } from "@/services/pokemonService";
import { Metadata } from 'next'
import NextImage from '@/app/components/UI/Image'

interface PokemonDetailProps {
  params: { pokemon_name: string };
}

export async function generateMetadata({ params }: PokemonDetailProps): Promise<Metadata> {
  const pokemonName = params.pokemon_name;
  const pokemon = await fetchPokemonDetail(pokemonName);

  if (!pokemon) {
    return {
      title: "Pokemon Not Found | PokemonSearchApp",
      description: "This Pokemon could not be found in our PokemonSearchApp.",
      robots: "noindex, nofollow",
    };
  }

  return {
    title: `${pokemon.name.toUpperCase()} | PokemonSearchApp`,
    description: `Discover details about ${pokemon.name}, including stats, abilities, and more.`,
    keywords: `PokemonSearchApp, ${pokemon.name}, Pokemon details`,
  };
}

const PokemonDetail = async ({ params }: PokemonDetailProps) => {
  const pokemon = await fetchPokemonDetail(params.pokemon_name);

  return (
    <div className="container mx-auto p-6 flex justify-center">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold capitalize text-center">{pokemon.name}</h1>
        
        <div className="flex justify-center my-4">
          <NextImage
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={150}
            height={150}
            priority
            className="rounded-md"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-lg font-semibold">Height</p>
            <p className="text-xl">{pokemon.height}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-lg font-semibold">Weight</p>
            <p className="text-xl">{pokemon.weight}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg col-span-2">
            <p className="text-lg font-semibold">Base Experience</p>
            <p className="text-xl">{pokemon.base_experience}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
