"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/footer";

export default function Produto() {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("Black");

  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#292B2E]">
      <Header />

      <section className="px-6 py-12 md:px-16 md:py-20">
        <div className="mb-10 text-[10px] tracking-[2px] text-[#8995A1]">
          HOME / CLOTHING / ESSENTIAL TAILORED BLAZER
        </div>

        <div className="grid gap-12 md:grid-cols-2">

          {/* IMAGEM DO PRODUTO */}
          <div className="flex aspect-[4/5] items-center justify-center bg-[#EAE9E6]">
            <span className="font-serif text-7xl text-[#292B2E]/20">
              ME
            </span>
          </div>

          {/* INFORMAÇÕES */}
          <div className="flex flex-col justify-center">

            <p className="mb-4 text-[10px] tracking-[3px] text-[#8995A1]">
              MAISON ÉLISE COLLECTION
            </p>

            <h1 className="font-serif text-4xl md:text-5xl">
              Essential Tailored Blazer
            </h1>

            <p className="mt-5 text-lg tracking-wider">
              R$ 890,00
            </p>

            <div className="my-8 border-t border-[#292B2E]/10" />

            <p className="text-sm leading-7 text-[#777]">
              A timeless piece designed to express individuality.
              With refined tailoring, a contemporary silhouette
              and sophisticated details, this blazer brings
              elegance and personality to every look.
            </p>

            {/* CORES */}
            <div className="mt-8">
              <p className="mb-4 text-[10px] tracking-[2px]">
                COLOR — {selectedColor.toUpperCase()}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedColor("Black")}
                  className={`h-8 w-8 rounded-full bg-[#292B2E] ${
                    selectedColor === "Black"
                      ? "ring-1 ring-[#292B2E] ring-offset-2"
                      : ""
                  }`}
                />

                <button
                  onClick={() => setSelectedColor("Gray")}
                  className={`h-8 w-8 rounded-full bg-[#8995A1] ${
                    selectedColor === "Gray"
                      ? "ring-1 ring-[#292B2E] ring-offset-2"
                      : ""
                  }`}
                />

                <button
                  onClick={() => setSelectedColor("White")}
                  className={`h-8 w-8 rounded-full border border-gray-300 bg-white ${
                    selectedColor === "White"
                      ? "ring-1 ring-[#292B2E] ring-offset-2"
                      : ""
                  }`}
                />
              </div>
            </div>

            {/* TAMANHOS */}
            <div className="mt-8">
              <p className="mb-4 text-[10px] tracking-[2px]">
                SELECT SIZE
              </p>

              <div className="flex gap-3">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-11 w-12 border text-xs transition ${
                      selectedSize === size
                        ? "border-[#292B2E] bg-[#292B2E] text-white"
                        : "border-[#292B2E]/20 hover:border-[#292B2E]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* BOTÃO */}
            <button
              onClick={() => {
                if (!selectedSize) {
                  alert("Please select a size.");
                  return;
                }

                alert(
                  `Product added to bag!\nSize: ${selectedSize}\nColor: ${selectedColor}`
                );
              }}
              className="mt-10 w-full bg-[#292B2E] py-5 text-[10px] tracking-[3px] text-white transition hover:bg-[#8995A1]"
            >
              ADD TO BAG
            </button>

            <button className="mt-4 border border-[#292B2E]/20 py-4 text-[10px] tracking-[2px] transition hover:border-[#292B2E]">
              ♡ ADD TO FAVORITES
            </button>

            <div className="mt-8 border-t border-[#292B2E]/10 pt-6">
              <p className="text-[10px] tracking-[2px]">
                PRODUCT DETAILS
              </p>

              <p className="mt-4 text-xs leading-6 text-[#777]">
                Composition: Premium fabric
                <br />
                Fit: Contemporary tailoring
                <br />
                Collection: Essential
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
