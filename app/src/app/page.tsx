"use client";

import Link from "next/link";
import { HomeIcon, HomeScene } from "./HomeVisuals";
import styles from "./home.module.css";
import { ShoppingBrief, useCommerce } from "./CommerceContext";
import { useEffect, useState } from "react";
import ProductQuestions from "./ProductQuestions";
import ShoppingSessions from "./ShoppingSessions";
import { StoreLiveTiles } from "./StoreLive";
import { recommend } from "../data/recommendations";
import { products } from "../data/products";

export default function Home() {
  const { state: commerce, updateBrief } = useCommerce();

  const [questionProduct, setQuestionProduct] = useState<(typeof products)[number] | null>(null);
  const [scheduleProduct, setScheduleProduct] = useState<string | null>(null);
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [liveProduct, setLiveProduct] = useState<string | null>(null);

  const [compareIds, setCompareIds] = useState<number[]>([]);
  const comparedProducts = products.filter((product) => compareIds.includes(product.id));

  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [savedReady, setSavedReady] = useState(false);
  const [storageMessage, setStorageMessage] = useState("");
  const [showShortlist, setShowShortlist] = useState(false);
  const savedProducts = products.filter((product) => savedIds.includes(product.id));
  const recommendations = recommend(submittedQuery);
  const visibleProducts = showShortlist ? savedProducts : recommendations.products;

  useEffect(() => {
    let active = true;
    // Load after hydration; never overwrite stored favorites with the empty initial state.
    queueMicrotask(() => {
      if (!active) return;
      try {
        const stored: unknown = JSON.parse(localStorage.getItem("nightshop.shortlist.v1") ?? "[]");
        if (Array.isArray(stored)) {
          setSavedIds(products.filter((product) => stored.includes(product.id)).map((product) => product.id));
        }
      } catch {
        setStorageMessage("Saved items could not be loaded. You can still make a shortlist for this visit.");
      }
      setSavedReady(true);
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (showResults || showShortlist) document.getElementById("shopping-results")?.focus();
  }, [showResults, showShortlist, submittedQuery]);

  function updateShortlist(next: number[]) {
    setSavedIds(next);
    try {
      localStorage.setItem("nightshop.shortlist.v1", JSON.stringify(next));
      setStorageMessage("");
    } catch {
      setStorageMessage("Your shortlist is available for this visit, but could not be saved for next time.");
    }
  }

  function toggleSaved(id: number) {
    updateShortlist(savedIds.includes(id) ? savedIds.filter((savedId) => savedId !== id) : [...savedIds, id]);
  }

  function toggleCompare(id: number) {
    setCompareIds((current) => {
      if (current.includes(id)) return current.filter((selectedId) => selectedId !== id);
      if (current.length >= 3) return current;
      return [...current, id];
    });
  }

  const shoppingContext = [submittedQuery, commerce.brief.intent, commerce.brief.budget && `Budget: $${commerce.brief.budget} USD`, commerce.brief.occasion, commerce.brief.eventDate && `Event: ${commerce.brief.eventDate}`, commerce.brief.size && `Size: ${commerce.brief.size}`, commerce.brief.destination].filter(Boolean).join(" · ");

  function handleAskAI() {
    if (!query.trim()) return;
    setSubmittedQuery(query.trim());
    updateBrief({ ...commerce.brief, intent: query.trim() });
    setShowResults(true);
    setShowShortlist(false);
  }

  return (
    <main className={styles.home}>
      <a className={styles.skip} href="#ask-indiaanytime">Skip to shopping assistant</a>
      <nav className={styles.nav} aria-label="Main navigation">
        <Link href="/" className={styles.brand}><span className={styles.brandMark}><HomeIcon name="store" size={23} /></span><span>IndiaAnytime<small>INDIA. ALWAYS OPEN.</small></span></Link>
        <div className={styles.navLinks}>
          <Link href="/explore"><HomeIcon name="store" size={17} /> Explore Stores</Link>
          <button onClick={() => setShowShortlist(current => !current)} aria-pressed={showShortlist}><HomeIcon name="heart" size={17} /> Saved ({savedReady ? savedIds.length : "…"})</button>
          <Link href="/flow">Track with Flow</Link>
          <Link className={styles.partner} href="/partner">For retailers ↗</Link>
          <Link className={styles.bag} href="/explore#shopping-bag"><HomeIcon name="bag" size={17} /> Bag ({commerce.cart.reduce((sum,line) => sum + line.quantity, 0)})</Link>
        </div>
      </nav>
      <p className={styles.demo}><b>MEET THE PROTOTYPE</b> Fictional stores, ratings, inventory and delivery estimates. No real purchases or live connections.</p>
      <section className={styles.hero} aria-labelledby="home-heading">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><HomeIcon name="sparkles" size={15} /> YOUR NEXT DISCOVERY, CLOSER TO HOME</p>
          <h1 id="home-heading">Shop India like<br />you’re <em>there.</em></h1>
          <p className={styles.intro}>The joy of an Indian shopping street. The ease of shopping from home. Find a celebration outfit, discover a little boutique, and make it yours.</p>
          <Link href="/explore" className={styles.modeLink}><HomeIcon name="store" size={18} /> Explore the storefronts <HomeIcon name="arrow" size={16} /></Link>
          <form id="ask-indiaanytime" className={styles.searchBox} onSubmit={event => { event.preventDefault(); handleAskAI(); }}>
            <label htmlFor="shopping-query" className={styles.searchLabel}><HomeIcon name="sparkles" size={17} /> What can we help you find?</label>
            <textarea id="shopping-query" aria-label="Your shopping request" value={query} onChange={event => setQuery(event.target.value)} placeholder="A festive outfit for my daughter, under $250…" maxLength={1000} onKeyDown={event => { if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) { event.preventDefault(); handleAskAI(); } }} />
            <div className={styles.searchBottom}><small>Demo recommendations<br />Stock not verified</small><button disabled={!query.trim()} className={styles.askButton}>Ask IndiaAnytime <HomeIcon name="arrow" size={16} /></button></div>
          </form>
          <div className={styles.examples} aria-label="Example shopping requests">{["Wedding saree under $300", "Outfit for my daughter's event", "Anarkali under $200"].map(example => <button key={example} onClick={() => { setQuery(example); document.getElementById("shopping-query")?.focus(); }}>{example}</button>)}</div>
        </div>
        <HomeScene />
      </section>
      <div className={styles.benefits}>
        {([['store','Big stores. Little discoveries.','Retailers, boutiques & artisans'],['sparkles','A brief that travels with you','Your occasion, size & budget'],['compare','Find your kind of perfect','Compare across stores'],['globe','From India to your doorstep','Explore mock delivery timing']] as const).map(([icon,title,description]) => <div className={styles.benefit} key={icon}><span><HomeIcon name={icon} size={19} /></span><div><strong>{title}</strong><small>{description}</small></div></div>)}
      </div>
      <div className={styles.lower}><ShoppingBrief /><StoreLiveTiles /></div>

      {(showResults || showShortlist) && (
        <section id="shopping-results" tabIndex={-1} aria-label={showShortlist ? "Saved shortlist" : "Product recommendations"} className={`${styles.results} mx-auto max-w-6xl px-6 pb-16`}>
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-stone-500">
              {showShortlist ? "Your favorites" : "IndiaAnytime understood"}
            </p>
            <h2 className="mt-2 text-3xl font-bold">
              {showShortlist ? "Saved shortlist" : submittedQuery ? `Recommendations for “${submittedQuery}”` : "Browse products"}
            </h2>

            {!showShortlist && <div className="mt-5 flex flex-wrap gap-3">
              {recommendations.tags.map((tag) => <Tag key={tag} label={tag} />)}
            </div>}
            {showShortlist && (
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <p className="text-sm text-stone-600">Saved on this browser. Compare favorites or shop live when you’re ready.</p>
                {savedProducts.length > 0 && <button onClick={() => updateShortlist([])} className="rounded-lg border px-3 py-2 text-sm">Clear shortlist</button>}
                <button onClick={() => { setShowShortlist(false); setSubmittedQuery(""); setShowResults(true); }} className="rounded-lg border px-3 py-2 text-sm">Browse products</button>
              </div>
            )}
          </div>

          {!showShortlist && <p className="mb-4 text-sm text-stone-600">Catalog matching prototype. {recommendations.notice}</p>}
          {!showShortlist && visibleProducts.length === 0 && <div role="status" className="mb-6 rounded-xl border bg-white p-6">
            <h3 className="font-semibold">No matching products in this sample catalog</h3>
            <p className="mt-2 text-stone-600">Try a different clothing type or budget, or browse all three sample products.</p>
            <button onClick={() => setSubmittedQuery("")} className="mt-3 rounded-lg border px-3 py-2">Browse all products</button>
          </div>}
          {storageMessage && <p role="status" className="mb-4 text-sm text-amber-800">{storageMessage}</p>}
          {showShortlist && savedProducts.length === 0 && (
            <p className="mb-6 rounded-xl border bg-white p-6 text-stone-600">
              {savedReady ? "Your shortlist is empty. Browse products and choose Save to shortlist to keep your favorites here." : "Loading your shortlist…"}
            </p>
          )}
          <p className="mb-4 text-sm text-stone-600" role="status">
            {compareIds.length} of 3 products selected. {compareIds.length === 3 ? "Remove a product to compare another." : "Select up to 3 products to compare below."}
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {visibleProducts.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl border bg-white p-6 shadow-sm"
              >
                <div className="mb-5 overflow-hidden rounded-xl bg-stone-100">
  <img
    src={product.image}
    alt={product.name}
    className="h-80 w-full object-cover object-top"
  />
</div>

                <div className="flex items-center justify-between">
  <p className="text-sm font-medium text-stone-500">
    {product.retailer}
  </p>

  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
    {product.availability}
  </span>
</div>

<h3 className="mt-2 text-xl font-semibold">
  {product.name}
</h3>

<p className="mt-2 text-sm leading-relaxed text-stone-600">
  {product.description}
</p>

<div className="mt-4 flex items-center justify-between">
  <p className="text-2xl font-bold">
    ${product.price}
  </p>

  <p className="text-sm">
    ⭐ {product.rating}{" "}
    <span className="text-stone-400">
      ({product.reviews})
    </span>
  </p>
</div>

<p className="mt-3 text-xs text-stone-500">
  {product.delivery}
</p>

<div className="mt-5 rounded-xl bg-stone-100 p-4">
  <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
    ✨ Why AI picked this
  </p>

  <p className="mt-2 text-sm leading-relaxed text-stone-700">
    {recommendations.reason(product)}
  </p>
</div>

                <button
                  onClick={() => toggleSaved(product.id)}
                  disabled={!savedReady}
                  aria-pressed={savedIds.includes(product.id)}
                  aria-label={`Save ${product.name} to shortlist`}
                  className={`mt-5 w-full rounded-lg border px-3 py-2 text-sm disabled:opacity-50 ${savedIds.includes(product.id) ? "border-stone-900 bg-stone-100 font-medium" : "bg-white"}`}
                >
                  {savedIds.includes(product.id) ? "♥ Saved — remove" : "♡ Save to shortlist"}
                </button>
                <Link href={`/try-on?product=${product.id}`} className="mt-3 block rounded-lg border border-stone-300 px-3 py-2 text-center text-sm">Virtual Try-On · demo</Link>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => toggleCompare(product.id)}
                    aria-pressed={compareIds.includes(product.id)}
                    aria-label={`Compare ${product.name}`}
                    disabled={compareIds.length >= 3 && !compareIds.includes(product.id)}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 ${compareIds.includes(product.id) ? "bg-stone-900 text-white" : "bg-white"}`}
                  >
                    {compareIds.includes(product.id) ? "✓ Selected" : "Compare"}
                  </button>

                  <button
  onClick={() => setLiveProduct(product.name)}
  className="flex-1 rounded-lg bg-black px-3 py-2 text-sm text-white"
>
  Shop Live
</button>
                </div>
              </div>
            ))}
          </div>
          {comparedProducts.length > 0 && (
            <section aria-labelledby="comparison-heading" className="mt-10 rounded-2xl border bg-white p-4 shadow-sm md:p-6">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h2 id="comparison-heading" className="text-2xl font-bold">Compare products</h2>
                  <p className="mt-1 text-sm text-stone-600">
                    {comparedProducts.length === 1 ? "Select another product for a side-by-side comparison." : "Compare the details and find your best match."}
                  </p>
                </div>
                <button onClick={() => setCompareIds([])} className="shrink-0 rounded-lg border px-3 py-2 text-sm">Clear all</button>
              </div>
              <div className="overflow-x-auto" role="region" aria-label="Product comparison" tabIndex={0}>
                <table className="w-full border-collapse text-left text-sm">
                  <caption className="sr-only">Details of selected products</caption>
                  <thead>
                    <tr>
                      <th scope="col" className="min-w-32 p-3 align-top">Product</th>
                      {comparedProducts.map((product) => (
                        <th scope="col" key={product.id} className="min-w-56 p-3 align-top">
                          <img src={product.image} alt={product.name} className="mb-4 h-56 w-full rounded-lg object-cover object-top" />
                          <p className="text-lg font-semibold">{product.name}</p>
                          <button onClick={() => toggleCompare(product.id)} aria-label={`Remove ${product.name} from comparison`} className="mt-3 rounded-lg border px-3 py-2 font-normal">Remove</button>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {([
                      ["Retailer", (product) => product.retailer],
                      ["Price", (product) => `$${product.price}`],
                      ["Rating / reviews", (product) => `⭐ ${product.rating} / 5 (${product.reviews} reviews)`],
                      ["Availability", (product) => product.availability],
                      ["Delivery", (product) => product.delivery],
                      ["AI match reason", (product) => recommendations.reason(product)],
                    ] satisfies [string, (product: (typeof products)[number]) => string][]).map(([label, value]) => (
                      <tr key={label} className="border-t">
                        <th scope="row" className="p-3 align-top font-medium">{label}</th>
                        {comparedProducts.map((product) => <td key={product.id} className="p-3 align-top leading-relaxed text-stone-600">{value(product)}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </section>
      )}
    <div className={styles.lower}>
      <div className={styles.sectionTitle}><div><p className={styles.eyebrow}>THERE’S MORE THAN ONE WAY TO FIND IT</p><h2>Follow your curiosity.</h2></div></div>
      <div className={styles.paths}>
        <Link href="/explore" className={styles.path}><span><HomeIcon name="store" size={30} /></span><div><h3>Take the scenic route.</h3><p>Wander Hyderabad’s imagined storefronts.<br />Major retailers, local shops, and artisan finds.</p></div><HomeIcon name="arrow" /></Link>
        <a href="#ask-indiaanytime" className={styles.path}><span><HomeIcon name="sparkles" size={30} /></span><div><h3>Start with a little inspiration.</h3><p>Tell us the occasion and your budget.<br />We’ll help you explore the sample catalog.</p></div><HomeIcon name="arrow" /></a>
      </div>
      <div className={styles.sectionTitle}><div><p className={styles.eyebrow}>A FAMILIAR FEELING. A NEW WAY TO SHOP.</p><h2>From “I’m looking for…” to “that’s the one.”</h2></div></div>
      <div className={styles.steps}>{[["01", "Tell us what you have in mind", "An occasion, a budget, a size. Keep your shopping brief close as you discover different stores."],["02", "Discover, compare, ask", "Explore the collections, save your favorites, and ask catalog questions. Plan a local demo shopping session."],["03", "Bring your finds together", "Build a mock bag across stores and review illustrative delivery timing. No payment or retailer contact."]].map(([n,title,description]) => <article key={n} className={styles.step}><span>{n}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
    </div>
    {questionProduct && <ProductQuestions key={questionProduct.id} product={questionProduct} matchReason={recommendations.reason(questionProduct)} request={shoppingContext} onClose={() => setQuestionProduct(null)} onSchedule={() => { setScheduleProduct(questionProduct.name); setQuestionProduct(null); }} />}
    <ShoppingSessions product={scheduleProduct} request={shoppingContext} onClose={() => setScheduleProduct(null)} />
    {liveProduct && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-6">
    <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-stone-500">
            IndiaAnytime Live
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Shop {liveProduct} live
          </h2>
        </div>

        <button
          onClick={() => setLiveProduct(null)}
          className="text-xl"
        >
          ✕
        </button>
      </div>

      <p className="mt-4 text-stone-600">
        Connect with a Hyderabad store associate who can show you the product,
        answer questions, compare alternatives, and help with sizing.
      </p>

      <div className="mt-7 space-y-3">
        <Link href={`/live-shopping?product=${products.find(item => item.name === liveProduct)?.id ?? 1}`} className="block w-full rounded-xl bg-emerald-900 px-5 py-4 text-left text-white">
          Open private video shopping mock · cameras off
        </Link>

        <button onClick={() => { const product = products.find((item) => item.name === liveProduct); if (product) { setQuestionProduct(product); setLiveProduct(null); } }} className="w-full rounded-xl border px-5 py-4 text-left">
          🤖 Ask AI About This Item
        </button>

        <button onClick={() => { setScheduleProduct(liveProduct); setLiveProduct(null); }} className="w-full rounded-xl border px-5 py-4 text-left">
          📅 Schedule a Shopping Session
        </button>
      </div>

      <div className="mt-6 rounded-xl bg-stone-100 p-4 text-sm">
        <strong>Customer context shared with associate:</strong>
        <p className="mt-1 text-stone-600">{shoppingContext}</p>
      </div>
    </div>
  </div>
)}
    <div className={styles.lower}><footer className={styles.footer}><strong>IndiaAnytime · India. Always Open.</strong><span>A shopping prototype, made for discovery.</span><Link href="/partner">Open Partner workspace ↗</Link></footer></div>
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