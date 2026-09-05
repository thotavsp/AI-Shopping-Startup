"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Brief, CartLine, catalog, emptyBrief, subtotal } from "../data/marketplace";

type Order = { id: string; brief: Brief; lines: CartLine[]; total: number };
type State = { brief: Brief; cart: CartLine[]; orders: Order[] };
const initial: State = { brief: emptyBrief, cart: [], orders: [] };
const key = "indiaanytime.trip.v1";
function validLine(value: unknown): value is CartLine {
  if (!value || typeof value !== "object") return false;
  const line = value as CartLine;
  return Number.isInteger(line.quantity) && line.quantity > 0 && line.quantity <= 9 && !!catalog.find(p => p.id === line.productId && p.sizes.includes(line.size));
}
function validBrief(value: unknown): value is Brief {
  return !!value && typeof value === "object" && Object.keys(emptyBrief).every(k => typeof (value as Record<string, unknown>)[k] === "string");
}
const Commerce = createContext<{
  state: State; ready: boolean; message: string;
  updateBrief: (brief: Brief) => void; add: (id: number, size: string) => void;
  remove: (id: number, size: string) => void; checkout: () => void;
} | null>(null);
export function CommerceProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState(initial);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      try {
        const saved = JSON.parse(sessionStorage.getItem(key) ?? "null");
        if (saved && validBrief(saved.brief) && Array.isArray(saved.cart) && Array.isArray(saved.orders)) {
          setState({ brief: saved.brief, cart: saved.cart.filter(validLine), orders: saved.orders.filter((order: Order) => order && typeof order.id === "string" && validBrief(order.brief) && Array.isArray(order.lines) && order.lines.every(validLine) && order.total === subtotal(order.lines)) });
        }
      } catch { setMessage("Saved trip could not be loaded. You can still shop in this visit."); }
      setReady(true);
    });
    return () => { active = false; };
  }, []);
  function save(next: State, feedback = "") {
    setState(next);
    try { sessionStorage.setItem(key, JSON.stringify(next)); setMessage(feedback); }
    catch { setMessage(`${feedback} Changes are available for this page visit, but browser storage is unavailable.`); }
  }
  return <Commerce.Provider value={{ state, ready, message,
    updateBrief: brief => save({ ...state, brief }),
    add: (id, size) => {
      if (!ready) return;
      const product = catalog.find(p => p.id === id && p.sizes.includes(size));
      if (!product) { setMessage("Choose a listed demo size before adding this item."); return; }
      const existing = state.cart.find(line => line.productId === id && line.size === size);
      if (existing && existing.quantity >= 9) { setMessage("Demo limit: 9 units per variant."); return; }
      const cart = existing ? state.cart.map(line => line === existing ? { ...line, quantity: line.quantity + 1 } : line) : [...state.cart, { productId: id, size, quantity: 1 }];
      save({ ...state, cart }, `${product.name} added to your mock shopping bag.`);
    },
    remove: (id,size) => save({ ...state, cart: state.cart.filter(line => line.productId !== id || line.size !== size) }, "Item removed from the mock bag."),
    checkout: () => {
      if (!ready || !state.cart.length) return;
      if (!state.brief.destination.trim()) { setMessage("Add a US destination to your shopping brief before creating a mock order."); return; }
      const order = { id: `DEMO-${crypto.randomUUID().slice(0,8).toUpperCase()}`, brief: { ...state.brief }, lines: state.cart.map(line => ({ ...line })), total: subtotal(state.cart) };
      save({ ...state, orders: [order, ...state.orders], cart: [] }, `${order.id} created locally. No payment, reservation or retailer contact occurred.`);
    }
  }}>{children}</Commerce.Provider>;
}
export function useCommerce() { const context = useContext(Commerce); if (!context) throw new Error("CommerceProvider required"); return context; }
export function ShoppingBrief() {
  const { state, ready, updateBrief } = useCommerce();
  return <details className="mx-auto my-6 w-full max-w-6xl rounded-2xl border border-stone-200 bg-white p-5 text-stone-800"><summary className="cursor-pointer font-semibold">Your shopping brief <span className="font-normal text-stone-500">· follows you across stores</span></summary><p className="my-3 text-sm text-stone-500">Saved for this browser tab only. USD prices. Use a US city/state, not a personal address. Unknown fields remain unconfirmed.</p><div className="grid gap-4 md:grid-cols-3">{([
    ["intent", "What are you looking for?", "text"], ["budget", "Merchandise budget (USD)", "number"], ["occasion", "Occasion", "text"], ["eventDate", "Event date", "date"], ["size", "Preferred size (S, M, L)", "text"], ["destination", "US destination city / state", "text"],
  ] as const).map(([field,label,type]) => <label key={field} className="text-sm">{label}<input type={type} min={type === "number" ? "1" : undefined} step={type === "number" ? "0.01" : undefined} maxLength={200} disabled={!ready} value={state.brief[field]} onInput={event => updateBrief({ ...state.brief, [field]: field === "size" ? event.currentTarget.value.toUpperCase() : event.currentTarget.value })} className="mt-2 block w-full rounded-lg border border-stone-300 p-3" /></label>)}</div></details>;
}
