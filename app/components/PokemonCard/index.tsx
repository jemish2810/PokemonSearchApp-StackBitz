"use client";

import Link from "next/link";
import Image from "next/image";

interface PokemonCardProps {
  name: string;
  pokemonType: string;
  id: number;
}

export default function PokemonCard({ name, id,pokemonType }: PokemonCardProps) {
  return (
    <Link
      href={`/pokemon/${name}?type=${pokemonType}`}
      className="pokemon-card w-[300px] shadow-xl cursor-pointer snap-start shrink-0 py-8 px-6 bg-white flex flex-col items-start gap-3 transition-all duration-300 group hover:bg-[#202127] rounded-lg"
    >
      <Image

        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt={name}
        width={60}
        height={60}
        priority
        className="h-12 w-12 group-hover:grayscale"
      />
      <p className="font-bold text-2xl group-hover:text-white text-black/80 capitalize">
        {name}
      </p>
      <p className="text-gray-400 text-sm">
        Discover detailed stats, abilities, and evolutions of {name}.
      </p>
      <p
        style={{
          WebkitTextStroke: "1px gray",
          WebkitTextFillColor: "transparent",
        }}
        className="text-5xl font-bold self-end"
      >
        # {id}
      </p>
    </Link>
  );
}
