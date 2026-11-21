
"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    localStorage.setItem("maisonUser", email);
    setMessage("Welcome to Maison Élise!");
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#292B2E]">
      <Header />

      <section className="flex min-h-[75vh] items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <p className="mb-4 text-[10px] tracking-[4px] text-[#8995A1]">
              THE MAISON ÉLISE EXPERIENCE
            </p>

            <h1 className="font-serif text-4xl">
              Welcome Back
            </h1>

            <p className="mt-3 text-sm text-[#777]">
              Sign in to access your personal account.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="mb-2 block text-[10px] tracking-[2px]">
                EMAIL ADDRESS
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full border border-[#292B2E]/20 bg-transparent px-4 py-4 text-sm outline-none transition focus:border-[#8995A1]"
              />
            </div>

            <div>
              <label className="mb-2 block text-[10px] tracking-[2px]">
                PASSWORD
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full border border-[#292B2E]/20 bg-transparent px-4 py-4 text-sm outline-none transition focus:border-[#8995A1]"
              />
            </div>

            <div className="text-right">
              <a
                href="#"
                className="text-xs text-[#777] transition hover:text-[#8995A1]"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#292B2E] py-4 text-[10px] tracking-[3px] text-white transition hover:bg-[#8995A1]"
            >
              SIGN IN
            </button>

            {message && (
              <p className="text-center text-sm text-[#8995A1]">
                {message}
              </p>
            )}
          </form>

          <div className="my-8 border-t border-[#292B2E]/10" />

          <p className="text-center text-sm text-[#777]">
            Don't have an account?{" "}
            <a
              href="/cadastro"
              className="font-medium text-[#292B2E] underline underline-offset-4 hover:text-[#8995A1]"
            >
              Create account
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
