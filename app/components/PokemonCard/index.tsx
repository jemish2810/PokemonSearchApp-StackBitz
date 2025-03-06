"use client";

import Link from "next/link";
import NextImage from '../UI/Image'

interface PokemonCardProps {
  name: string;
  pokemonType: string;
  id: number;
}

export default function PokemonCard({ name, id, pokemonType }: PokemonCardProps) {
  return (
    <Link
      href={`/pokemon/${name}?type=${pokemonType}`}
      className="pokemon-card w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl shadow-xl cursor-pointer snap-start shrink-0 py-6 px-4 sm:py-8 sm:px-6 bg-white flex flex-col items-start gap-2 sm:gap-3 transition-all duration-300 group hover:bg-[#202127] rounded-lg"
    >
      <NextImage
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt={name}
        width={60}
        height={60}
        priority
        className="h-10 w-10 sm:h-12 sm:w-12 group-hover:grayscale"
      />
      <p className="font-bold text-lg sm:text-2xl group-hover:text-white text-black/80 capitalize">
        {name}
      </p>
      <p className="text-gray-400 text-xs sm:text-sm">
        Discover detailed stats, abilities, and evolutions of {name}.
      </p>
      <p
        style={{
          WebkitTextStroke: "1px gray",
          WebkitTextFillColor: "transparent",
        }}
        className="text-3xl sm:text-5xl font-bold self-end"
      >
        # {id}
      </p>
    </Link>
  );
}
