
import Header from "@/components/Header";
import Footer from "@/components/footer";
import ProductCard from "@/components/ProductCard";

const collections = [
  {
    name: "Clothing",
    description: "Contemporary essentials",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900",
  },
  {
    name: "Shoes",
    description: "Designed to stand out",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=900",
  },
  {
    name: "Accessories",
    description: "The finishing touch",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900",
  },
];

const products = [
  {
    name: "Essential Tailored Blazer",
    category: "CLOTHING",
    price: "R$ 890,00",
    image: "/images/blazer.jpg",
  },
  {
    name: "Minimal Structure Bag",
    category: "BAGS",
    price: "R$ 650,00",
    image: "/images/bag.jpg",
  },
  {
    name: "Modern Leather Shoes",
    category: "SHOES",
    price: "R$ 720,00",
    image: "/images/shoes.jpg",
  },
  {
    name: "Signature Silver Necklace",
    category: "ACCESSORIES",
    price: "R$ 290,00",
    image: "/images/necklace.jpg",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#292B2E]">

      {/* Header */}
      <Header />

      {/* Hero Campaign */}
      <section
        className="relative flex min-h-[620px] items-center justify-center bg-cover bg-center px-6 text-center text-white md:min-h-[750px]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(20,22,24,0.35),rgba(20,22,24,0.45)), url('https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=2000')",
        }}
      >
        <div className="max-w-3xl">
          <p className="mb-7 text-[10px] tracking-[5px]">
            MAISON ÉLISE — NEW SEASON
          </p>

          <h1 className="font-serif text-6xl font-normal leading-tight md:text-8xl">
            Wear your
            <br />
            identity.
          </h1>

          <p className="mx-auto mt-7 max-w-md text-xs leading-7 tracking-[1px] text-white/85">
            Beyond trends. Beyond expectations.
            Discover a new expression of contemporary fashion.
          </p>

          <a
            href="#collections"
            className="mt-10 inline-block border border-white px-10 py-4 text-[10px] tracking-[3px] transition duration-300 hover:bg-white hover:text-[#292B2E]"
          >
            DISCOVER COLLECTION
          </a>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[9px] tracking-[4px] text-white/80">
          SCROLL TO DISCOVER
        </div>
      </section>

      {/* Collections */}
      <section
        id="collections"
        className="mx-auto max-w-[1500px] px-6 py-24 lg:px-16"
      >
        <div className="mb-14 text-center">
          <p className="mb-4 text-[9px] tracking-[4px] text-[#8995A1]">
            THE MAISON ÉLISE SELECTION
          </p>

          <h2 className="font-serif text-4xl md:text-5xl">
            Explore our universe
          </h2>

          <p className="mt-4 text-xs tracking-wide text-[#777]">
            Pieces that speak without saying a word.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((item) => (
            <a
              href="#new"
              key={item.name}
              className="group block"
            >
              <div className="overflow-hidden bg-[#E8E7E3]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <div className="flex items-center justify-between border-b border-[#292B2E]/20 py-5">
                <div>
                  <h3 className="font-serif text-2xl">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-[10px] tracking-wider text-[#777]">
                    {item.description}
                  </p>
                </div>

                <span className="text-xl">↗</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section
        id="new"
        className="bg-[#F7F7F5] px-6 py-24 lg:px-16"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="text-[10px] tracking-[3px] text-[#8995A1]">
                CURATED FOR YOU
              </p>

              <h2 className="mt-3 font-serif text-4xl">
                Selected Pieces
              </h2>
            </div>

            <a
              href="#catalog"
              className="border-b border-[#292B2E] pb-1 text-[10px] tracking-[2px]"
            >
              VIEW ALL
            </a>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.name}
                {...product}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Manifesto */}
      <section
        id="about"
        className="bg-[#292B2E] px-6 py-28 text-center text-[#F7F7F5]"
      >
        <p className="mb-7 text-[9px] tracking-[5px] text-[#8995A1]">
          OUR PHILOSOPHY
        </p>

        <h2 className="mx-auto max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
          Fashion is not about fitting in.
          It is about being yourself.
        </h2>

        <p className="mx-auto mt-8 max-w-lg text-xs leading-7 text-white/60">
          Maison Élise celebrates individuality through contemporary design,
          timeless silhouettes and the freedom to express who you are.
        </p>

        <a
          href="#collections"
          className="mt-10 inline-block border border-[#8995A1] px-9 py-4 text-[9px] tracking-[3px] transition hover:bg-[#8995A1] hover:text-[#292B2E]"
        >
          DISCOVER MAISON ÉLISE
        </a>
      </section>

      {/* Footer */}
      <Footer />

    </main>
  );
}
