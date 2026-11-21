
"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/footer";

const categories = [
  "ALL PRODUCTS",
  "CLOTHING",
  "SHOES",
  "BAGS",
  "ACCESSORIES",
];

const products = [
  {
    name: "Essential Tailored Blazer",
    category: "CLOTHING",
    price: "R$ 890,00",
    image: "/images/blazer.jpg",
  },
  {
    name: "Minimal Structure Bag",
    category: "BAGS",
    price: "R$ 650,00",
    image: "/images/bag.jpg",
  },
  {
    name: "Modern Leather Shoes",
    category: "SHOES",
    price: "R$ 720,00",
    image: "/images/shoes.jpg",
  },
  {
    name: "Signature Silver Necklace",
    category: "ACCESSORIES",
    price: "R$ 290,00",
    image: "/images/necklace.jpg",
  },
  {
    name: "Classic Oversized Shirt",
    category: "CLOTHING",
    price: "R$ 420,00",
    image: "/images/blazer.jpg",
  },
  {
    name: "Elegant Shoulder Bag",
    category: "BAGS",
    price: "R$ 580,00",
    image: "/images/bag.jpg",
  },
];

export default function Catalogo() {
  const [selectedCategory, setSelectedCategory] = useState("ALL PRODUCTS");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("maisonFavorites");

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFavorites(
          parsed.map((product: { name: string }) => product.name)
        );
      } catch {
        setFavorites([]);
      }
    }

    setLoaded(true);
  }, []);

  function toggleFavorite(product: typeof products[number]) {
    const saved = localStorage.getItem("maisonFavorites");
    const current = saved ? JSON.parse(saved) : [];

    const alreadyFavorite = current.some(
      (item: { name: string }) => item.name === product.name
    );

    const updated = alreadyFavorite
      ? current.filter(
          (item: { name: string }) => item.name !== product.name
        )
      : [
          ...current,
          {
            name: product.name,
            category: product.category,
            price: product.price,
          },
        ];

    localStorage.setItem("maisonFavorites", JSON.stringify(updated));

    setFavorites(
      updated.map((item: { name: string }) => item.name)
    );
  }

  const filteredProducts =
    selectedCategory === "ALL PRODUCTS"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#292B2E]">
      <Header />

      <section className="px-6 py-20 text-center md:py-28">
        <p className="mb-5 text-[10px] tracking-[5px] text-[#8995A1]">
          MAISON ÉLISE — THE COLLECTION
        </p>

        <h1 className="font-serif text-5xl md:text-7xl">
          The Collection
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-[#777]">
          Explore pieces that celebrate individuality, style and
          contemporary elegance.
        </p>
      </section>

      <section className="px-6 pb-24">
        <div className="mb-10 flex flex-wrap justify-center gap-6 border-b border-[#292B2E]/10 pb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`text-[10px] tracking-[2px] transition ${
                selectedCategory === category
                  ? "border-b border-[#292B2E] pb-2 text-[#292B2E]"
                  : "text-[#8995A1] hover:text-[#292B2E]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mb-8 flex items-center justify-between">
          <p className="text-[10px] tracking-[2px] text-[#777]">
            {filteredProducts.length} PRODUCTS
          </p>

          <span className="text-[10px] tracking-wider text-[#777]">
            FEATURED
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-8">
          {filteredProducts.map((product) => {
            const isFavorite = favorites.includes(product.name);

            return (
              <article key={product.name} className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#EAE9E6]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <button
                    type="button"
                    onClick={() => toggleFavorite(product)}
                    aria-label={
                      isFavorite
                        ? "Remover dos favoritos"
                        : "Adicionar aos favoritos"
                    }
                    className="absolute right-4 top-4 z-10 text-3xl text-[#292B2E] transition hover:scale-110 hover:text-[#8995A1]"
                  >
                    {loaded && isFavorite ? "♥" : "♡"}
                  </button>
                </div>

                <a
  href={`/produto?nome=${encodeURIComponent(product.name)}`}
  className="block"
>
                  <div className="flex items-start justify-between gap-3 py-4">
                    <div>
                      <p className="text-[9px] tracking-[2px] text-[#8995A1]">
                        {product.category}
                      </p>

                      <h2 className="mt-2 text-xs tracking-wide">
                        {product.name}
                      </h2>
                    </div>

                    <p className="whitespace-nowrap text-xs">
                      {product.price}
                    </p>
                  </div>
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}

