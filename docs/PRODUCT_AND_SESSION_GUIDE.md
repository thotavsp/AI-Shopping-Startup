# IndiaAnytime — Product Overview and Working Session Guide

**India. Always Open.**
**Shop India like you’re there.**

Status baseline: September 5, 2026 build, verified against repository commit `a776395` for this documentation session. This is a maintained handoff document, not a claim that the production MVP is complete. Recheck the repository before starting new work.

## 1. Product vision

IndiaAnytime helps customers outside India discover Indian stores, find products for an occasion, explore them with a store associate, and understand the journey from store to destination. The experience combines conversational shopping with the pleasure of browsing a shopping street.

The initial demonstration focuses on Indian apparel and accessories from fictional Hyderabad stores, with a US destination. Customers can begin with **Ask IndiaAnytime** or **Explore Stores**. Retailers operate through **IndiaAnytime Partner**, visual discovery happens through **Try-On**, **Private Live Shopping** and **Store Live**, and the order journey is explained through **IndiaAnytime Flow**.

The core demonstration is: “I need a traditional Indian outfit for my daughter’s event. My merchandise budget is around $250.” The app should gather the exact event date, size and US city/state, preserve that context through shopping, and explain uncertainty before suggesting a purchase or delivery scenario.

### Product participants

| Participant | Main need | Current surface |
| --- | --- | --- |
| Shopper | Find, compare and explore products; preserve occasion/budget context | Ask, Explore, store pages, bag |
| Shopper and associate | Examine a product privately and discuss options | Private shopping mock |
| Public viewer | Watch a store presentation and shop featured products | Store Live mock |
| Retailer/operator | Review products, requests, orders, merchandising and broadcasts | Partner workspace |
| Logistics operator/customer | Understand consolidation, delivery stages and event-date risk | Flow simulator |

There are no authenticated roles or real user accounts. These are product perspectives within one local demo.

## 2. Current delivery status

**A connected, clickable local prototype is implemented across all major product surfaces.** It demonstrates the journey, not production commerce. Retailers, customers, ratings, stock, offers, orders, broadcasts and shipping scenarios are fictional. Existing location photography depicts real places for inspiration and does not identify verified partner stores.

Status terms used below:

- **Working demo:** an interactive local behavior with a visible result.
- **Preview / partial:** a visible illustration, draft or workflow without full downstream integration.
- **Pending:** not implemented or not yet verified at the stated depth.
- **Deferred:** outside the currently authorized local-demo scope.

### Marketplace and Ask IndiaAnytime

| Capability | Status and behavior |
| --- | --- |
| Brand and homepage | Working demo. IndiaAnytime identity, both taglines, Hyderabad location photography, Ask and Explore entry paths, public Store Live tiles and navigation. |
| Ask recommendations | Working demo. Local rules apply recognized USD budgets and clothing terms to the submitted query, rank by occasion/rating/price, and explain matches. Not a live AI model; arbitrary intent and sizing are not fully interpreted. |
| Product questions | Working demo. Catalog-only answers and scheduling handoff; no invented retailer policy, authenticity, fit or live stock claims. |
| Compare | Working demo. Up to three products, including cross-store comparison within Explore. Homepage and Explore comparison selections are separate page state. |
| Saved shortlist | Working demo. Existing browser-local shortlist preserved; it is separate from the saved try-on look. |
| Shopping brief | Working demo. Intent, USD merchandise budget, occasion, event date, preferred size and US city/state follow navigation. |
| Explore Stores | Working demo. Four Hyderabad storefronts, district filters, tile/street modes, collections, Q&A, comparison and shopping actions. |
| Individual store pages | Working demo. Stable store URLs, identity and a featured catalog product with shoppable public presentation. Invalid store IDs return not found. Each current store has one catalog product. |
| Other cities | Preview. Bengaluru, Chennai, Mumbai and Delhi are labeled concepts, not populated marketplaces. |
| Shopping-trip suggestions | Working rules demo. Lower-priced outfit and complementary accessory within listed size/budget constraints; not a complete itinerary planner or unconstrained AI assistant. |
| Bag and mock order | Working demo. Product/size/quantity lines, remove, merchandise subtotal, budget/timing notices, and mock checkout. No charge, stock reservation or retailer contact. |

### Fictional working catalog

| Store / ID | Type | Product / ID | USD price |
| --- | --- | --- | --- |
| Hyderabad Heritage / `heritage` | Major retailer | Kanchi Silk Lehenga / `1` | $229 |
| Banjara Ethnic Studio / `banjara` | Boutique | Designer Anarkali Set / `2` | $179 |
| Charminar Collections / `charminar` | Local shop | Festive Half-Saree Set / `3` | $199 |
| Deccan Threadworks / `artisan` | Artisan | Handwoven Festive Stole / `4` | $24 |

