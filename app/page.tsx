"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen h-screen overflow-hidden text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to PokemonSearchApp World</h1>
      <p className="text-lg mb-6">Discover and explore your favorite Pokemon!</p>
      <button
        onClick={() => router.push("/pokemon")}
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Explore Pokemon
      </button>
    </div>
  );
}
