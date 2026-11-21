
"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/footer";

const products = [
  {
    name: "Essential Tailored Blazer",
    category: "CLOTHING",
    price: "R$ 890,00",
    priceValue: 890,
    image: "/images/blazer.jpg",
    description:
      "A timeless piece designed to redefine contemporary elegance. Featuring a sophisticated silhouette, clean lines and carefully selected details.",
    colors: [
      { name: "Black", color: "#292B2E" },
      { name: "Ivory", color: "#E8E3D9" },
      { name: "Navy Blue", color: "#202D45" },
    ],
  },
  {
    name: "Minimal Structure Bag",
    category: "BAGS",
    price: "R$ 650,00",
    priceValue: 650,
    image: "/images/bag.jpg",
    description:
      "A sophisticated accessory combining modern structure and timeless design. Created to bring elegance and personality to every look.",
    colors: [
      { name: "Olive Green", color: "#66704B" },
      { name: "Moss Green", color: "#46533D" },
      { name: "Sage Green", color: "#A5B09A" },
      { name: "Beige", color: "#D8C7A8" },
      { name: "Black", color: "#292B2E" },
    ],
  },
  {
    name: "Modern Leather Shoes",
    category: "SHOES",
    price: "R$ 720,00",
    priceValue: 720,
    image: "/images/shoes.jpg",
    description:
      "Contemporary footwear with a refined silhouette. A versatile design that combines comfort, sophistication and modern identity.",
    colors: [
      { name: "Black", color: "#292B2E" },
      { name: "Brown", color: "#72503B" },
      { name: "Nude", color: "#C6A58B" },
    ],
  },
  {
    name: "Signature Silver Necklace",
    category: "ACCESSORIES",
    price: "R$ 290,00",
    priceValue: 290,
    image: "/images/necklace.jpg",
    description:
      "A delicate statement piece designed to complement every style. Minimalist details meet timeless sophistication.",
    colors: [
      { name: "Silver", color: "#BFC3C7" },
      { name: "Gold", color: "#C6A15B" },
    ],
  },
  {
    name: "Classic Oversized Shirt",
    category: "CLOTHING",
    price: "R$ 420,00",
    priceValue: 420,
    image: "/images/blazer.jpg",
    description:
      "An effortless wardrobe essential with a relaxed silhouette and contemporary attitude. Perfect for versatile combinations.",
    colors: [
      { name: "White", color: "#F5F3ED" },
      { name: "Light Blue", color: "#B7C9D8" },
      { name: "Beige", color: "#D8C7A8" },
    ],
  },
  {
    name: "Elegant Shoulder Bag",
    category: "BAGS",
    price: "R$ 580,00",
    priceValue: 580,
    image: "/images/bag.jpg",
    description:
      "An elegant everyday accessory with a modern shape and refined details. Designed to complete your personal style.",
    colors: [
      { name: "Emerald Green", color: "#176B50" },
      { name: "Forest Green", color: "#244735" },
      { name: "Olive Green", color: "#66704B" },
      { name: "Beige", color: "#D8C7A8" },
      { name: "Black", color: "#292B2E" },
    ],
  },
];

const sizes = ["XS", "S", "M", "L", "XL"];

