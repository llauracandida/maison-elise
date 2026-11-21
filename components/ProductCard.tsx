
"use client";

import { useEffect, useState } from "react";

type ProductCardProps = {
  name: string;
  category: string;
  price: string;
  image: string;
};

export default function ProductCard({
  name,
  category,
  price,
  image,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("maisonFavorites");

    if (savedFavorites) {
      const favorites = JSON.parse(savedFavorites);

      setIsFavorite(
        favorites.some((product: { name: string }) => product.name === name)
      );
    }
  }, [name]);

  function toggleFavorite() {
    const savedFavorites = localStorage.getItem("maisonFavorites");
    const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];

    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (product: { name: string }) => product.name !== name
      );

      localStorage.setItem(
        "maisonFavorites",
        JSON.stringify(updatedFavorites)
      );

      setIsFavorite(false);
    } else {
      const updatedFavorites = [
        ...favorites,
        { name, category, price },
      ];

      localStorage.setItem(
        "maisonFavorites",
        JSON.stringify(updatedFavorites)
      );

      setIsFavorite(true);
    }
  }

  return (
    <article className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#EAE9E6]">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <button
          type="button"
          onClick={toggleFavorite}
          aria-label={
            isFavorite
              ? `Remover ${name} dos favoritos`
              : `Adicionar ${name} aos favoritos`
          }
          className="absolute right-4 top-4 text-2xl text-[#292B2E] transition hover:text-[#8995A1]"
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div className="flex items-start justify-between gap-3 py-4">
        <div>
          <p className="text-[9px] tracking-[2px] text-[#8995A1]">
            {category}
          </p>

          <h3 className="mt-2 text-xs tracking-widest">
            {name}
          </h3>
        </div>

        <p className="text-xs tracking-wider">{price}</p>
      </div>
    </article>
  );
}
