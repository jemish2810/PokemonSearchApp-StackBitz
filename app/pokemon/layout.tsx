import Header from "@/app/components/UI/Header";
import Footer from "@/app/components/UI/Footer";
import Breadcrumb from "@/app/components/UI/Breadcrumb";

const PokemonDefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 pb-16 p-4 container mx-auto">
        <Breadcrumb />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PokemonDefaultLayout;
