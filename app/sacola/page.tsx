
"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/footer";

type CartItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
};

const productImages: Record<string, string> = {
  "Essential Tailored Blazer": "/images/blazer.jpg",
  "Minimal Structure Bag": "/images/bag.jpg",
  "Modern Leather Shoes": "/images/shoes.jpg",
  "Signature Silver Necklace": "/images/necklace.jpg",
  "Classic Oversized Shirt": "/images/blazer.jpg",
  "Elegant Shoulder Bag": "/images/bag.jpg",
};

const colorSwatches: Record<string, string> = {
  Black: "#292B2E",
  Ivory: "#E8E3D9",
  "Navy Blue": "#202D45",
  "Olive Green": "#66704B",
  "Moss Green": "#46533D",
  "Sage Green": "#A5B09A",
  Beige: "#D8C7A8",
  Brown: "#72503B",
  Nude: "#C6A58B",
  Silver: "#BFC3C7",
  Gold: "#C6A15B",
  White: "#F5F3ED",
  "Light Blue": "#B7C9D8",
  "Emerald Green": "#176B50",
  "Forest Green": "#244735",
};

export default function Sacola() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedBag = localStorage.getItem("maisonBag");

    if (savedBag) {
      const parsedBag = JSON.parse(savedBag);

      const formattedBag = parsedBag.map(
        (item: Omit<CartItem, "id">) => ({
          ...item,
          id: `${item.name}-${item.size}-${item.color}`,
        })
      );

      setItems(formattedBag);
    }

    setLoading(false);
  }, []);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalQuantity = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const formatPrice = (price: number) =>
    price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  function saveBag(updatedItems: CartItem[]) {
    setItems(updatedItems);

    localStorage.setItem(
      "maisonBag",
      JSON.stringify(
        updatedItems.map(({ id, ...item }) => item)
      )
    );
  }

  function changeQuantity(id: string, amount: number) {
    const updatedItems = items.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    );

    saveBag(updatedItems);
    window.dispatchEvent(new Event("maisonBagUpdated"));
  }

  function removeItem(id: string) {
    const updatedItems = items.filter((item) => item.id !== id);

    saveBag(updatedItems);
    window.dispatchEvent(new Event("maisonBagUpdated"));
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F7F5]">
        <Header />
        <p className="py-32 text-center text-sm text-[#777]">
          Loading your bag...
        </p>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#292B2E]">
      <Header />

      <section className="mx-auto max-w-[1300px] px-6 py-16 md:py-24">
        <div className="mb-14 text-center">
          <p className="mb-4 text-[10px] tracking-[5px] text-[#8995A1]">
            MAISON ÉLISE — YOUR SELECTION
          </p>

          <h1 className="font-serif text-5xl md:text-6xl">
            Shopping Bag
          </h1>

          <p className="mt-5 text-sm text-[#777]">
            Your selected pieces, carefully chosen.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-serif text-3xl">
              Your bag is empty.
            </p>

            <p className="mt-4 text-sm text-[#777]">
              Discover pieces that express your identity.
            </p>

            <a
              href="/catalogo"
              className="mt-8 inline-block bg-[#292B2E] px-10 py-4 text-[10px] tracking-[3px] text-white transition hover:bg-[#8995A1]"
            >
              EXPLORE COLLECTION
            </a>
          </div>
        ) : (
          <div className="grid gap-16 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <div className="mb-6 flex justify-between border-b border-[#292B2E]/15 pb-4 text-[10px] tracking-[2px]">
                <span>PRODUCT</span>
                <span>{totalQuantity} ITEMS</span>
              </div>

              <div className="space-y-8">
                {items.map((item) => (
                  <article
                    key={item.id}
                    className="grid grid-cols-[110px_1fr] gap-5 border-b border-[#292B2E]/10 pb-8 sm:grid-cols-[150px_1fr]"
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-[#EAE9E6]">
                      <img
                        src={productImages[item.name] || "/images/blazer.jpg"}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-col justify-between py-1">
                      <div>
                        <p className="text-[9px] tracking-[2px] text-[#8995A1]">
                          {item.category}
                        </p>

                        <h2 className="mt-2 font-serif text-xl">
                          {item.name}
                        </h2>

                        <div className="mt-3 flex items-center gap-2">
                          <span
                            className="h-4 w-4 rounded-full border border-[#292B2E]/20"
                            style={{
                              backgroundColor:
                                colorSwatches[item.color] || "#D8C7A8",
                            }}
                          />

                          <p className="text-xs text-[#777]">
                            Color: {item.color}
                          </p>
                        </div>

                        <p className="mt-2 text-xs text-[#777]">
                          Size: {item.size}
                        </p>

                        <p className="mt-3 text-sm">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      <div className="mt-5 flex items-center justify-between">
                        <div className="flex items-center border border-[#292B2E]/20">
                          <button
                            onClick={() => changeQuantity(item.id, -1)}
                            className="px-3 py-2 text-sm"
                          >
                            −
                          </button>

                          <span className="px-3 text-xs">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => changeQuantity(item.id, 1)}
                            className="px-3 py-2 text-sm"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[9px] tracking-[1px] text-[#8995A1] underline hover:text-[#292B2E]"
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <a
                href="/catalogo"
                className="mt-8 inline-block text-[10px] tracking-[2px] text-[#8995A1] hover:text-[#292B2E]"
              >
                ← CONTINUE SHOPPING
              </a>
            </div>

            <aside className="h-fit bg-[#EAE9E6] p-7 md:p-10">
              <h2 className="font-serif text-3xl">
                Order Summary
              </h2>

              <div className="mt-8 space-y-5 border-b border-[#292B2E]/15 pb-6">
                <div className="flex justify-between text-xs">
                  <span className="text-[#777]">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-[#777]">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between py-6">
                <span className="text-[10px] tracking-[2px]">
                  TOTAL
                </span>

                <span className="font-serif text-xl">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <a
                href="/checkout"
                className="block w-full bg-[#292B2E] py-5 text-center text-[10px] tracking-[3px] text-white transition hover:bg-[#8995A1]"
              >
                PROCEED TO CHECKOUT
              </a>

              <p className="mt-5 text-center text-[9px] leading-5 text-[#777]">
                This is a demonstrative shopping experience.
                No real payment will be processed.
              </p>
            </aside>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
