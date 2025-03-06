const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center fixed bottom-0 left-0 w-full">
      <p>©{new Date().getFullYear()} PokemonSearchApp Search. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