export default function Produto() {
  const [product, setProduct] = useState(products[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productName = params.get("nome");

    const selectedProduct = products.find(
      (item) => item.name === productName
    );

    if (selectedProduct) {
      setProduct(selectedProduct);
      setSelectedColor(selectedProduct.colors[0].name);
    }
  }, []);

  function addToBag() {
    if (!selectedSize) {
      setAdded(false);
      alert("Please select a size before continuing.");
      return;
    }

    const savedBag = localStorage.getItem("maisonBag");
    const bag = savedBag ? JSON.parse(savedBag) : [];

    const existingProduct = bag.find(
      (item: {
        name: string;
        size: string;
        color: string;
      }) =>
        item.name === product.name &&
        item.size === selectedSize &&
        item.color === selectedColor
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      bag.push({
        name: product.name,
        category: product.category,
        price: product.priceValue,
        size: selectedSize,
        color: selectedColor,
        quantity: 1,
      });
    }

    localStorage.setItem("maisonBag", JSON.stringify(bag));
    window.dispatchEvent(new Event("maisonBagUpdated"));
    setAdded(true);
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#292B2E]">
      <Header />

      <div className="px-6 py-8">
        <a
          href="/catalogo"
          className="text-[10px] tracking-[2px] text-[#8995A1] transition hover:text-[#292B2E]"
        >
          ← BACK TO COLLECTION
        </a>
      </div>

      <section className="grid grid-cols-1 gap-12 px-6 pb-24 md:grid-cols-2 md:gap-16">
        <div className="aspect-[4/5] overflow-hidden bg-[#EAE9E6]">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center py-4 md:py-12">
          <p className="text-[10px] tracking-[4px] text-[#8995A1]">
            {product.category} — COLLECTION 01
          </p>

          <h1 className="mt-5 font-serif text-4xl leading-tight md:text-5xl">
            {product.name}
          </h1>

          <p className="mt-5 text-sm tracking-wider">
            {product.price}
          </p>

          <div className="my-8 border-t border-[#292B2E]/10" />

          <p className="max-w-md text-sm leading-7 text-[#777]">
            {product.description}
          </p>

          <div className="mt-8">
            <p className="mb-4 text-[10px] tracking-[2px]">
              COLOR — {selectedColor.toUpperCase()}
            </p>

            <div className="flex flex-wrap gap-3">
              {product.colors.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setSelectedColor(item.name);
                    setAdded(false);
                  }}
                  aria-label={item.name}
                  title={item.name}
                  className={`h-9 w-9 rounded-full border ${
                    selectedColor === item.name
                      ? "border-[#292B2E] p-1"
                      : "border-transparent"
                  }`}
                >
                  <span
                    className="block h-full w-full rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[10px] tracking-[2px]">
                SELECT SIZE
              </p>

              <span className="text-[9px] tracking-wider text-[#8995A1]">
                SIZE GUIDE
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setAdded(false);
                  }}
                  className={`border py-3 text-xs transition ${
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

          <button
            onClick={addToBag}
            className="mt-8 w-full bg-[#292B2E] py-5 text-[10px] tracking-[3px] text-white transition hover:bg-[#8995A1]"
          >
            {added ? "ADDED TO BAG ✓" : "ADD TO BAG"}
          </button>

          {added && (
            <div className="mt-4 text-center">
              <p className="text-xs text-[#8995A1]">
                Product added successfully!
              </p>

              <a
                href="/sacola"
                className="mt-3 inline-block text-[10px] tracking-[2px] underline underline-offset-4"
              >
                VIEW MY BAG →
              </a>
            </div>
          )}

          <div className="mt-10 border-t border-[#292B2E]/10">
            <details className="border-b border-[#292B2E]/10 py-5">
              <summary className="cursor-pointer text-[10px] tracking-[2px]">
                PRODUCT DETAILS
              </summary>
              <p className="mt-4 text-xs leading-7 text-[#777]">
                A carefully selected design from the Maison Élise
                collection, created to express individuality and
                contemporary elegance.
              </p>
            </details>

            <details className="border-b border-[#292B2E]/10 py-5">
              <summary className="cursor-pointer text-[10px] tracking-[2px]">
                COMPOSITION & CARE
              </summary>
              <p className="mt-4 text-xs leading-7 text-[#777]">
                Carefully selected materials. Follow the recommended
                care instructions to preserve the quality of the piece.
              </p>
            </details>

            <details className="border-b border-[#292B2E]/10 py-5">
              <summary className="cursor-pointer text-[10px] tracking-[2px]">
                SHIPPING & RETURNS
              </summary>
              <p className="mt-4 text-xs leading-7 text-[#777]">
                Shipping and return information is illustrative for
                this portfolio project.
              </p>
            </details>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
