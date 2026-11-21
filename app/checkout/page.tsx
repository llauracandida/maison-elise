
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

export default function Checkout() {
  const [payment, setPayment] = useState("credit");
  const [confirmed, setConfirmed] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedBag = localStorage.getItem("maisonBag");

    if (savedBag) {
      const parsedItems = JSON.parse(savedBag);

      setItems(
        parsedItems.map((item: Omit<CartItem, "id">) => ({
          ...item,
          id: `${item.name}-${item.size}-${item.color}`,
        }))
      );
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

  function handleConfirm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const customer = {
      fullName: String(formData.get("fullName")),
      email: String(formData.get("email")),
      phone: String(formData.get("phone")),
      address: String(formData.get("address")),
      city: String(formData.get("city")),
      state: String(formData.get("state")),
      zip: String(formData.get("zip")),
    };

    const order = {
      number: "ME-2026-001",
      items,
      subtotal,
      totalQuantity,
      payment,
      date: new Date().toLocaleDateString("pt-BR"),
      customer,
    };

    localStorage.setItem("maisonLastOrder", JSON.stringify(order));

    localStorage.removeItem("maisonBag");
    window.dispatchEvent(new Event("maisonBagUpdated"));

    window.location.href = "/pedido";
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] text-[#292B2E]">
        <Header />
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-xs tracking-[3px]">LOADING...</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (confirmed) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] text-[#292B2E]">
        <Header />
        <section className="flex min-h-[65vh] flex-col items-center justify-center px-6 text-center">
          <p className="text-[10px] tracking-[5px] text-[#8995A1]">
            MAISON ÉLISE
          </p>
          <h1 className="mt-6 font-serif text-5xl md:text-6xl">
            Thank you!
          </h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-[#777]">
            Your demonstration order has been successfully completed.
            Thank you for being part of Maison Élise.
          </p>
          <a
            href="/"
            className="mt-10 bg-[#292B2E] px-10 py-5 text-[10px] tracking-[3px] text-white transition hover:bg-[#8995A1]"
          >
            BACK TO HOME
          </a>
        </section>
        <Footer />
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] text-[#292B2E]">
        <Header />
        <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
          <h1 className="font-serif text-4xl">
            Your bag is empty
          </h1>
          <p className="mt-5 text-sm text-[#777]">
            Add some pieces to your bag before checkout.
          </p>
          <a
            href="/catalogo"
            className="mt-8 bg-[#292B2E] px-10 py-5 text-[10px] tracking-[3px] text-white transition hover:bg-[#8995A1]"
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

      <section className="mx-auto max-w-[1300px] px-6 py-16 md:py-24">
        <div className="mb-14 text-center">
          <p className="mb-4 text-[10px] tracking-[5px] text-[#8995A1]">
            MAISON ÉLISE — FINAL STEP
          </p>
          <h1 className="font-serif text-5xl md:text-6xl">
            Checkout
          </h1>
          <p className="mt-5 text-sm text-[#777]">
            Complete your details to finalize your selection.
          </p>
        </div>

        <form
          onSubmit={handleConfirm}
          className="grid gap-16 lg:grid-cols-[1.5fr_1fr]"
        >
          <div className="space-y-12">
            <section>
              <h2 className="mb-7 font-serif text-3xl">
                Contact Information
              </h2>

              <div className="space-y-5">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full name"
                  required
                  className="w-full border-b border-[#292B2E]/20 bg-transparent px-1 py-4 text-sm outline-none placeholder:text-[#999] focus:border-[#292B2E]"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  required
                  className="w-full border-b border-[#292B2E]/20 bg-transparent px-1 py-4 text-sm outline-none placeholder:text-[#999] focus:border-[#292B2E]"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  required
                  className="w-full border-b border-[#292B2E]/20 bg-transparent px-1 py-4 text-sm outline-none placeholder:text-[#999] focus:border-[#292B2E]"
                />
              </div>
            </section>

            <section>
              <h2 className="mb-7 font-serif text-3xl">
                Shipping Address
              </h2>

              <div className="space-y-5">
                <input
                  type="text"
                  name="address"
                  placeholder="Street address"
                  required
                  className="w-full border-b border-[#292B2E]/20 bg-transparent px-1 py-4 text-sm outline-none placeholder:text-[#999] focus:border-[#292B2E]"
                />

                <div className="grid grid-cols-2 gap-5">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    required
                    className="w-full border-b border-[#292B2E]/20 bg-transparent px-1 py-4 text-sm outline-none placeholder:text-[#999] focus:border-[#292B2E]"
                  />

                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    required
                    className="w-full border-b border-[#292B2E]/20 bg-transparent px-1 py-4 text-sm outline-none placeholder:text-[#999] focus:border-[#292B2E]"
                  />
                </div>

                <input
                  type="text"
                  name="zip"
                  placeholder="ZIP / Postal code"
                  required
                  className="w-full border-b border-[#292B2E]/20 bg-transparent px-1 py-4 text-sm outline-none placeholder:text-[#999] focus:border-[#292B2E]"
                />
              </div>
            </section>

            <section>
              <h2 className="mb-7 font-serif text-3xl">
                Payment Method
              </h2>

              <div className="space-y-4">
                <label className="flex cursor-pointer items-center gap-4 border border-[#292B2E]/20 p-5">
                  <input
                    type="radio"
                    name="payment"
                    value="credit"
                    checked={payment === "credit"}
                    onChange={() => setPayment("credit")}
                  />
                  <span className="text-xs tracking-wider">
                    CREDIT CARD
                  </span>
                </label>

                <label className="flex cursor-pointer items-center gap-4 border border-[#292B2E]/20 p-5">
                  <input
                    type="radio"
                    name="payment"
                    value="pix"
                    checked={payment === "pix"}
                    onChange={() => setPayment("pix")}
                  />
                  <span className="text-xs tracking-wider">PIX</span>
                </label>

                <label className="flex cursor-pointer items-center gap-4 border border-[#292B2E]/20 p-5">
                  <input
                    type="radio"
                    name="payment"
                    value="debit"
                    checked={payment === "debit"}
                    onChange={() => setPayment("debit")}
                  />
                  <span className="text-xs tracking-wider">
                    DEBIT CARD
                  </span>
                </label>
              </div>

              <p className="mt-4 text-[10px] leading-5 text-[#8995A1]">
                Payment methods are illustrative. No real payment
                information is requested or processed.
              </p>
            </section>
          </div>

          <aside className="h-fit bg-[#EAE9E6] p-7 md:p-10">
            <h2 className="font-serif text-3xl">Your Order</h2>

            <div className="mt-8 space-y-6 border-b border-[#292B2E]/15 pb-7">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="h-24 w-20 shrink-0 overflow-hidden bg-[#D8D6D1]">
                    <img
                      src={productImages[item.name] || "/images/blazer.jpg"}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium">{item.name}</p>
                      <p className="mt-2 text-[10px] text-[#777]">
                        {item.color} / {item.size}
                      </p>
                      <p className="mt-1 text-[10px] text-[#777]">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="whitespace-nowrap text-xs">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 space-y-5">
              <div className="flex justify-between text-xs">
                <span className="text-[#777]">
                  Subtotal ({totalQuantity} items)
                </span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-[#777]">Shipping</span>
                <span>Free</span>
              </div>
            </div>

            <div className="mt-7 flex justify-between border-t border-[#292B2E]/15 pt-7">
              <span className="text-[10px] tracking-[2px]">TOTAL</span>
              <span className="font-serif text-xl">
                {formatPrice(subtotal)}
              </span>
            </div>

            <button
              type="submit"
              className="mt-8 w-full bg-[#292B2E] py-5 text-[10px] tracking-[3px] text-white transition hover:bg-[#8995A1]"
            >
              CONFIRM DEMO ORDER
            </button>

            <p className="mt-5 text-center text-[9px] leading-5 text-[#777]">
              This is a portfolio demonstration. No actual order or
              payment will take place.
            </p>
          </aside>
        </form>
      </section>

      <Footer />
    </main>
  );
}
