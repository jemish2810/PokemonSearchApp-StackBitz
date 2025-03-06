import Header from "@/app/components/UI/Header";
import Footer from "@/app/components/UI/Footer";
import Breadcrumb from "@/app/components/UI/Breadcrumb";

const PokemonDefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 pb-16 px-4 sm:px-6 lg:px-8 container mx-auto">
        <div className="sticky top-16 z-10 bg-white shadow-sm py-3 px-4 sm:px-6 lg:px-8">
          <Breadcrumb />
        </div>
        <div className="mt-4">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default PokemonDefaultLayout;
