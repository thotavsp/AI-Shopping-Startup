import Image from "next/image";
import styles from "./home.module.css";

export type IconName = "sparkles" | "store" | "bag" | "heart" | "arrow" | "pin" | "video" | "check" | "globe" | "compare";
export function HomeIcon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    sparkles: <><path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z" /><path d="m20 2 .7 2.3L23 5l-2.3.7L20 8l-.7-2.3L17 5l2.3-.7Z" /></>,
    store: <><path d="M4 10v11h16V10M3 10l2-7h14l2 7M3 10q3 4 6 0 3 4 6 0 3 4 6 0M9 21v-7h6v7" /></>,
    bag: <><path d="M5 7h14l1 14H4L5 7Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />,
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
    pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    video: <><rect x="2" y="5" width="14" height="14" rx="3" /><path d="m16 10 6-4v12l-6-4" /></>,
    check: <path d="m5 12 4 4L20 5" />,
    globe: <><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18M5 6h14M5 18h14" /></>,
    compare: <><rect x="3" y="4" width="7" height="16" rx="2" /><rect x="14" y="4" width="7" height="16" rx="2" /><path d="M5 8h3m8 0h3M5 12h3m8 0h3" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{paths[name]}</svg>;
}

export function HomeScene() {
  return <div className={styles.scene} aria-label="Illustrated Indian shopping street with a sample occasion-wear product" role="img">
    <div className={styles.orbit} /><div className={styles.sun} /><div className={styles.dotGrid} />
    <div className={styles.cityBadge}><HomeIcon name="pin" size={16} /> A little closer to Hyderabad</div>
    <svg className={styles.streetArt} viewBox="0 0 520 380" fill="none" aria-hidden="true">
      <path d="M22 357H510" stroke="#c7bba5" strokeWidth="2" />
      <path d="M36 355V128h137v227" fill="#e0a369" /><path d="M32 126h146v16H32z" fill="#bf774b" />
      <path d="M60 126V93a44 44 0 0 1 88 0v33" fill="#eac28e" /><path d="M72 126V95a32 32 0 0 1 64 0v31" fill="#f9e4bc" />
      <path d="M88 124V99a16 16 0 0 1 32 0v25" fill="#b77952" />
      <path d="M53 190h103v153H53z" fill="#7a5a3e" /><path d="M64 343V234a40 40 0 0 1 80 0v109" fill="#eedfc6" />
      <path d="M75 343V236a29 29 0 0 1 58 0v107" fill="#3d5b47" /><path d="M104 207v136" stroke="#dbb98a" strokeWidth="4" />
      <path d="m47 172 7-29h104l8 29" fill="#fff1d7" /><path d="m62 143-5 29m25-29-2 29m23-29v29m22-29 2 29m19-29 5 29" stroke="#b5754c" strokeWidth="10" />
      <path d="M181 355V58h143v297" fill="#f1d3a3" /><path d="M192 58V40h121v18" fill="#cf9d69" />
      <path d="M225 40a28 28 0 0 1 55 0" fill="#dfb47f" /><path d="M210 104a17 17 0 0 1 34 0v36h-34zm52 0a17 17 0 0 1 34 0v36h-34z" fill="#bb895b" />
      <path d="M218 104a9 9 0 0 1 18 0v28h-18zm52 0a9 9 0 0 1 18 0v28h-18z" fill="#faedcf" />
      <path d="M197 181h112v162H197z" fill="#2d5241" /><path d="M198 211h110M253 211v133" stroke="#caab74" strokeWidth="4" />
      <path d="M195 155h116v28H195z" fill="#5d7456" /><text x="253" y="174" textAnchor="middle" fill="#fff0ce" fontSize="11" fontFamily="Georgia">THE OCCASION EDIT</text>
      <path d="M336 355V159h116v196" fill="#ce8970" /><path d="M347 159V128h92v31" fill="#b97561" />
      <path d="M350 219h88v124h-88z" fill="#ebc8a4" /><path d="M365 342v-87a29 29 0 0 1 58 0v87" fill="#745e52" />
      <path d="m343 195 8-24h86l8 24" fill="#f6dfb9" /><path d="m359 172-4 23m25-23v23m23-23v23m22-23 5 23" stroke="#ae674f" strokeWidth="10" />
      <path d="M16 355h27l-4-42H20zm451 0h26l-3-35h-20" fill="#ad6846" /><path d="M30 319v-62m0 28q-35-8-22-28 23 4 22 28m0 12q34-8 25-28-22 2-25 28m449 30v-60m0 28q-27-6-20-24 20 2 20 24m0 9q27-6 21-24-20 2-21 24" stroke="#667b52" strokeWidth="7" />
    </svg>
    <div className={styles.productFloat}><div className={styles.floatPhoto}><Image src="/products/lehenga.jpg" alt="" fill sizes="170px" style={{objectFit:"cover",objectPosition:"top"}} priority /></div><div><small>THE CELEBRATION EDIT</small><strong>Kanchi Silk Lehenga</strong><span>$229 <em>Sample product</em></span></div></div>
    <div className={styles.agentFloat}><span><HomeIcon name="sparkles" /></span><div><strong>Your occasion. Your style.</strong><small>A little help finding your perfect match.</small></div></div>
    <div className={styles.sceneCaption}><span /> Imagined storefronts. Endless inspiration.</div>
  </div>;
}
