import { products } from "./products";

export const stores = [
  { id: "heritage", name: "Hyderabad Heritage", type: "Major retailer", city: "Hyderabad", district: "Banjara Hills", specialty: "Silks for every celebration", color: "#294e41", initials: "HH", status: "AI open · Live by request" },
  { id: "banjara", name: "Banjara Ethnic Studio", type: "Boutique", city: "Hyderabad", district: "Banjara Hills", specialty: "A modern take on occasion wear", color: "#986347", initials: "BE", status: "AI open · Schedule an associate" },
  { id: "charminar", name: "Charminar Collections", type: "Local shop", city: "Hyderabad", district: "Old City", specialty: "Tradition, one beautiful detail at a time", color: "#77613c", initials: "CC", status: "AI open · Live by request" },
  { id: "artisan", name: "Deccan Threadworks", type: "Artisan", city: "Hyderabad", district: "Old City", specialty: "Small details. Handcrafted stories.", color: "#655477", initials: "DT", status: "AI open · Replies by appointment" },
];
export const catalog = [
  ...products.map((product, index) => ({ ...product, storeId: stores[index].id, sku: `IA-${product.id}`, sizes: ["S", "M", "L"], etaDays: 8, eligible: true })),
  { id: 4, storeId: "artisan", sku: "DT-STOLE-01", name: "Handwoven Festive Stole", category: "Accessory", price: 24, retailer: "Deccan Threadworks", description: "A lightweight woven accent in warm gold tones.", image: "", sizes: ["One size"], etaDays: 10, eligible: true, availability: "Mock availability", delivery: "Illustrative US delivery: 7–10 days", rating: 4.8, reviews: 18, occasion: "Celebrations", matchReason: "A complementary accent for occasion wear." },
];
export type Brief = { intent: string; budget: string; occasion: string; eventDate: string; size: string; destination: string };
export const emptyBrief: Brief = { intent: "", budget: "", occasion: "", eventDate: "", size: "", destination: "" };
export type CartLine = { productId: number; size: string; quantity: number };
export function subtotal(lines: CartLine[]) { return lines.reduce((sum, line) => sum + (catalog.find(p => p.id === line.productId)?.price ?? 0) * line.quantity, 0); }
export function deliveryRisk(brief: Brief, days: number, now = new Date()) {
  if (!brief.destination.trim()) return "Add a US destination to review delivery. No address is needed for this demo.";
  if (!brief.eventDate) return "Add an event date to assess timing. Delivery remains unverified.";
  const deadline = Date.parse(`${brief.eventDate}T00:00:00Z`);
  if (!Number.isFinite(deadline)) return "Enter a valid event date.";
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const remaining = Math.floor((deadline - today) / 86400000);
  if (remaining <= 0) return "Event date has arrived or passed. Delivery before this event is not feasible in the demo.";
  if (remaining <= days) return "At risk: the illustrative arrival window reaches or exceeds your event date. Consider another option; expedite service is not verified.";
  return `Illustrative timing leaves ${remaining - days} days before the event. This is not a delivery promise; stock, pickup and customs are unverified.`;
}
export function tripSuggestions(brief: Brief) {
  const budget = brief.budget.trim() ? Number(brief.budget) : null;
  const outfit = catalog.filter(p => p.category !== "Accessory" && (!brief.size || p.sizes.includes(brief.size)) && (budget === null || p.price <= budget)).sort((a,b) => a.price-b.price)[0];
  if (!outfit) return [];
  const accessory = catalog.find(p => p.category === "Accessory" && (budget === null || outfit.price + p.price <= budget));
  return accessory ? [outfit, accessory] : [outfit];
}
