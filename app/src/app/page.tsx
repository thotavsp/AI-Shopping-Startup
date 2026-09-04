export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="text-xl font-bold">
          NightShop AI
        </div>

        <div className="flex gap-6 text-sm">
          <button>How it works</button>
          <button>For Retailers</button>
          <button>Sign In</button>
        </div>
      </nav>

      <section className="mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center">
        <p className="mb-5 text-sm font-semibold uppercase tracking-widest">
          Hyderabad shopping • Live from the USA
        </p>

        <h1 className="max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
          Shop Hyderabad.
          <br />
          From America.
          <br />
          Live.
        </h1>

        <p className="mt-8 max-w-2xl text-lg text-stone-600">
          Your AI shopping assistant connects you with Hyderabad retailers,
          helps discover the right products, and brings the in-store shopping
          experience to you from thousands of miles away.
        </p>

        <div className="mt-12 w-full max-w-2xl rounded-2xl bg-white p-4 shadow-lg">
          <textarea
            className="min-h-28 w-full resize-none p-4 text-lg outline-none"
            placeholder="What are you shopping for tonight?"
          />

          <div className="flex justify-end">
            <button className="rounded-xl bg-black px-6 py-3 font-medium text-white">
              Ask AI →
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button className="rounded-full border px-4 py-2 text-sm">
            Wedding saree under $300
          </button>

          <button className="rounded-full border px-4 py-2 text-sm">
            Outfit for my daughter's event
          </button>

          <button className="rounded-full border px-4 py-2 text-sm">
            Men's wedding wear under $250
          </button>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-6 pb-24 md:grid-cols-3">
        <Feature
          number="01"
          title="Tell AI what you need"
          description="Describe the occasion, budget, style, size, or anything else that matters."
        />

        <Feature
          number="02"
          title="Discover Hyderabad stores"
          description="AI finds matching products and helps you compare the best options."
        />

        <Feature
          number="03"
          title="Shop live"
          description="Request live assistance and experience the store from your home in America."
        />
      </section>
    </main>
  );
}

function Feature({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-7">
      <p className="text-sm text-stone-400">{number}</p>
      <h2 className="mt-4 text-xl font-semibold">{title}</h2>
      <p className="mt-3 leading-relaxed text-stone-600">{description}</p>
    </div>
  );
}