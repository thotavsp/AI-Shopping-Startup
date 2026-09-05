import { products } from "./products";

type Product = (typeof products)[number];

export function recommend(request: string) {
  const q = request.toLowerCase();
  const foreignCurrency = /₹|€|£|\b(inr|rupees?|eur|gbp)\b/.test(q);
  const amount = q.match(/\b(under|below|less than|up to|at most|budget(?: of)?|maximum|max)\s*(?:usd\s*)?\$?\s*(\d+(?:,\d{3})*(?:\.\d+)?)/)
    ?? q.match(/()\$\s*(\d+(?:,\d{3})*(?:\.\d+)?)/);
  const budget = !foreignCurrency && amount ? Number(amount[2].replaceAll(",", "")) : null;
  const strict = !!amount && /^(under|below|less than)$/.test(amount[1]);
  const types: string[] = [];
  if (/\b(lehengas?)\b/.test(q)) types.push("Lehenga");
  if (/\b(anarkalis?)\b/.test(q)) types.push("Anarkali");
  if (/\b(sarees?|saris?)\b/.test(q)) types.push("Half Saree");
  const unsupported = /\b(men'?s?|male|boys?|sherwanis?|suits?|shoes?|jewell?ery|kurta|kurtas)\b/.test(q);
  const occasion = /\b(wedding|bridal|bride|marriage)\b/.test(q) ? "Wedding"
    : /\b(party|parties|celebration|celebrations|birthday)\b/.test(q) ? "Celebration"
    : /\b(traditional|festival|festive|puja|pooja)\b/.test(q) ? "Traditional" : null;
  const occasionMatches = (product: Product) => occasion === "Wedding" ? /wedding/i.test(product.occasion)
    : occasion === "Celebration" ? /parties|celebrations/i.test(product.occasion)
    : occasion === "Traditional" ? /traditional/i.test(`${product.occasion} ${product.description}`) : false;
  const withinBudget = (product: Product) => budget === null || (strict ? product.price < budget : product.price <= budget);
  const typeMatches = (product: Product) => types.length === 0 || types.includes(product.category);
  const ranked = unsupported ? [] : products.filter((product) => withinBudget(product) && typeMatches(product)).sort((a, b) =>
    Number(occasionMatches(b)) - Number(occasionMatches(a)) || b.rating - a.rating || a.price - b.price);
  function reason(product: Product) {
    const parts: string[] = [];
    if (unsupported) parts.push("This catalog item does not match the requested clothing category.");
    if (budget !== null) parts.push(withinBudget(product) ? `$${product.price} is ${strict ? "under" : "within"} your $${budget} USD budget.` : `$${product.price} exceeds your requested budget limit.`);
    if (types.length) parts.push(typeMatches(product) ? `Matches your requested clothing type (${product.category}).` : `This ${product.category} does not match your requested clothing type.`);
    if (occasion) parts.push(occasionMatches(product) ? `Its listed occasion or description matches ${occasion.toLowerCase()} wear.` : `Its listed occasion is ${product.occasion}; suitability for your ${occasion.toLowerCase()} needs is not verified.`);
    if (!parts.length) parts.push(`Listed as ${product.category} for ${product.occasion}.`);
    parts.push(`Catalog rating: ${product.rating}/5 from ${product.reviews} reviews.`);
    return parts.join(" ");
  }
  const tags = [budget !== null ? `${strict ? "Under" : "Up to"} $${budget} USD` : null, ...types, occasion ? `${occasion} preference` : null].filter((tag): tag is string => !!tag);
  const notice = foreignCurrency ? "Catalog prices are in USD. Your currency budget was not applied; currency conversion is unavailable."
    : unsupported ? "The current sample catalog does not include the requested clothing category."
    : "Filters recognize common budget and clothing terms; occasion affects ranking. Other details, including sizing and custom requirements, are not evaluated.";
  return { products: ranked, reason, tags, notice };
}
