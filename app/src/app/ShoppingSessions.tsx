"use client";

import { useEffect, useRef, useState } from "react";

type Session = { id: string; product: string; request: string; startsAt: string; timeZone: string };
const storageKey = "nightshop.sessions.v1";

function validSession(value: unknown): value is Session {
  if (!value || typeof value !== "object") return false;
  const session = value as Record<string, unknown>;
  return ["id", "product", "request", "startsAt", "timeZone"].every((key) => typeof session[key] === "string")
    && Number.isFinite(Date.parse(session.startsAt as string));
}

function sessionTime(session: Session) {
  // Format in the current browser timezone, including its offset/abbreviation.
  return new Intl.DateTimeFormat(undefined, { dateStyle: "full", timeStyle: "short" }).format(new Date(session.startsAt));
}

export default function ShoppingSessions({ product, request, onClose }: {
  product: string | null; request: string; onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [ready, setReady] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [storageError, setStorageError] = useState("");
  const [confirmation, setConfirmation] = useState<Session | null>(null);
  const [timeZone, setTimeZone] = useState("");

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
      try {
        const stored: unknown = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
        if (Array.isArray(stored)) setSessions(stored.filter(validSession));
      } catch {
        setStorageError("Saved requests could not be loaded from this browser.");
      }
      setReady(true);
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (product) dialog.current?.showModal();
    else dialog.current?.close();
  }, [product]);

  function close() {
    onClose();
    setDate(""); setTime(""); setNotes(null); setError(""); setConfirmation(null);
  }

  function persist(next: Session[]) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      setSessions(next);
      setStorageError("");
      return true;
    } catch {
      setStorageError("This browser could not save the change. Your request has not been saved; please try again.");
      return false;
    }
  }

  return (
    <>
      <section aria-labelledby="sessions-heading" className="mx-auto max-w-6xl px-6 pb-12">
        <h2 id="sessions-heading" className="text-2xl font-bold">Shopping session requests</h2>
        <p className="mt-2 text-sm text-stone-600">Local prototype: requests stay in this browser. No retailer is contacted and no appointment is booked.</p>
        <p className="mt-1 text-sm text-stone-600">Times shown in {timeZone || "your browser’s timezone"}.</p>
        {storageError && <p role="alert" className="mt-3 text-amber-800">{storageError}</p>}
        {sessions.length === 0 && <p className="mt-4 text-stone-600">{ready ? "No requests yet. Choose Shop Live on a product to plan a session." : "Loading requests…"}</p>}
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {sessions.map((session) => (
            <article key={session.id} className="rounded-xl border bg-white p-5">
              <p className="text-xs font-semibold uppercase text-stone-500">Saved request · Not booked</p>
              <h3 className="mt-2 font-semibold">{session.product}</h3>
              <p className="mt-2">{sessionTime(session)}</p>
              <p className="mt-2 whitespace-pre-wrap text-sm text-stone-600">{session.request || "No shopping notes added."}</p>
              <button onClick={() => persist(sessions.filter((item) => item.id !== session.id))} className="mt-4 rounded-lg border px-3 py-2 text-sm" aria-label={`Remove session request for ${session.product}`}>Remove request</button>
            </article>
          ))}
        </div>
      </section>
      <dialog ref={dialog} onCancel={close} aria-labelledby="schedule-heading" className="m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-3xl p-6 text-stone-900 shadow-2xl backdrop:bg-black/50">
        <div className="flex items-start justify-between gap-4">
          <h2 id="schedule-heading" className="text-2xl font-bold">{confirmation ? "Session request saved" : "Plan a shopping session"}</h2>
          <button onClick={close} aria-label="Close scheduling" className="rounded-lg border px-3 py-2">✕</button>
        </div>
        <p className="mt-3 text-sm text-stone-600">Saved in this browser only. This is not a retailer booking.</p>
        {storageError && <p role="alert" className="mt-3 text-amber-800">{storageError}</p>}
        {confirmation ? (
          <div className="mt-5 space-y-4" role="status">
            <h3 className="font-semibold">{confirmation.product}</h3>
            <p>{sessionTime(confirmation)} ({timeZone})</p>
            <p className="whitespace-pre-wrap">{confirmation.request || "No shopping notes added."}</p>
            <button onClick={close} className="rounded-xl bg-black px-5 py-3 text-white">Done</button>
          </div>
        ) : (
          <form className="mt-5 space-y-4" onSubmit={(event) => {
            event.preventDefault();
            const fields = new FormData(event.currentTarget);
            const enteredTime = String(fields.get("time"));
            const starts = new Date(`${fields.get("date")}T${enteredTime}`);
            if (!product || !Number.isFinite(starts.getTime()) || starts.getTime() <= Date.now()) {
              setError("Choose a date and time in the future."); return;
            }
            // Reject nonexistent local times during daylight-saving transitions.
            if (starts.getHours() !== Number(enteredTime.slice(0, 2)) || starts.getMinutes() !== Number(enteredTime.slice(3, 5))) {
              setError("That local time is unavailable due to a clock change. Choose another time."); return;
            }
            if (sessions.some((session) => session.product === product && session.startsAt === starts.toISOString())) {
              setError("You already have a request for this product at that time."); return;
            }
            const session = { id: crypto.randomUUID(), product, request: notes ?? request, startsAt: starts.toISOString(), timeZone };
            if (persist([...sessions, session])) { setConfirmation(session); setError(""); }
          }}>
            <p className="font-semibold">{product}</p>
            <p className="text-sm text-stone-600">Choose your preferred time in {timeZone}. Retailer availability is not checked.</p>
            <label className="block">Date<input name="date" required type="date" value={date} onChange={(event) => setDate(event.target.value)} className="mt-1 block w-full rounded-lg border p-3" /></label>
            <label className="block">Time<input name="time" required type="time" value={time} onChange={(event) => setTime(event.target.value)} className="mt-1 block w-full rounded-lg border p-3" /></label>
            <label className="block">Shopping request<textarea value={notes ?? request} onChange={(event) => setNotes(event.target.value)} className="mt-1 block w-full rounded-lg border p-3" /></label>
            {error && <p role="alert" className="text-red-700">{error}</p>}
            <button disabled={!ready} className="w-full rounded-xl bg-black px-5 py-3 text-white disabled:opacity-50">Save session request</button>
          </form>
        )}
      </dialog>
    </>
  );
}
