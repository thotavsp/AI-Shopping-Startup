import Link from "next/link";
import { notFound } from "next/navigation";
import { stores } from "../../../data/marketplace";
import { ShoppingBrief } from "../../CommerceContext";
import StoreLive from "../../StoreLive";
import styles from "../../explore/street.module.css";
export function generateStaticParams() { return stores.map(store => ({ id: store.id })); }
export default async function StorePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const store = stores.find(item => item.id === id);
  if (!store) notFound();
  return <main className={styles.page}><nav className={styles.nav}><Link className={styles.logo} href="/">IndiaAnytime<small>India. Always Open.</small></Link><div><Link href="/explore">Explore Stores</Link><Link href="/explore#shopping-bag">Shopping bag</Link><Link href="/flow">Track with Flow</Link></div></nav><div className={styles.demo}>FICTIONAL STOREFRONT · Catalog, broadcast and availability are demo data.</div><section className={styles.hero}><p>{store.type.toUpperCase()} · {store.district.toUpperCase()}, {store.city.toUpperCase()}</p><h1>{store.name}</h1><div>{store.specialty}<br />{store.status} · Simulated availability</div></section><div className={styles.content}><ShoppingBrief /><section className={styles.panel}><p className={styles.eyebrow}>WELCOME INSIDE</p><h2>A personal corner of India.</h2><p>Explore this fictional {store.type.toLowerCase()} through a product presentation. Choose a variant, add it to your shared shopping bag, or continue into a private avatar-first shopping demo.</p><p>Prices are USD merchandise estimates. Stock, craftsmanship details and delivery are unverified. No real retailer is represented or contacted.</p></section><StoreLive storeId={store.id} /><footer className={styles.footer}><Link href="/explore">← Continue your shopping street</Link><span>Shop India like you’re there.</span></footer></div></main>;
}
