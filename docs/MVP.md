# IndiaAnytime — Expanded MVP and platform vision

**India. Always Open.**

**Shop India like you’re there.**

## Goal and demo boundary
Help customers in the US discover Indian stores, carry their shopping intent across stores, consult a virtual agent and associates, and understand international delivery before ordering. Start with a Hyderabad apparel demo, designed for a broader marketplace.

Use realistic mock data only. Retailers, artisans, customer identities, ratings/reviews, inventory, associate availability, prices, orders, and logistics are fictional demo fixtures, not verified claims. No retailer is contacted, stock reserved, video connected, payment processed, or shipment dispatched. Delivery estimates and confidence are illustrative, never guarantees. Label these boundaries in every module. Keep existing browser-saved shortlists and session requests compatible.

## 1. IndiaAnytime Marketplace
- Two primary shopping modes: **Ask IndiaAnytime** and **Explore Stores**.
- Storefront tiles and a street-style browsing concept for major retailers, boutiques, small/local shops, and artisans; enter a store and discover its collection.
- Prototype city and shopping-district exploration (Hyderabad first; Bengaluru, Chennai, Mumbai, Delhi as future demo extensions). Simple accessible navigation takes priority over literal 3D streets.
- Customer context follows the shopper across stores: intent, budget, occasion, event date, size, location, preferences, shortlist, questions, and shopping trip.
- Preserve existing Ask AI, rule-based recommendations, product comparisons, shortlist, product questions, Shop Live and local scheduling flows. Add mock cart and order actions in a later prototype milestone.

## 2. IndiaAnytime Agent
- Virtual shopping interface with intent, budget/currency, occasion, event date, size and destination context; visibly identify unknown fields.
- Product discovery, comparisons and explanations, store questions, live-shopping requests and scheduling, cart/order actions.
- Delivery feasibility based on destination and event deadline; disclose uncertainty and propose alternatives.
- Cross-store shopping-trip recommendations and complementary cross-sell (for example outfit, jewelry and footwear), respecting the total budget and delivery constraints.
- Demo responses use local fixtures/rules. Real AI services are deferred.

## 3. IndiaAnytime Partner
- Retailer dashboard: sales, orders, live requests, stock alerts, store status and operational priorities.
- Catalog/products with descriptions, categories, collections, merchandising, imagery, pricing and international eligibility.
- SKU/variant inventory by color, size and location; on-hand, reservations/holds and available stock; low-stock alerts and hold expiry.
- Promotions: percentage/fixed discounts, festival campaigns, live-shopping offers, bundles, cross-sell and upsell; eligibility and validity dates.
- Live-shopping requests with customer context, associate assignment and scheduling; virtual-store status distinguishes AI access, physical opening and associate availability.
- Order management, customers/CRM mock views, associates and analytics. Future CRM access must respect consent and role permissions.
- Current implementation milestone: polished dashboard and navigable Products, Inventory, Promotions, Cross-sell, Live Requests and Orders mock views. Other capabilities remain planned, not production-ready.

## 4. IndiaAnytime Flow
- Order/shipment control tower linking retailer pickup, multi-store consolidation, export/customs, international transit and US last-mile stages.
- Illustrative ETA ranges, event-aware delivery risk/confidence, exception handling and expedite recommendations with cost tradeoffs.
- Mock customer notifications for meaningful status changes, delays and actions needed.
- Model an event deadline separately from an estimated arrival. Explain risk drivers such as pending pickup or customs uncertainty; never promise delivery on an event date.

## 5. Shared commerce and customer context
Use stable customer, shopping-trip, retailer, location, product/SKU, request, order and shipment IDs. Agent captures the shopping brief; Partner sees the relevant brief and stock/hold state; Flow receives order lines, pickup locations, destination and deadline. Updates should eventually propagate across modules rather than create contradictory copies. This milestone uses explicit Partner fixtures; live cross-module synchronization is a subsequent milestone.

## Prototype milestones and acceptance
1. **Customer foundation (existing):** keep Ask AI, recommendations, Compare, saved shortlist, product questions and browser-only session requests functioning.
2. **Partner checkpoint (current):** IndiaAnytime branding and metadata, responsive dashboard/navigation, all six entry points open meaningful fictional data views, inventory arithmetic is consistent, and demo actions clearly report their local-only scope. Pass compilation/build, lint and existing recommendation tests; commit and push the checkpoint.
3. **Marketplace + Agent:** Explore Stores and city/district concepts, structured shopping brief, cross-store context, trip recommendations, mock cart/orders.
4. **Flow + shared demo:** connected mock order journey, consolidation, event-aware risk, expedite choices and notifications; shared fixture/state contract across modules.

Primary end-to-end scenario: “I need a traditional Indian outfit for my daughter’s event next weekend. Budget around $250.” Capture destination, exact event date and size rather than assume them. Discover and compare options, consult/schedule an associate, recommend accessories within budget, create a mock order and explain illustrative delivery risk.

## Future features — preserved, outside this checkpoint
- Real inventory/catalog integrations and retailer onboarding; multi-retailer marketplace expansion.
- Real video shopping, virtual try-on and authorized store camera/360 experiences with retailer permission and privacy controls.
- Drone-assisted operations where authorized and operationally viable.
- Production payments, real fulfillment/carriers/customs integrations and customer notifications.
- Personalization, production AI retailer assistant and consent-aware CRM.
- AWS deployment and production infrastructure, security, access controls and observability.

No paid APIs, AWS complexity or production commerce integrations in this milestone.
