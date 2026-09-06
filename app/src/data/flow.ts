export const flowStages = ["Retailer pickup", "Multi-store consolidation", "Export documents", "India export customs", "International transit", "US import customs", "US last mile", "Delivered"];
export type Journey = { stage: number; delayDays: number; expedited: boolean; events: string[] };
export const initialJourney: Journey = { stage: 0, delayDays: 0, expedited: false, events: [] };
export function assessDelivery(eventDate: string, destination: string, journey: Journey, now = new Date()) {
  const remaining = Math.max(0, 8 - journey.stage);
  const low = journey.stage === 7 ? 0 : Math.max(1, remaining - (journey.expedited ? 2 : 0)) + journey.delayDays;
  const high = journey.stage === 7 ? 0 : low + 3;
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const deadline = /^\d{4}-\d{2}-\d{2}$/.test(eventDate) ? Date.parse(`${eventDate}T00:00:00Z`) : NaN;
  const daysToEvent = Number.isFinite(deadline) ? Math.floor((deadline - today) / 86400000) : null;
  const risk = !destination.trim() || daysToEvent === null ? "Unknown" : daysToEvent <= 0 ? "Event passed / today" : journey.stage === 7 ? "Delivered in simulation" : daysToEvent <= low ? "High risk" : daysToEvent <= high + 2 ? "Tight window" : "More buffer";
  const recommendation = risk === "Unknown" ? "Add an event date and destination to assess the mock arrival window." : risk === "Event passed / today" ? "Do not rely on delivery for this event. Discuss a local alternative." : risk === "High risk" || risk === "Tight window" ? "Review expedited feasibility and an alternative outfit. Expediting cannot guarantee customs clearance or arrival." : "Keep monitoring pickup and customs; this estimate is illustrative.";
  return { low, high, risk, recommendation, daysToEvent, earliest: new Date(today + low * 86400000).toISOString().slice(0,10), latest: new Date(today + high * 86400000).toISOString().slice(0,10) };
}