Apparel lists S/M/L; the stole lists One size. These are demo selections, not verified availability. Partner also contains older fictional inventory/customer/order snapshots, including products that are not in the shared customer catalog. Do not mistake these seed records for connected customer activity.

### IndiaAnytime Partner

| Capability | Status and behavior |
| --- | --- |
| Dashboard | Working demo. Existing seed dashboard preserved, with connected tab-activity metrics separately labeled. |
| Products/catalog | Partial. Shared catalog selection and draft pricing; older SKU/variant records remain a separate snapshot. Full product creation/editing and catalog publication are pending. |
| Inventory | Partial. SKU, color, size, location, on-hand/held/available figures shown in seed data. Shared holds exist, but do not decrement an atomic inventory ledger. |
| Holds | Working workflow demo. Product/size holds expire after 30 minutes, can be released, and are visible across private shopping and Partner in the same tab. No real stock is reserved. |
| Collections | Preview. Select products and save a local draft; no published storefront collection change. |
| Pricing/promotions/bundles | Preview. Draft price controls, percentage discount simulator, campaign toggle and bundle concept. Checkout continues to use catalog prices. |
| Cross-sell/upsell | Partial. Pairing and budget guidance, with local review/draft actions; no complete merchandising engine. |
| Live requests | Working workflow demo. Private-session requests snapshot the brief and appear for the relevant retailer; assignment changes local status. Legacy scheduled requests remain separate. |
| Orders | Working demo. Same customer-created mock orders as Flow, filtered to a retailer’s lines, with retailer subtotal/full-order total. Historical seed orders are separately displayed. |
| Associates | Preview. Fictional availability toggles and assignment eligibility; no employee contact, authentication or durable staffing system. |
| Analytics | Partial. Counts and merchandise totals from tab activity; no traffic, conversion, payment or production analytics service. |
| Live Studio | Working demo. Start/end/update a product-only simulated broadcast; storefront status, title and featured product use the shared state. |

### Visual Commerce

| Capability | Status and behavior |
| --- | --- |
| Try-On | Working illustration demo. Avatar-first or fictional illustrated model, catalog selection, sizes and conceptual colors. Generic silhouette; not garment rendering, body analysis or fit prediction. |
| Saved look | Working demo. Save, restore and remove one look in tab storage. No personal image or measurements collected. |
| Variant handoff | Partial. Product ID flows through links. Color concepts are not inventory variants; some size choices initialize afresh rather than following the prior surface. |
| Private shopping | Working simulation. Connecting/connected/end states, product illustration and close-up, scripted chat, timed hold, offer preview and shared bag. No real video connection. |
| Alternate/back view | Partial. Product switching and a scripted explanation for back view; no true back-view media. Switching retailers ends the prior session and revokes sharing. |
| Personal video consent | Working simulation. Explicit dialog changes a visible simulated sharing indicator only; no camera opens. Revoke and End clear sharing, and End clears chat/draft. |
| Public Store Live | Working presentation demo. Watch/pause mock, featured item, size choice, bag, local question response and 10% offer preview. Shopper camera/mic are never exposed. |

### IndiaAnytime Flow

Working demo features: reads customer-created mock orders; groups store contributions; displays retailer pickup, multi-store consolidation, export documents, India export customs, international transit, US import customs, US last mile and delivered stages. Stage advance/reset, two-day delay and expedite scenario controls update the local journey/event feed and survive reload.

ETA is an illustrative remaining-day range recalculated against the viewing date, not a carrier tracking estimate. Confidence is qualitative: missing context is unknown, deadline pressure is highlighted, and customs/pickup uncertainty remains explicit. The expedite comparison illustrates +$35 and up to two days saved; it is not charged or booked. No email/SMS/push notification is sent.

## 3. Connected journey and state boundaries

1. Ask/Explore capture the shopping brief.
2. Store, Try-On and Private Shopping can add the same catalog product/size to the shared bag.
3. Private Shopping creates a brief snapshot in the Partner request queue and can create a timed hold.
4. Partner Live Studio changes public broadcast state for that store.
5. Explore checkout snapshots the brief and lines, assigns a `DEMO-` order ID, stores catalog merchandise total and clears the bag.
6. Partner sees the retailer’s order lines; Flow sees the full order and models consolidation and delivery.

Changing the current brief does not rewrite an existing order. Bag quantity is capped at nine per product/size. Shipping, taxes and duties are not calculated. Holds and offer previews are not consumed/applied by checkout. Flow journey state is keyed to the shared order ID; Partner links to Flow for current scenario details rather than maintaining a competing journey copy.

