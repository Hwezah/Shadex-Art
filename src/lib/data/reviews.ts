import { pexels } from "@/lib/images";

// Placeholder reviews — replace with real client testimonials.
export type Review = { text: string; who: string; image?: string };

export const reviews: Review[] = [
  { text: "From our first site visit to the final clean-up, Shadex was professional and easy to work with. The new ceiling and lighting completely changed how our sitting room feels in the evening.", who: "Homeowner, Naalya" },
  { text: "They repainted our whole office over one weekend so we lost no working days. The edges are sharp, the colours are exactly what we agreed and the site was left spotless.", who: "Office manager, Bweyogerere", image: pexels(1957477) },
  { text: "We asked for help choosing art for a long hallway. They commissioned three paintings, framed them and hung them as one wall. Visitors always comment on it.", who: "Homeowner, Namugongo" },
  { text: "Our master bedroom now feels like a hotel suite. The tray ceiling with soft cove lighting was their idea and it is the best decision we made.", who: "Homeowner, Kira", image: pexels(271816) },
  { text: "Clear quotation, no hidden costs, and they finished on the date they promised. I have already recommended them to two friends.", who: "Homeowner, Kireka" },
  { text: "Shadex partitioned our shop and added a bulkhead ceiling with spotlights over the displays. Customers now head straight for the products we want them to see.", who: "Boutique owner, Kyaliwajjala", image: pexels(1571468) },
];
