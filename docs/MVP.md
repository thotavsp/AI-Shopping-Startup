# IndiaAnytime expanded MVP

**India. Always Open.** · **Shop India like you’re there.**

Build status: September 5, 2026. Local prototype in the existing private repository. All stores, people, catalog stock, ratings, offers, orders, broadcasts and logistics are fictional. No purchase, retailer contact, real hold, video stream or shipment occurs. No paid API, production payment, AWS change, carrier connection or AI service is included.

## Routes and implemented demo behavior

| Surface | Route | Available in this checkpoint |
| --- | --- | --- |
| Ask IndiaAnytime | `/` | Submitted-query rule-based recommendations, explanations, catalog questions, Compare (up to 3), saved shortlist, existing Shop Live/scheduling, shopping brief, Explore path and public Store Live tiles |
| Explore Stores | `/explore` | Four fictional Hyderabad retailers representing major retailer, boutique, small shop and artisan; district filters, virtual street/tile modes, collection, Compare, Q&A, size-aware bag, mock checkout |
| Individual stores | `/stores/[id]` | Store identity, collection, shared brief, public shoppable Store Live preview, featured product, local question reply, offer preview, try-on/private shopping links |
| IndiaAnytime Partner | `/partner` | Existing dashboard preserved; connected retailer selection, catalog and draft pricing, SKU/location snapshot inventory, shared timed holds, draft collections, discount/bundle previews, cross-sell/upsell review, live requests, connected orders, associate availability, tab activity analytics, product-only Live Studio |
| Visual Try-On | `/try-on?product=1` | Avatar-first or illustrated demo model, product/size selection, conceptual colors, save/restore/remove one look, shared bag and private shopping handoff |
| Private Live Shopping | `/live-shopping?product=1` | Simulated connection, product illustration/close-up, scripted chat, shared 30-minute hold, example offer, shared bag, local Partner request, consent/revoke controls |
| IndiaAnytime Flow | `/flow` | Actual mock orders from this tab, retailer pickup, multi-store consolidation, export documents/customs, international transit, US import customs and last mile; simulated stage/delay controls, event-date risk, ETA window, expedite comparison and local event feed |

Unknown store IDs return a not-found page. Bengaluru, Chennai, Mumbai and Delhi remain clearly labeled concept previews; working catalog is Hyderabad only.

## Shared state contract

- `CommerceContext` remains the source for the shopping brief, bag and checkout order snapshots. Catalog and stores use stable IDs from `data/marketplace.ts`.
- Brief includes intent, merchandise budget in USD, occasion, event date, size and US city/state. Do not collect a personal address for this demo.
- Ask and Explore share the brief. Store, try-on and private-shopping actions add the same product/size lines to the same bag. Maximum quantity is 9 per variant. Shipping, duties and taxes are excluded.
- Creating an order snapshots the brief and lines, calculates catalog merchandise total, assigns a `DEMO-` ID and clears the bag. Partner filters these same orders by retailer; Flow reads the same order and stores its own simulated journey by order ID.
- `DemoOperations` shares expiring product/size holds, local live requests and per-store broadcast status/title/featured product. Partner Live Studio changes appear in public Store Live within the same tab. Private-session requests snapshot the brief for Partner; repeated waiting requests for the same product are deduplicated.
- Holds expire after 30 minutes and can be released. They demonstrate workflow only, do not allocate actual inventory or reduce the separate historical SKU/location seed stock. A repeated hold on the same product/size refreshes its expiration.
- Tab storage keys: `indiaanytime.trip.v1`, `indiaanytime.operations.v1`, `indiaanytime.flow.v1`, `indiaanytime.look.v1`. Reload restores validated records where browser storage is available. No account sync or cross-tab realtime sync.
- Existing `nightshop.shortlist.v1` and `nightshop.sessions.v1` compatibility is preserved. Existing scheduled requests remain their original separate browser-local workflow; they are not appointments and are not the private-room queue.

## Privacy contract

- Try-on begins with an anonymous avatar. Demo-model mode uses an illustration. No real photo/body upload or camera access exists.
- Customer and associate personal cameras start off. Microphones stay off. Product-only mode is the default, and no recording is available.
- Personal-video buttons open an explicit consent dialog. Confirming changes only a simulated sharing indicator; no real feed opens. The dialog explains whose consent is being simulated; a future real service must obtain independent participant consent.
- Sharing indicators remain visible, each participant can be reset, and **Revoke all sharing** immediately restores product-only mode. Ending the mock session also resets sharing and clears chat/draft.
- Public Store Live has no customer camera/microphone controls and cannot expose a shopper feed. Retailer Live Studio is product-only, with personal video, microphones and recording off.
- No `getUserMedia`, media transport, recording SDK or external video provider is used. No measurements are collected; personal-video simulation does not imply real privacy/security certification.

