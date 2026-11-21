
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

type Order = {
  number: string;
  items: CartItem[];
  subtotal: number;
  totalQuantity: number;
  payment: string;
  date: string;
};

const productImages: Record<string, string> = {
  "Essential Tailored Blazer": "/images/blazer.jpg",
  "Minimal Structure Bag": "/images/bag.jpg",
  "Modern Leather Shoes": "/images/shoes.jpg",
  "Signature Silver Necklace": "/images/necklace.jpg",
  "Classic Oversized Shirt": "/images/blazer.jpg",
  "Elegant Shoulder Bag": "/images/bag.jpg",
};

export default function PedidoPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedOrder = localStorage.getItem("maisonLastOrder");

    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }

    setLoading(false);
  }, []);

  const formatPrice = (price: number) =>
    price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const paymentNames: Record<string, string> = {
    credit: "Credit Card",
    pix: "PIX",
    debit: "Debit Card",
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F7F5]">
        <Header />
        <p className="py-32 text-center text-sm">LOADING...</p>
        <Footer />
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] text-[#292B2E]">
        <Header />

        <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
          <h1 className="font-serif text-4xl">
            No order found
          </h1>

          <p className="mt-5 text-sm text-[#777]">
            You haven't completed a demonstration order yet.
          </p>

          <a
            href="/catalogo"
            className="mt-8 bg-[#292B2E] px-10 py-5 text-[10px] tracking-[3px] text-white hover:bg-[#8995A1]"
          >
            EXPLORE COLLECTION
          </a>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#292B2E]">
      <Header />

      <section className="mx-auto max-w-[1100px] px-6 py-16 md:py-24">
        <div className="text-center">
          <p className="text-[10px] tracking-[5px] text-[#8995A1]">
            MAISON ÉLISE
          </p>

          <div className="mx-auto mt-8 flex h-16 w-16 items-center justify-center rounded-full border border-[#8995A1]">
            <span className="text-3xl text-[#8995A1]">✓</span>
          </div>

          <h1 className="mt-8 font-serif text-5xl md:text-6xl">
            Order Confirmed
          </h1>

          <p className="mt-5 text-sm text-[#777]">
            Thank you for choosing Maison Élise.
          </p>

          <p className="mt-3 text-xs text-[#8995A1]">
            Your demonstration order has been completed successfully.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="border border-[#292B2E]/15 p-7 md:p-10">
            <p className="text-[9px] tracking-[3px] text-[#8995A1]">
              ORDER NUMBER
            </p>

            <h2 className="mt-3 font-serif text-3xl">
              {order.number}
            </h2>

            <div className="mt-8 border-t border-[#292B2E]/10 pt-6">
              <p className="text-[9px] tracking-[2px] text-[#8995A1]">
                ORDER DATE
              </p>

              <p className="mt-2 text-sm">{order.date}</p>
            </div>

            <div className="mt-6">
              <p className="text-[9px] tracking-[2px] text-[#8995A1]">
                PAYMENT METHOD
              </p>

              <p className="mt-2 text-sm">
                {paymentNames[order.payment] || order.payment}
              </p>
            </div>
          </div>

          <div className="bg-[#EAE9E6] p-7 md:p-10">
            <p className="text-[9px] tracking-[3px] text-[#8995A1]">
              ORDER SUMMARY
            </p>

            <h2 className="mt-3 font-serif text-3xl">
              Your Selection
            </h2>

            <div className="mt-7 space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b border-[#292B2E]/10 pb-4"
                >
                  <div className="h-24 w-20 shrink-0 overflow-hidden bg-[#D8D6D1]">
                    <img
                      src={productImages[item.name] || "/images/blazer.jpg"}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="text-xs font-medium">
                      {item.name}
                    </p>

                    <p className="mt-2 text-[10px] text-[#777]">
                      {item.color} / {item.size}
                    </p>

                    <p className="mt-1 text-[10px] text-[#777]">
                      Quantity: {item.quantity}
                    </p>

                    <p className="mt-2 text-xs">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between text-xs">
              <span className="text-[#777]">
                Total items
              </span>

              <span>{order.totalQuantity}</span>
            </div>

            <div className="mt-6 flex justify-between border-t border-[#292B2E]/15 pt-6">
              <span className="text-[10px] tracking-[2px]">
                TOTAL
              </span>

              <span className="font-serif text-xl">
                {formatPrice(order.subtotal)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="/"
            className="inline-block bg-[#292B2E] px-12 py-5 text-[10px] tracking-[3px] text-white transition hover:bg-[#8995A1]"
          >
            BACK TO HOME
          </a>

          <p className="mt-6 text-[9px] tracking-[2px] text-[#999]">
            WEAR YOUR IDENTITY.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
