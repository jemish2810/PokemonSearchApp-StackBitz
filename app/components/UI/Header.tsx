"use client";

import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 fixed top-0 left-0 w-full shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-lg font-bold">PokedexApp</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
