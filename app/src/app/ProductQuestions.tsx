"use client";

import { useEffect, useRef, useState } from "react";
import { products } from "../data/products";

type Product = (typeof products)[number];
type Exchange = { question: string; answer: string };
const suggestions = ["What is the price?", "When will it arrive?", "Is it available?", "What are the ratings?", "Why was it recommended?"];

export function answerProductQuestion(product: Product, question: string, matchReason?: string): string {
  const q = question.toLowerCase();
  const answers: string[] = [];
  if (/\b(price|cost|expensive|budget)\b/.test(q)) answers.push(`The listed price is $${product.price} USD. Shipping charges, taxes, and discounts are not provided.`);
  if (/\b(delivery|deliver|arrive|arrival|shipping|ship)\b/.test(q)) answers.push(`${product.delivery}. This is a catalog estimate, not a guaranteed arrival date.`);
  if (/\b(available|availability|stock)\b/.test(q)) answers.push(`The catalog availability label says “${product.availability}”. Live inventory has not been checked.`);
  if (/\b(rating|ratings|review|reviews|stars)\b/.test(q)) answers.push(`The listed rating is ${product.rating} out of 5 from ${product.reviews} reviews. Individual review text is not available.`);
  if (/\b(why|match|recommend|recommended|recommendation)\b/.test(q)) answers.push(matchReason ?? `The catalog’s sample match explanation is: “${product.matchReason}” This explanation is prewritten and has not been evaluated against your current shopping request.`);
  if (/\b(retailer|store|seller|sells)\b/.test(q)) answers.push(`The listed retailer is ${product.retailer}.`);
  if (/\b(material|fabric|description|describe|occasion|style)\b/.test(q)) answers.push(`${product.description} Listed occasion: ${product.occasion}. No further fabric specifications are provided.`);
  if (/\b(size|sizes|sizing|fit|return|returns|refund|exchange|authentic|authenticity|wash|care|custom|customize)\b/.test(q)) answers.push("The catalog does not include sizing, fit, returns, authenticity verification, care, or customization details. Ask the retailer before deciding.");
  return answers.length ? `${answers.join("\n\n")}\n\nThese are the details available for the topics recognized in your question; other specifics are not verified.` : "I don’t have that information in this product’s catalog entry. Try a suggested question about price, delivery, availability, ratings, or the sample match reason. Ask the retailer for anything else.";
}

export default function ProductQuestions({ product, request, matchReason, onClose, onSchedule }: {
  product: Product; request: string; matchReason: string; onClose: () => void; onSchedule: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [question, setQuestion] = useState("");
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  useEffect(() => { dialog.current?.showModal(); }, []);

  function ask(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;
    setExchanges((current) => [...current, { question: trimmed, answer: answerProductQuestion(product, trimmed, matchReason) }]);
    setQuestion("");
  }

  return (
    <dialog ref={dialog} onCancel={onClose} aria-labelledby="product-questions-heading" className="m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-3xl p-6 text-stone-900 shadow-2xl backdrop:bg-black/50">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Product Q&A · Catalog prototype</p>
          <h2 id="product-questions-heading" className="mt-2 text-2xl font-bold">Ask about {product.name}</h2>
          <p className="mt-1 text-sm text-stone-600">{product.retailer}</p>
        </div>
        <button onClick={onClose} aria-label="Close product questions" className="rounded-lg border px-3 py-2">✕</button>
      </div>
      <p className="mt-4 text-sm text-stone-600">Answers use this product’s sample catalog data. No live AI, inventory check, or retailer contact is involved.</p>
      {request && <p className="mt-4 rounded-xl bg-stone-100 p-3 text-sm"><strong>Your shopping request:</strong> {request}</p>}
      <div className="mt-5 flex flex-wrap gap-2" aria-label="Suggested questions">
        {suggestions.map((suggestion) => <button key={suggestion} onClick={() => ask(suggestion)} className="rounded-full border px-3 py-2 text-sm">{suggestion}</button>)}
      </div>
      <div role="log" aria-label="Product answers" aria-live="polite" className="mt-5 space-y-4">
        {exchanges.map((exchange, index) => <div key={index} className="rounded-xl bg-stone-100 p-4">
          <h3 className="font-semibold">{exchange.question}</h3>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">{exchange.answer}</p>
        </div>)}
      </div>
      <form className="mt-5" onSubmit={(event) => { event.preventDefault(); ask(question); }}>
        <label htmlFor="product-question" className="text-sm font-medium">Your question</label>
        <input id="product-question" value={question} maxLength={500} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about this product" className="mt-2 w-full rounded-xl border p-3" />
        <div className="mt-3 flex flex-wrap gap-3">
          <button disabled={!question.trim()} className="rounded-xl bg-black px-5 py-3 text-white disabled:opacity-50">Ask question</button>
          <button type="button" onClick={onSchedule} className="rounded-xl border px-4 py-3">Plan a shopping session</button>
          {exchanges.length > 0 && <button type="button" onClick={() => setExchanges([])} className="rounded-xl border px-4 py-3">Clear conversation</button>}
        </div>
      </form>
    </dialog>
  );
}