| Storage/state | Scope |
| --- | --- |
| `indiaanytime.trip.v1` | Tab session storage: brief, bag, order snapshots |
| `indiaanytime.operations.v1` | Tab session storage: timed holds, requests, store broadcasts |
| `indiaanytime.flow.v1` | Tab session storage: journey scenarios by order ID |
| `indiaanytime.look.v1` | Tab session storage: one saved look |
| `nightshop.shortlist.v1` | Existing local storage: saved product shortlist |
| `nightshop.sessions.v1` | Existing local storage: scheduled request demo |
| Compare, chat, Partner drafts/availability | Page-local state; not durable account data |

State is browser-origin dependent: different ports/hostnames create separate demo storage. No backend, account sync, cross-tab realtime coordination or multi-user concurrency exists. Browser storage failures may leave only in-memory state. Preserve existing storage compatibility when evolving the schema.

## 4. Product boundaries to preserve

- Local mock/demo only. No paid APIs, production integrations, payments, real carriers/video/AI, AWS changes or public deployment in this phase.
- Keep fictional data and preview-only pricing clearly labeled. Never imply a retailer partnership, verified inventory, booking or delivery guarantee.
- Avatar first. Customer and associate personal cameras off; microphones off; product-only default; recording unavailable.
- Explicit, participant-specific consent must precede any future real personal-video sharing. The current dialog is only a simulation, not real authorization for device use.
- Visible sharing indicators, immediate revoke, and cleanup on end or retailer change must remain.
- Public Store Live cannot expose the shopper’s camera or microphone.
- Do not collect real photos, body data, precise addresses or sensitive chat content to demonstrate the product.
- Preserve Ask recommendations, Q&A, Compare, shortlist and the existing scheduling flow while extending the app.

## 5. Prioritized pending work

This is a proposed order for future sessions, not a decision to begin all items automatically.

| ID / priority | Work item | Acceptance target |
| --- | --- | --- |
| P01 / Next | Mobile and accessibility QA | All major routes work at phone/tablet widths; no overflow; keyboard-only navigation, labels, dialog focus/return and readable contrast checked; repeat privacy paths. |
| P02 / Next | Shared variant and context continuity | Product/size selections survive Try-On → private shopping → bag; invalid variants fail safely; distinguish preview colors from real variant IDs. Preserve submitted-query behavior and existing storage. |
| P03 / Next | Connect draft pricing/offers to mock checkout | One deterministic local pricing model supports eligibility, dates, caps and stacking; bag/order show list price, discount and merchandise total; invalid/expired offers cannot silently apply. No payment integration. |
| P04 / Next | Inventory and hold ledger | Stable SKU/location IDs; on-hand minus active holds drives availability; release/expiry restores stock; checkout consumes a mock hold consistently; prevent over-allocation in supported demo scope. |
| P05 / Soon | Unify live request lifecycle | Reconcile scheduled requests and private-room queue; explicit waiting/assigned/ended/cancelled states; retain brief, retailer and assigned associate; prevent stale waiting requests after an ended session. |
| P06 / Soon | Expand product/store management | Editable local product metadata, variant/try-on eligibility and collections; multiple products per store; storefront reflects saved drafts only through a clear publication action. |
| P07 / Soon | Strengthen visual shopping | Product-specific illustrations and useful alternate views; multiple saved looks if needed; honest visual limits maintained. Real image/video services remain deferred. |
| P08 / Soon | Consolidate demo timing assumptions | Align catalog timing, pre-checkout risk and Flow scenario explanations; distinguish original order estimate from changed journey; test deadlines/time zones and delayed multi-store pickup. |
| P09 / Soon | Repeatable end-to-end regression coverage | Automate discovery → bag → order → Partner/Flow, broadcast changes, holds/expiry, privacy revoke/retailer switch, invalid stored data and reload behavior. |
| P10 / Later demo | Improve operations and analytics | Clearer separation of historical seeds and connected activity, persistent local merchandising drafts, named associate assignment and meaningful measured demo metrics. |
| P11 / Separate decision | Production architecture and integrations | Define authenticated roles, durable state, permissions, data retention, inventory concurrency, security and provider contracts before any real integration. Requires separately authorized scope. |

Suggested first session: **P01 + a bounded P02 fix**, followed by **P03**, then **P04/P05**. This improves the existing journey before adding more surfaces. Avoid assigning two workers to shared state/pricing files at the same time.

## 6. Deferred production scope

Real retailer onboarding/partnerships, live catalog/inventory connections, production AI, photo-based try-on, real private/public video, recordings, payments/refunds, shipping/carrier/customs services, actual notifications, authentication/CRM, durable multi-user backend, infrastructure and AWS deployment remain unimplemented and outside current scope. Future city/store expansion requires actual catalog work; a city tab alone is not completion.

Production privacy and security controls cannot be inferred from a camera-free mock. Any production phase needs its own design, validation and explicit authorization.

