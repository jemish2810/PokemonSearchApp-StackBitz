import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PokedexApp | Explore & Search Pokemon',
  description: 'Discover and search for Pokemon by type, name, and attributes. Stay updated with the latest Pokemon data!',
  keywords: 'Pokemon, PokedexApp, Pokemon list, search Pokemon, Pokemon types',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
