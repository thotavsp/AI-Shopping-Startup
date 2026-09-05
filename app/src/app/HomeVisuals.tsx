import Image from "next/image";
import photos from "./homePhotos.module.css";

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

const places = [
  { id: "charminar", label: "Charminar", detail: "Old City, Hyderabad", alt: "Charminar’s minarets and arch above the busy Old City street", author: "DidierTais", year: "2008", license: "3.0", source: "Charminar_Hyderabad_1.jpg" },
  { id: "ameerpet", label: "Ameerpet", detail: "Around Maitrivanam", alt: "Shops and commercial buildings beside Ameerpet metro station", author: "Tushar0034", year: "2025", license: "4.0", source: "Near_Maitrivanam,_After_Satyam_Theatre_Road,_Ameerpet,_Hyderabad,_Nov_2025.jpg" },
  { id: "kphb", label: "KPHB", detail: "A walk through the street market", alt: "A street market lined with shops in KPHB, Kukatpally", author: "Tushar0034", year: "2025", license: "4.0", source: "KPHB_Street_Market,_Kukatpally,_JNTU,_Oct_2025.jpg" },
];

export function HomeScene() {
  return <section className={photos.scene} aria-label="Hyderabad in photographs">
    <div className={photos.heading}><span><HomeIcon name="pin" size={16} /> HYDERABAD, UP CLOSE</span><small>Real places. Familiar streets.</small></div>
    <div className={photos.collage}>{places.map((place,index) => <figure key={place.id} className={index === 0 ? photos.landmark : photos.neighborhood}>
      <Image src={`/places/${place.id}.webp`} alt={place.alt} fill sizes={index === 0 ? "(max-width: 800px) 58vw, 320px" : "(max-width: 800px) 38vw, 210px"} priority={index === 0} style={{objectFit:"cover",objectPosition:index === 0 ? "50% 50%" : index === 2 ? "50% 70%" : "45% 50%"}} />
      <figcaption><strong>{place.label}</strong><span>{place.detail}</span></figcaption>
    </figure>)}</div>
    <p className={photos.note}>Location photography for inspiration · Not live views or partner-store listings.</p>
    <details className={photos.credits}><summary>Photo credits & licenses</summary><ul>{places.map(place => <li key={place.id}><a href={`https://commons.wikimedia.org/wiki/File:${place.source}`}>{place.label}</a> — {place.author}, {place.year} · <a href={`https://creativecommons.org/licenses/by-sa/${place.license}/`}>CC BY-SA {place.license}</a>.</li>)}</ul><p>Photos resized and converted to WebP; display crops vary by screen. Adapted images retain their original licenses. No photographer or pictured business endorsement is implied.</p></details>
  </section>;
}
