
"use client";

import { useEffect, useState } from "react";


  const navigation = [
  { name: "NEW IN", href: "/catalogo" },
  { name: "CLOTHING", href: "/catalogo?categoria=CLOTHING" },
  { name: "SHOES", href: "/catalogo?categoria=SHOES" },
  { name: "BAGS", href: "/catalogo?categoria=BAGS" },
  { name: "ACCESSORIES", href: "/catalogo?categoria=ACCESSORIES" },
  { name: "COLLECTIONS", href: "/catalogo" },
  { name: "ABOUT", href: "/#about" },
];


export default function Header() {
  const [bagCount, setBagCount] = useState(0);

  useEffect(() => {
    function updateBagCount() {
      const savedBag = localStorage.getItem("maisonBag");
      const items = savedBag ? JSON.parse(savedBag) : [];

      const total = items.reduce(
        (sum: number, item: { quantity: number }) =>
          sum + item.quantity,
        0
      );

      setBagCount(total);
    }

    updateBagCount();

    window.addEventListener("storage", updateBagCount);
    window.addEventListener("maisonBagUpdated", updateBagCount);

    return () => {
      window.removeEventListener("storage", updateBagCount);
      window.removeEventListener("maisonBagUpdated", updateBagCount);
    };
  }, []);

  return (
    <header className="border-b border-[#292B2E]/10 bg-[#F7F7F5]">
      {/* Announcement */}
      <div className="bg-[#292B2E] px-4 py-2 text-center text-[10px] tracking-[3px] text-white">
        DISCOVER THE NEW COLLECTION — MAISON ÉLISE
      </div>

      {/* Main navigation */}
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-7 lg:px-16">
        {/* Logo */}
        <a href="/" aria-label="Maison Élise Home">
          <span className="font-serif text-2xl tracking-[5px]">
            M<span className="font-light">E</span>
          </span>
        </a>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-7 text-[10px] tracking-[2px] lg:flex">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="transition-colors duration-300 hover:text-[#8995A1]"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4 text-[10px] tracking-widest sm:gap-5">
          <a href="/catalogo" className="hover:text-[#8995A1]">
            SEARCH
          </a>

          <a
            href="/favoritos"
            aria-label="Favorites"
            className="text-lg transition hover:text-[#8995A1]"
          >
            ♡
          </a>

          <a
            href="/sacola"
            className="transition hover:text-[#8995A1]"
          >
            BAG ({bagCount})
          </a>
        </div>
      </div>

      {/* Mobile navigation */}
      <nav className="flex gap-6 overflow-x-auto border-t border-[#292B2E]/10 px-6 py-3 text-[9px] tracking-[2px] lg:hidden">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="shrink-0 hover:text-[#8995A1]"
          >
            {item.name}
          </a>
        ))}
      </nav>
    </header>
  );
}
