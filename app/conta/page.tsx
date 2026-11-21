
"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/footer";

export default function ContaPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName(localStorage.getItem("maisonName") || "Maison Client");
    setEmail(localStorage.getItem("maisonUser") || "No email registered");
  }, []);

  function handleLogout() {
    localStorage.removeItem("maisonUser");
    localStorage.removeItem("maisonName");
    window.location.href = "/login";
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#292B2E]">
      <Header />

      <section className="mx-auto max-w-[1200px] px-6 py-16 lg:px-16">
        <div className="mb-12">
          <p className="mb-3 text-[10px] tracking-[4px] text-[#8995A1]">
            YOUR PERSONAL SPACE
          </p>

          <h1 className="font-serif text-4xl">
            My Account
          </h1>

          <p className="mt-3 text-sm text-[#777]">
            Welcome to your Maison Élise experience.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-[280px_1fr]">
          <aside className="border border-[#292B2E]/10 p-7">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#8995A1]/20 font-serif text-3xl">
              ME
            </div>

            <h2 className="font-serif text-2xl">{name}</h2>
            <p className="mt-2 break-all text-xs text-[#777]">{email}</p>

            <div className="my-7 border-t border-[#292B2E]/10" />

            <button
              onClick={handleLogout}
              className="text-[10px] tracking-[2px] text-[#777] transition hover:text-[#8995A1]"
            >
              SIGN OUT →
            </button>
          </aside>

          <div className="space-y-8">
            <div className="border border-[#292B2E]/10 p-8">
              <p className="mb-5 text-[10px] tracking-[3px] text-[#8995A1]">
                PERSONAL INFORMATION
              </p>

              <h2 className="font-serif text-2xl">
                Account Details
              </h2>

              <div className="mt-7 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-[9px] tracking-[2px] text-[#8995A1]">
                    FULL NAME
                  </p>
                  <p className="text-sm">{name}</p>
                </div>

                <div>
                  <p className="mb-2 text-[9px] tracking-[2px] text-[#8995A1]">
                    EMAIL ADDRESS
                  </p>
                  <p className="break-all text-sm">{email}</p>
                </div>
              </div>
            </div>

            <div className="border border-[#292B2E]/10 p-8">
              <p className="mb-5 text-[10px] tracking-[3px] text-[#8995A1]">
                YOUR PURCHASES
              </p>

              <h2 className="font-serif text-2xl">
                Order History
              </h2>

              <div className="mt-7 border-t border-[#292B2E]/10 pt-7 text-center">
                <p className="font-serif text-xl">
                  No orders yet
                </p>

                <p className="mt-2 text-sm text-[#777]">
                  Your future Maison Élise purchases will appear here.
                </p>

                <a
                  href="/catalogo"
                  className="mt-6 inline-block bg-[#292B2E] px-8 py-4 text-[10px] tracking-[2px] text-white transition hover:bg-[#8995A1]"
                >
                  EXPLORE COLLECTION
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
