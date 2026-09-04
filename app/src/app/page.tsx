"use client";

import { useState } from "react";
import { products } from "../data/products";

export default function Home() {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  function handleAskAI() {
    if (!query.trim()) return;
    setShowResults(true);
  }

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="text-xl font-bold">NightShop AI</div>

        <div className="flex gap-6 text-sm">
          <button>How it works</button>
          <button>For Retailers</button>
          <button>Sign In</button>
        </div>
      </nav>

      <section className="mx-auto flex max-w-5xl flex-col items-center px-6 py-20 text-center">
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
          Tell NightShop AI what you need and we’ll help you discover suitable
          products from Hyderabad retailers.
        </p>

        <div className="mt-12 w-full max-w-2xl rounded-2xl bg-white p-4 shadow-lg">
          <textarea
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="min-h-28 w-full resize-none p-4 text-lg outline-none"
            placeholder="What are you shopping for tonight?"
          />

          <div className="flex justify-end">
            <button
              onClick={handleAskAI}
              className="rounded-xl bg-black px-6 py-3 font-medium text-white"
            >
              Ask AI →
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {[
            "Wedding saree under $300",
            "Outfit for my daughter's event",
            "Men's wedding wear under $250",
          ].map((example) => (
            <button
              key={example}
              onClick={() => setQuery(example)}
              className="rounded-full border px-4 py-2 text-sm"
            >
              {example}
            </button>
          ))}
        </div>
      </section>

      {showResults && (
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-stone-500">
              NightShop AI understood
            </p>
            <h2 className="mt-2 text-3xl font-bold">
              Recommendations for “{query}”
            </h2>

            <div className="mt-5 flex flex-wrap gap-3">
              <Tag label="Traditional Indian wear" />
              <Tag label="Special occasion" />
              <Tag label="Budget conscious" />
              <Tag label="US customer" />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl border bg-white p-6 shadow-sm"
              >
                <div className="mb-5 flex h-48 items-center justify-center rounded-xl bg-stone-100 text-stone-400">
                  Product image
                </div>

                <p className="text-sm text-stone-500">{product.retailer}</p>
                <h3 className="mt-1 text-xl font-semibold">{product.name}</h3>

                <p className="mt-2 text-sm text-stone-600">
                  {product.description}
                </p>

                <p className="mt-4 text-2xl font-bold">${product.price}</p>

                <div className="mt-5 flex gap-2">
                  <button className="flex-1 rounded-lg border px-3 py-2 text-sm">
                    Compare
                  </button>

                  <button className="flex-1 rounded-lg bg-black px-3 py-2 text-sm text-white">
                    Shop Live
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-stone-200 px-3 py-1 text-sm">
      {label}
    </span>
  );
}