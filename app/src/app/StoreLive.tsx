"use client";
import Link from "next/link";
import { useState } from "react";
import { catalog, stores } from "../data/marketplace";
import { useCommerce } from "./CommerceContext";
import { useDemoOperations } from "./DemoOperations";
import styles from "./StoreLive.module.css";
export function StoreLiveTiles() {
  const { broadcasts } = useDemoOperations();
  return <section className={styles.section}><p className={styles.eyebrow}>STORE LIVE · SIMULATED BROADCASTS</p><h2>A front-row seat. From anywhere.</h2><p>Explore the edit with your camera and microphone always off.</p><div className={styles.tiles}>{stores.map(store => <Link href={`/stores/${store.id}#store-live`} key={store.id} className={styles.tile} style={{ backgroundColor: store.color }}><span>{broadcasts[store.id]?.live ? "▶ LIVE DEMO" : "▶ CATALOG PREVIEW"}</span><h3>{store.name}</h3><p>{broadcasts[store.id]?.title || store.specialty}</p><small>Product-only presentation · Watch mock →</small></Link>)}</div></section>;
}
export default function StoreLive({ storeId }: { storeId: string }) {
  const store = stores.find(item => item.id === storeId)!;
  const products = catalog.filter(item => item.storeId === storeId);
  const { broadcasts } = useDemoOperations();
  const broadcast = broadcasts[storeId];
  const [watching, setWatching] = useState(false);
  const [sizes, setSizes] = useState<Record<number,string>>({});
  const [offer, setOffer] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const { state, ready, add, message } = useCommerce();
  const product = products.find(item => item.id === broadcast?.productId) ?? products[0];
  if (!product) return null;
  const size = sizes[product.id] ?? (product.sizes.includes(state.brief.size) ? state.brief.size : product.sizes.length === 1 ? product.sizes[0] : "");
  return <section id="store-live" className={styles.section}><p className={styles.eyebrow}>PUBLIC STORE LIVE · FICTIONAL DEMO</p><h2>{broadcast?.title || `Inside ${store.name}`}</h2><div className={styles.broadcast}><div><div className={styles.stage} style={{ backgroundColor: store.color }}><span className={styles.badge}>{broadcast?.live ? "LIVE DEMO · SIMULATED PRESENTATION" : "OFFLINE · CATALOG PREVIEW"}</span>{product.image ? <div className={styles.photo} style={{ backgroundImage: `url(${product.image})` }} role="img" aria-label={`Catalog illustration of ${product.name}`} /> : <div className={styles.weave}>Handwoven<br />Festive Stole</div>}<p>{watching ? `Demo host: “Let's take a closer look at ${product.name}.”` : "A little store visit, wherever you are."}</p><button onClick={() => setWatching(!watching)}>{watching ? "Pause mock presentation" : "Watch mock presentation"}</button></div><p className={styles.privacy}>🔒 Viewer camera OFF · Microphone OFF · No recording. A catalog presentation with no video connection or access to your devices.</p><form onSubmit={event => { event.preventDefault(); if (!question.trim()) return; setAnswer(`Catalog-only demo reply: ${product.name} is listed at $${product.price} USD in ${product.sizes.join(", ")}. ${product.description} Stock, fit and delivery are unverified. Your question was not sent to a store.`); setQuestion(""); }}><label htmlFor={`live-question-${storeId}`}>Ask about the featured item (local demo)</label><div className={styles.row}><input id={`live-question-${storeId}`} value={question} maxLength={300} onChange={event => setQuestion(event.target.value)} placeholder="Ask about sizes or details" /><button disabled={!question.trim()}>Ask</button></div></form>{answer && <p role="status" className={styles.note}>{answer}</p>}</div><aside className={styles.shop}><p className={styles.eyebrow}>SHOP THE BROADCAST</p><h3>{product.name}</h3><p>{product.description}</p><strong>${product.price} USD</strong><label>Choose demo size<select value={size} onChange={event => setSizes({ ...sizes, [product.id]: event.target.value })}><option value="">Select size</option>{product.sizes.map(item => <option key={item}>{item}</option>)}</select></label><button disabled={!ready || !size} onClick={() => add(product.id, size)}>Add to shared mock bag</button>{message && <p role="status" className={styles.note}>{message}</p>}<button aria-pressed={offer} onClick={() => setOffer(!offer)}>{offer ? "Remove demo offer" : "Claim demo offer · 10% preview"}</button>{offer && <p className={styles.note}>Offer preview: ${(product.price * .9).toFixed(2)} USD. Illustrative only; shared bag retains the catalog price. No discount is applied or promised.</p>}<Link href={`/try-on?product=${product.id}`}>Preview on a demo model →</Link><Link href={`/live-shopping?store=${store.id}&product=${product.id}`}>Open private shopping demo →</Link><Link href="/explore#shopping-bag">Review shared bag →</Link></aside></div></section>;
}
