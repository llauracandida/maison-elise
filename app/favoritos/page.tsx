
"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/footer";

type FavoriteProduct = {
  name: string;
  category: string;
  price: string;
  image?: string;
};

const productImages: Record<string, string> = {
  "Essential Tailored Blazer": "/images/blazer.jpg",
  "Minimal Structure Bag": "/images/bag.jpg",
  "Modern Leather Shoes": "/images/shoes.jpg",
  "Signature Silver Necklace": "/images/necklace.jpg",
  "Classic Oversized Shirt": "/images/blazer.jpg",
  "Elegant Shoulder Bag": "/images/bag.jpg",
};

export default function FavoritosPage() {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("maisonFavorites");

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  function removeFavorite(name: string) {
    const updatedFavorites = favorites.filter(
      (product) => product.name !== name
    );

    setFavorites(updatedFavorites);
    localStorage.setItem("maisonFavorites", JSON.stringify(updatedFavorites));
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#292B2E]">
      <Header />

      <section className="mx-auto min-h-[65vh] max-w-[1400px] px-6 py-16 lg:px-16">
        <div className="mb-12 text-center">
          <p className="mb-4 text-[10px] tracking-[4px] text-[#8995A1]">
            YOUR PERSONAL SELECTION
          </p>

          <h1 className="font-serif text-4xl md:text-5xl">
            My Favorites
          </h1>

          <p className="mt-4 text-sm text-[#777]">
            The pieces you love, all in one place.
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="py-20 text-center">
            <span className="font-serif text-5xl">♡</span>

            <h2 className="mt-6 font-serif text-2xl">
              Your favorites are waiting
            </h2>

            <p className="mt-3 text-sm text-[#777]">
              You haven't saved any pieces yet.
            </p>

            <a
              href="/catalogo"
              className="mt-8 inline-block bg-[#292B2E] px-8 py-4 text-[10px] tracking-[2px] text-white transition hover:bg-[#8995A1]"
            >
              EXPLORE COLLECTION
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((product) => (
              <div
                key={product.name}
                className="border border-[#292B2E]/10 p-6"
              >
                <div className="h-80 overflow-hidden bg-[#EAE9E6]">
                  <img
                    src={product.image || productImages[product.name] || "/images/blazer.jpg"}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>

                <p className="mt-5 text-[9px] tracking-[2px] text-[#8995A1]">
                  {product.category}
                </p>

                <h2 className="mt-2 font-serif text-xl">
                  {product.name}
                </h2>

                <p className="mt-3 text-sm">{product.price}</p>

                <button
                  onClick={() => removeFavorite(product.name)}
                  className="mt-5 border-b border-[#292B2E] pb-1 text-[9px] tracking-[2px] transition hover:text-[#8995A1]"
                >
                  REMOVE FROM FAVORITES
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
