"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./partner.module.css";

const sections = ["Overview", "Products", "Inventory", "Promotions", "Cross-sell", "Live Requests", "Orders"] as const;
type Section = typeof sections[number];
const stock = [
  { sku: "KSL-M-MAG", name: "Kanchi Silk Lehenga", variant: "Magenta · M", location: "Banjara Hills", quantity: 8, held: 2, price: 229, eligible: true },
  { sku: "KSL-S-MAG", name: "Kanchi Silk Lehenga", variant: "Magenta · S", location: "Secunderabad", quantity: 3, held: 1, price: 229, eligible: true },
  { sku: "ANR-M-IVR", name: "Embroidered Anarkali", variant: "Ivory · M", location: "Banjara Hills", quantity: 12, held: 2, price: 179, eligible: true },
  { sku: "JWL-OS-GLD", name: "Temple Jewelry Set", variant: "Gold tone · One size", location: "Secunderabad", quantity: 5, held: 0, price: 39, eligible: false },
];
const orders = [
  ["IA-1042", "Maya R. · Atlanta", "Kanchi Silk Lehenga", "$229", "Awaiting pickup", "Sep 14–16 · At risk"],
  ["IA-1041", "Anika S. · Austin", "Embroidered Anarkali", "$179", "Consolidating", "Sep 12–14 · On track"],
  ["IA-1040", "Priya K. · Edison", "Kanchi Silk Lehenga", "$229", "International transit", "Sep 10–12 · On track"],
];
const briefs = [
  { id: "REQ-208", name: "Maya R.", city: "Atlanta, US", intent: "Traditional outfit for daughter’s celebration", budget: "$250", size: "M · confirm measurements", event: "Sep 13, 2026", product: "Kanchi Silk Lehenga", time: "Ready now", risk: "Arrival may miss event. Discuss alternatives before ordering." },
  { id: "REQ-209", name: "Anika S.", city: "Austin, US", intent: "An elegant outfit for a wedding guest", budget: "$220", size: "M", event: "Sep 26, 2026", product: "Embroidered Anarkali", time: "Sep 6 · 8:30 AM IST", risk: "Illustrative arrival Sep 12–14. Confirm destination and availability." },
];

