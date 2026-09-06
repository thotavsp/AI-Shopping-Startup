"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Brief, catalog, stores } from "../data/marketplace";

type Hold = { id: string; productId: number; size: string; expiresAt: number };
type Broadcast = { live: boolean; title: string; productId: number };
type Request = { id: string; productId: number; brief: Brief; status: "waiting" | "assigned" };
type Operations = { holds: Hold[]; broadcasts: Record<string, Broadcast>; requests: Request[] };
const initial: Operations = { holds: [], requests: [], broadcasts: { heritage: { live: true, title: "The celebration edit · fictional broadcast", productId: 1 } } };
const key = "indiaanytime.operations.v1";
const Context = createContext<(Operations & { ready: boolean; reserve: (productId: number, size: string) => void; release: (id: string) => void; setBroadcast: (storeId: string, value: Broadcast) => void; requestLive: (productId: number, brief: Brief) => void; assignRequest: (id: string) => void }) | null>(null);
export function DemoOperationsProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<Operations>(initial);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      try {
        const raw = JSON.parse(sessionStorage.getItem(key) ?? "null");
        if (raw && Array.isArray(raw.holds) && Array.isArray(raw.requests) && raw.broadcasts && typeof raw.broadcasts === "object") {
          const holds = raw.holds.filter((h: Hold) => h && typeof h.id === "string" && Number.isFinite(h.expiresAt) && h.expiresAt > Date.now() && catalog.some(p => p.id === h.productId && p.sizes.includes(h.size)));
          const broadcasts = Object.fromEntries(Object.entries(raw.broadcasts).filter((entry): entry is [string, Broadcast] => { const [id, value] = entry; const b = value as Broadcast; return stores.some(s => s.id === id) && b && typeof b.live === "boolean" && typeof b.title === "string" && catalog.some(p => p.id === b.productId && p.storeId === id); }));
          const requests = raw.requests.filter((r: Request) => r && typeof r.id === "string" && catalog.some(p => p.id === r.productId) && ["waiting", "assigned"].includes(r.status) && r.brief && ["intent", "budget", "occasion", "eventDate", "size", "destination"].every(k => typeof (r.brief as unknown as Record<string, unknown>)[k] === "string"));
          setState({ holds, broadcasts, requests });
        }
      } catch { /* Malformed or unavailable storage falls back to fictional fixtures. */ }
      setReady(true);
    });
    const timer = setInterval(() => setState(current => current.holds.some(h => h.expiresAt <= Date.now()) ? { ...current, holds: current.holds.filter(h => h.expiresAt > Date.now()) } : current), 1000);
    return () => { active = false; clearInterval(timer); };
  }, []);
  useEffect(() => { if (ready) { try { sessionStorage.setItem(key, JSON.stringify(state)); } catch { /* Session remains usable in memory. */ } } }, [ready, state]);
  return <Context.Provider value={{ ...state, ready,
    reserve: (productId, size) => { if (!ready || !catalog.some(p => p.id === productId && p.sizes.includes(size))) return; setState(current => ({ ...current, holds: [...current.holds.filter(h => h.productId !== productId || h.size !== size), { id: `HOLD-${crypto.randomUUID().slice(0,8)}`, productId, size, expiresAt: Date.now() + 30 * 60000 }] })); },
    release: id => setState(current => ({ ...current, holds: current.holds.filter(h => h.id !== id) })),
    setBroadcast: (storeId, value) => { if (!ready || !stores.some(s => s.id === storeId) || !catalog.some(p => p.id === value.productId && p.storeId === storeId)) return; setState(current => ({ ...current, broadcasts: { ...current.broadcasts, [storeId]: value } })); },
    requestLive: (productId, brief) => { if (!ready || !catalog.some(p => p.id === productId)) return; setState(current => current.requests.some(r => r.productId === productId && r.status === "waiting") ? current : ({ ...current, requests: [{ id: `REQ-${crypto.randomUUID().slice(0,8)}`, productId, brief: { ...brief }, status: "waiting" }, ...current.requests] })); },
    assignRequest: id => setState(current => ({ ...current, requests: current.requests.map(r => r.id === id ? { ...r, status: "assigned" } : r) })),
  }}>{children}</Context.Provider>;
}
export function useDemoOperations() { const context = useContext(Context); if (!context) throw new Error("DemoOperationsProvider required"); return context; }