## 7. Validation baseline and known gaps

Last code checkpoint validation (recorded during the preceding build session):

- Production build passed with webpack; all new routes compiled.
- All 11 recommendation, marketplace and Flow tests passed.
- Lint: zero errors, two pre-existing homepage image-optimization warnings.
- Git whitespace check passed.
- Browser-verified: recommendations/Compare, shared brief, Try-On save/bag, private connection/close-up/hold/consent/revoke/end, retailer-switch cleanup, same two-store order in Partner/Flow, Flow reload persistence and broadcast changes reflected publicly.
- No browser console errors observed in those checks. Desktop visuals inspected for homepage, Try-On, public storefront and Flow.

This documentation session rechecked source, Git state and the existing validation record; it did not rerun code tests. Mobile, exhaustive accessibility, automated full-journey coverage and production behavior remain unverified. Do not describe the whole expanded MVP as production-complete.

## 8. Repository map for future sessions

Repository: `/Users/thotavsp/Documents/AI-Shopping-Startup`
Application directory: `app/`
Framework baseline: Next.js 16.3.4, React 19.2.8, TypeScript, Tailwind CSS 4. Read `app/AGENTS.md` and relevant installed Next documentation before edits.

| Area | Repository-relative ownership |
| --- | --- |
| Homepage and original shopping | `app/src/app/page.tsx`, `ProductQuestions.tsx`, `ShoppingSessions.tsx` |
| Catalog and recommendation rules | `app/src/data/products.ts`, `marketplace.ts`, `recommendations.ts` |
| Shared shopping/order state | `app/src/app/CommerceContext.tsx` |
| Shared holds/requests/broadcasts | `app/src/app/DemoOperations.tsx` |
| Marketplace and broadcasts | `app/src/app/explore/`, `stores/[id]/`, `StoreLive.tsx`, `StoreLive.module.css` |
| Partner | `app/src/app/partner/`, especially `PartnerOperations.tsx` |
| Visual shopping | `app/src/app/try-on/`, `live-shopping/` |
| Flow | `app/src/app/flow/`, `app/src/data/flow.ts` |
| Shared provider setup | `app/src/app/layout.tsx` |
| Verification and scope | `app/tests/`, `docs/MVP.md`, this guide |

For parallel work, give each worker a separate route/component area. Establish shared contracts first and name one owner for context/catalog changes. Integrate, validate and commit after review. Agents do not necessarily inherit the root agent’s filesystem grants; stage files for integration if needed rather than repeatedly prompting the user.

### Commands

From `app/`:

```sh
npm run lint
node --test tests/*.test.mjs
npm run build -- --webpack
npm run dev
```

From the repository root:

```sh
git status --short
git diff --check
```

Webpack was used successfully for the production build. A local production preview previously ran at `http://127.0.0.1:3200`; verify it is running and reflects current code before relying on it. Do not stop unrelated servers.

### Git baseline

- `172b51b`: connected Marketplace, Visual Commerce, Partner and Flow build.
- `a776395`: expanded MVP scope, demo limits and acceptance results.
- Both were pushed to `origin/main`; documentation-session inspection found `a776395` at local HEAD.
- At inspection, unrelated untracked `.DS_Store`, `docs/prompt.txt` and `docs/workPrompt.txt` remained. Preserve them; do not add, delete or overwrite them as part of routine checkpoint cleanup.

## 9. Ready-to-use future session prompt

> Continue IndiaAnytime in `/Users/thotavsp/Documents/AI-Shopping-Startup`. Read `docs/PRODUCT_AND_SESSION_GUIDE.md` and `docs/MVP.md`, then inspect current Git status, recent commits and relevant source before editing. If this guide is supplied as a standalone attachment, use it as the baseline and verify it against the repository. Preserve existing completed work and unrelated files. Work on [backlog ID and bounded objective]. Keep all integrations local/mock: no paid APIs, production services, payments, AWS changes or real camera/mic/AI/carrier services. Preserve privacy defaults, explicit consent simulation, visible indicators and instant revoke. Reuse shared context and stable catalog IDs. Use separate file ownership if parallel work is worthwhile. Run relevant tests, lint, build and focused browser checks, fix issues, then create/push a clean scoped checkpoint as authorized. Update both documentation files with completed work, remaining limitations, validation and commit IDs. Finish with a concise completed/partial/pending report. Ask only for missing decisions or environment access that is actually necessary.

## 10. End-of-session maintenance

Update this guide and `docs/MVP.md` together when behavior changes. Record the new feature status, storage/schema changes, closed/open backlog IDs, validation actually run, known defects and Git checkpoint. Keep one clear next objective. Do not replace pending items with a blanket “complete” or count an unapplied preview as an integrated feature. Refresh dated seed labels and timing assumptions when they become misleading.