export default function Partner() {
  const [section, setSection] = useState<Section>("Overview");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All locations");
  const [accepted, setAccepted] = useState<string[]>([]);
  const [paused, setPaused] = useState(false);
  const [notice, setNotice] = useState("");
  const filtered = stock.filter(item => (location === "All locations" || item.location === location) && `${item.name} ${item.sku} ${item.variant}`.toLowerCase().includes(search.toLowerCase()));
  function navigate(next: Section) { setSection(next); setNotice(""); }

  return <div className={styles.shell}>
    <aside className={styles.sidebar}>
      <Link href="/" className={styles.brand}>IndiaAnytime<span>PARTNER</span></Link>
      <p className={styles.tagline}>India. Always Open.</p>
      <div className={styles.store}><span className={styles.monogram}>HH</span><div><strong>Hyderabad Heritage</strong><small>Fictional retailer · 2 locations</small></div></div>
      <p className={styles.label}>WORKSPACE</p>
      <nav aria-label="Partner navigation">{sections.map((item, i) => <button key={item} aria-current={section === item ? "page" : undefined} className={section === item ? styles.active : ""} onClick={() => navigate(item)}><span aria-hidden="true">{["◈", "▦", "▤", "◇", "✧", "◉", "▣"][i]}</span>{item}{item === "Live Requests" && <b>{2 - accepted.length}</b>}</button>)}</nav>
      <div className={styles.sidebarBottom}><span className={styles.liveDot} /> Virtual storefront open<p>AI discovery available 24/7<br />Live associates: demo availability</p><Link href="/">← Customer marketplace</Link></div>
    </aside>
    <main className={styles.main}>
      <header className={styles.topbar}><span>Partner workspace <span className={styles.muted}>/ {section}</span></span><span className={styles.avatar}>HH</span></header>
      <div className={styles.content}>
        <div className={styles.demo}>DEMO WORKSPACE <span>All retailers, customers, metrics, inventory, availability and logistics are fictional. Changes last only for this visit.</span></div>
        <div className={styles.heading}><div><p className={styles.eyebrow}>HYDERABAD HERITAGE · SEPTEMBER 5, 2026 SNAPSHOT</p><h1>{section === "Overview" ? "Your store, beyond borders." : section}</h1><p>{section === "Overview" ? "A little closer to your customers. Wherever they call home." : "Your international storefront, with every detail in view."}</p></div><button className={styles.primary} onClick={() => navigate(section === "Live Requests" ? "Overview" : "Live Requests")}>{section === "Live Requests" ? "Back to overview" : "View live requests ↗"}</button></div>
        {notice && <p role="status" className={styles.notice}>{notice}</p>}
        {section === "Overview" && <>
          <div className={styles.metrics}>{[["US sales · today", "$637", "3 demo orders · USD"], ["Orders to fulfill", "3", "1 needs delivery review"], ["Live requests", String(2 - accepted.length), "2 demo associates available"], ["Available units", "23", "5 held across 2 locations"]].map(([label,value,detail]) => <article className={styles.card} key={label}><p>{label}</p><strong className={styles.metric}>{value}</strong><small>{detail}</small></article>)}</div>
          <div className={styles.columns}><section className={styles.feature}><p className={styles.eyebrow}>THE VIRTUAL STOREFRONT</p><h2>Your doors close.<br />Your possibilities don’t.</h2><p>Keep discovery going while your team rests. Give every shopping request a thoughtful next step.</p><div className={styles.statusRow}><span>Physical store <b>Closed · demo</b></span><span>AI shopping <b>Open 24/7 · demo</b></span></div><button onClick={() => navigate("Live Requests")}>Meet your next customer →</button></section><section className={styles.card}><div className={styles.cardHeading}><h2>Needs your attention</h2><span className={styles.pill}>3 priorities</span></div>{[["01", "An event is approaching", "Maya’s Sep 13 celebration precedes the mock ETA.", "Orders"], ["02", "A size is running low", "2 available · Magenta / S · Secunderabad", "Inventory"], ["03", "Complete the occasion", "Review an outfit + jewelry pairing.", "Cross-sell"]].map(([n,title,detail,target]) => <button key={n} className={styles.priority} onClick={() => navigate(target as Section)}><span>{n}</span><div><strong>{title}</strong><p>{detail}</p></div><span>↗</span></button>)}</section></div>
          <div className={styles.cardHeading}><h2>Customers at your doorstep</h2><button className={styles.textButton} onClick={() => navigate("Live Requests")}>All requests →</button></div>
          <div className={styles.requests}>{briefs.map(brief => <article key={brief.id} className={styles.card}><span className={styles.pill}>{accepted.includes(brief.id) ? "Assigned · demo" : brief.time}</span><h3>{brief.name} <span className={styles.muted}>· {brief.city}</span></h3><p>{brief.intent}</p><div className={styles.chips}><span>{brief.budget} budget</span><span>Event {brief.event}</span></div><button className={styles.textButton} onClick={() => navigate("Live Requests")}>Review shopping brief →</button></article>)}</div>
        </>}
        {(section === "Products" || section === "Inventory") && <section className={styles.card}><div className={styles.filters}><label>Search catalog<input value={search} onChange={event => setSearch(event.target.value)} placeholder="Product, SKU or variant" /></label><label>Store location<select value={location} onChange={event => setLocation(event.target.value)}>{["All locations", "Banjara Hills", "Secunderabad"].map(value => <option key={value}>{value}</option>)}</select></label></div><p className={styles.muted}>Available = on-hand − held. Holds are fictional; no stock is reserved. Prices in USD.</p><div className={styles.tableWrap}><table><caption>{section} · {filtered.length} demo variants</caption><thead><tr>{["Product / SKU", "Variant & location", ...(section === "Inventory" ? ["On-hand", "Held", "Available"] : ["Price", "US eligibility"])].map(label => <th key={label}>{label}</th>)}</tr></thead><tbody>{filtered.map(item => <tr key={item.sku}><td><strong>{item.name}</strong><small>{item.sku}</small></td><td>{item.variant}<small>{item.location}</small></td>{section === "Inventory" ? <><td>{item.quantity}</td><td>{item.held}</td><td><span className={item.quantity-item.held <= 2 ? styles.warning : styles.pill}>{item.quantity-item.held}{item.quantity-item.held <= 2 ? " · Low stock" : ""}</span></td></> : <><td>${item.price}</td><td>{item.eligible ? "Eligible · mock" : "Review required"}</td></>}</tr>)}</tbody></table></div>{filtered.length === 0 && <p role="status">No variants match. Try another search or location.</p>}</section>}
        {section === "Promotions" && <div className={styles.requests}><article className={styles.card}><span className={styles.pill}>{paused ? "Paused · demo" : "Active · demo"}</span><h2>Celebrate from anywhere</h2><p>10% off apparel · minimum $150 · up to $30 off</p><p>Sep 5–20, 2026 · Eligible apparel only. Excludes shipping, duties and other offers.</p><button className={styles.primary} onClick={() => { setPaused(!paused); setNotice(`Campaign ${paused ? "resumed" : "paused"} in this demo only. No customer pricing changed.`); }}>{paused ? "Resume" : "Pause"} demo campaign</button></article><article className={styles.card}><span className={styles.warning}>Draft</span><h2>The occasion edit</h2><p>Outfit + accessory bundle · $15 off a qualifying pair.</p><p>Sep 21–30, 2026 · Draft merchandising collection. International accessory eligibility needs review before launch.</p></article></div>}
        {section === "Cross-sell" && <section className={styles.card}><p className={styles.eyebrow}>CURATED PAIRING · MOCK RECOMMENDATION</p><h2>Finish the festive look</h2><div className={styles.pairing}><div><span>01 / THE OUTFIT</span><h3>Kanchi Silk Lehenga</h3><p>$229 · Magenta silk</p></div><b>+</b><div><span>02 / THE FINISHING TOUCH</span><h3>Temple Jewelry Set</h3><p>$39 · Gold tone</p></div></div><p><strong>Combined price: $268 before shipping and duties.</strong> This exceeds Maya’s $250 budget by $18. Jewelry requires international eligibility review.</p><p className={styles.warning}>Suggest the $179 Anarkali + $39 jewelry ($218) only after eligibility review; delivery and fees still need checking.</p><button className={styles.primary} onClick={() => setNotice("Pairing saved for review in this demo. It was not published or sent to a customer.")}>Save pairing for review</button></section>}
        {section === "Live Requests" && <div className={styles.requests}>{briefs.map(brief => <article key={brief.id} className={styles.card}><span className={styles.pill}>{brief.time} · {brief.id}</span><h2>{brief.name}</h2><p>{brief.intent}</p><dl className={styles.brief}><dt>Location</dt><dd>{brief.city}</dd><dt>Budget</dt><dd>{brief.budget} USD</dd><dt>Event date</dt><dd>{brief.event}</dd><dt>Size</dt><dd>{brief.size}</dd><dt>Suggested product</dt><dd>{brief.product}</dd><dt>Associate</dt><dd>{accepted.includes(brief.id) ? "Neha · assigned in demo" : "Unassigned"}</dd></dl><p className={styles.warning}>{brief.risk}</p><button className={styles.primary} disabled={accepted.includes(brief.id)} onClick={() => { setAccepted([...accepted, brief.id]); setNotice(`${brief.id} assigned to fictional associate Neha. No customer contacted and no video session started.`); }}>{accepted.includes(brief.id) ? "Assigned · demo only" : "Accept demo request"}</button></article>)}</div>}
        {section === "Orders" && <section className={styles.card}><h2>Order overview</h2><p>Mock fulfillment snapshot · ETAs are illustrative, not delivery promises. All payments are simulated.</p><div className={styles.tableWrap}><table><caption>3 fictional orders · $637 merchandise total</caption><thead><tr>{["Order / customer", "Product", "Amount", "Flow stage", "US arrival estimate"].map(label => <th key={label}>{label}</th>)}</tr></thead><tbody>{orders.map(([id,customer,product,amount,status,eta]) => <tr key={id}><td><strong>{id}</strong><small>{customer}</small></td><td>{product}</td><td>{amount}</td><td>{status}</td><td>{eta}</td></tr>)}</tbody></table></div><p className={styles.warning}>IA-1042: Sep 13 event at risk. Review expedited service feasibility or an alternative outfit before confirming. No carrier quote or delivery confidence has been verified.</p></section>}
        <footer className={styles.footer}>IndiaAnytime Partner <span>India. Always Open. · Prototype / No live commerce</span></footer>
      </div>
    </main>
  </div>;
}
