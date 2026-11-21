
import Header from "@/components/Header";
import Footer from "@/components/footer";

export default function About() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#292B2E]">
      <Header />

      {/* INTRODUÇÃO */}
      <section className="px-6 py-24 text-center md:py-32">
        <p className="mb-6 text-[10px] tracking-[5px] text-[#8995A1]">
          OUR PHILOSOPHY
        </p>

        <h1 className="font-serif text-5xl leading-tight md:text-8xl">
          Wear your identity.
        </h1>

        <p className="mx-auto mt-8 max-w-xl text-sm leading-8 text-[#777]">
          Fashion is more than what we wear.
          It is a language, a feeling and a reflection
          of who we are.
        </p>
      </section>

      {/* MANIFESTO */}
      <section className="grid md:grid-cols-2">
        <div className="flex min-h-[450px] items-center justify-center bg-[#EAE9E6] p-12">
          <div className="text-center">
            <p className="font-serif text-6xl text-[#292B2E]/20">
              ME
            </p>

            <p className="mt-4 text-[10px] tracking-[5px] text-[#8995A1]">
              MAISON ÉLISE
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center px-8 py-20 md:px-20">
          <p className="mb-5 text-[10px] tracking-[3px] text-[#8995A1]">
            WHO WE ARE
          </p>

          <h2 className="font-serif text-4xl leading-snug md:text-5xl">
            A world of individuality.
          </h2>

          <p className="mt-8 text-sm leading-8 text-[#777]">
            Maison Élise was born from the belief that style
            has no boundaries. We celebrate individuality,
            creativity and the freedom to express yourself
            through fashion.
          </p>

          <p className="mt-5 text-sm leading-8 text-[#777]">
            Every piece represents a possibility. Every look,
            a story waiting to be told. We believe that true
            elegance is not about following trends, but about
            discovering what makes you unique.
          </p>
        </div>
      </section>

      {/* ESSÊNCIA */}
      <section className="px-6 py-24 text-center md:px-24 md:py-32">
        <p className="mb-6 text-[10px] tracking-[4px] text-[#8995A1]">
          OUR ESSENCE
        </p>

        <h2 className="font-serif text-4xl md:text-6xl">
          Beyond fashion.
        </h2>

        <div className="mx-auto mt-16 grid max-w-5xl gap-12 md:grid-cols-3">
          <div>
            <h3 className="font-serif text-2xl">
              Identity
            </h3>

            <p className="mt-4 text-xs leading-7 text-[#777]">
              Your style is your signature.
              Wear what represents you.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-2xl">
              Freedom
            </h3>

            <p className="mt-4 text-xs leading-7 text-[#777]">
              Fashion without limits.
              Expression without rules.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-2xl">
              Elegance
            </h3>

            <p className="mt-4 text-xs leading-7 text-[#777]">
              A timeless vision of contemporary
              sophistication.
            </p>
          </div>
        </div>
      </section>

      {/* FRASE FINAL */}
      <section className="bg-[#292B2E] px-6 py-24 text-center text-[#F7F7F5] md:py-32">
        <p className="mb-8 text-[10px] tracking-[4px] text-[#8995A1]">
          MAISON ÉLISE
        </p>

        <h2 className="font-serif text-4xl leading-relaxed md:text-6xl">
          Fashion is personal.
          <br />
          Identity is everything.
        </h2>

        <p className="mt-8 text-[10px] tracking-[4px] text-[#8995A1]">
          WEAR YOUR IDENTITY.
        </p>
      </section>

      <Footer />
    </main>
  );
}