## Flow assumptions

The control tower uses an illustrative remaining-day model, recomputed against the viewing date, not an actual carrier ETA. Missing deadline or destination yields unknown confidence. An event on/before the earliest estimate is high risk; arrival near the deadline retains a safety buffer warning. Delays add days. Expedite compares an illustrative $35 increment and up to two days saved, without booking or charging. No probability or on-time guarantee is claimed. Actual stock, pickup, consolidation, paperwork, customs and carrier capacity remain unverified. Order briefs remain immutable snapshots when the current shopping brief changes.

## Acceptance walkthrough

1. Ask for an outfit under $250; check recommendations and Compare, save a shortlist and open existing questions/scheduling.
2. Set a demo shopping brief with size, US destination and event date. Explore the four storefronts and open Hyderabad Heritage’s page.
3. Watch the Store Live mock, select a size and add a product to the shared bag. Preview an offer; observe the explicit unchanged catalog-price disclosure.
4. Open try-on, switch avatar/model/color/size, save and restore a look. Add an artisan accessory from another store for consolidation.
5. Start private shopping, see cameras/mic/recording off, ask for a close-up, send a local chat, create a hold and inspect the explicit video consent dialog. Confirm the simulation, revoke it, and end the session.
6. In Partner, see that request and hold, assign a demo associate, and use Live Studio to end/start the store’s mock broadcast. Return to the storefront to see the changed status.
7. Create a mock order from Explore. Verify the same ID and lines in Partner and Flow. Advance stages, inject a delay, compare expedite and inspect event risk and the local update feed. Reload to verify tab persistence.

## Partial and deferred work

- Try-on is a generic vector silhouette, not garment rendering or fit prediction. Color concepts are not stocked variants and are not added to bag lines. A true back-view video is not implemented.
- Public/private offers, Partner pricing, promotions, collections and bundles are transparent previews/drafts. They do not alter checkout totals or publish real pricing. Merchandise configuration remains page-local.
- Inventory includes fictional SKU/color/size/multi-location snapshots, but shared holds are product/size based rather than an atomic location inventory ledger. Actual allocation, hold conflict resolution and checkout consumption are future work.
- Associate assignment records a local assigned status; no real employee is contacted, and availability remains a page-local demonstration. Analytics cover tab activity and label historical seed figures separately.
- Logistics is a scenario simulator, not live tracking. No customs filing, export eligibility determination, carrier quote or notification delivery occurs.
- Store catalog is intentionally small. Onboarding, editable descriptions/images and large-catalog management remain future iterations. Authentication, role permissions, CRM, security hardening, multi-user state and durable backend are absent.
- Real AI, virtual try-on, video, recordings, inventory integrations, payments, international fulfillment and AWS/production deployment require a separately authorized phase. Preserve the private-demo boundary.

## Validation

Run from `app`: `npm run lint`, `node --test tests/*.test.mjs`, and `npm run build -- --webpack`; run `git diff --check` from repository root. Existing recommendation/marketplace tests cover budgets, product filtering, subtotal and delivery boundaries. Flow tests cover unknown inputs, event-risk boundaries, delay/expedite arithmetic and delivered state. Browser checks should cover the connected order journey and consent/revoke flows, including responsive layout where possible.

### Verified checkpoint results

- Production webpack build passed, generating homepage, Explore, Partner, four store pages, Try-On, Private Shopping and Flow.
- Lint passed with zero errors and the two pre-existing homepage image-optimization warnings.
- All 11 recommendation, marketplace and Flow tests passed; Git whitespace validation passed.
- Desktop browser checks passed: request-based recommendations and two-product Compare; shopping brief propagation; avatar/model/color/size selection, saved look and shared bag; private connection, close-up, hold, consent, revoke and end-session cleanup; retailer switch ends the session and revokes sharing; two-store mock checkout visible under the same order ID in Flow and Partner; Flow stage/delay/expedite state survives reload; Partner broadcast end is reflected on the public storefront.
- No browser console errors were observed in the checked flows. Homepage, Try-On, storefront broadcast and Flow received visual inspection at the default desktop viewport. Dedicated mobile, full accessibility and exhaustive browser automation suites remain pending.
