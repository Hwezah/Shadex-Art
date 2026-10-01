import { pexels } from "@/lib/images";

// Placeholder journal articles — replace with real content (or move to MDX/CMS).
export type Post = {
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  imageB: string;
  imageC: string;
  sections: { heading: string; body: string }[];
};

const raw: [string, string, string, string, number, number, number, [string, string][]][] = [
  ["gypsum-ceiling-design", "Ceilings", "Choosing a gypsum ceiling design", "Flat, tray or bulkhead — how room height and lighting guide the choice.", 1571463, 1571468, 271816, [
    ["Start with the room height", "Most Kampala homes have ceilings between 2.7 and 3 metres. That leaves room for a dropped bulkhead or tray without the space feeling low. In smaller rooms, a simple flat ceiling with a neat cornice often works best."],
    ["Plan the lighting at the same time", "A ceiling design is really a lighting design. Decide where you want spotlights, cove strips and pendants before the framing goes up, so cables and fittings sit exactly where they should."],
    ["Keep lines simple", "One clear shape per room usually looks better than several. A single tray over the bed or dining table gives focus without making the room busy."],
  ]],
  ["paint-colours-kampala-light", "Colour", "Paint colours for Kampala light", "Strong daylight changes every colour. Here is how to test before you commit.", 1080721, 1350789, 1080696, [
    ["Light changes everything", "Bright equatorial sun can wash out soft colours and make strong ones louder. A colour that looks warm in the shop may look cool on a shaded wall."],
    ["Test on the wall", "Paint a large sample — at least A3 — on two walls and look at it in the morning, midday and evening before deciding."],
    ["Choose the right finish", "Matt hides small wall marks; silk and satin are easier to wipe. For kitchens, corridors and children's rooms, a washable finish is worth it."],
  ]],
  ["hang-art-right-height", "Art", "How to hang art at the right height", "Simple rules for single pieces, pairs and gallery walls.", 1669799, 1579253, 1918291, [
    ["The centre line", "Hang art so its centre sits around 150 cm from the floor — roughly eye level. This single rule fixes most pictures that feel too high."],
    ["Above furniture", "Leave 15–25 cm between the top of a sofa or sideboard and the bottom of the frame so the two read as one group."],
    ["Gallery walls", "Lay the frames out on the floor first, keep the gaps even, and hang from the centre piece outward."],
  ]],
  ["small-living-rooms", "Design", "Making small living rooms feel bigger", "Layout, light and colour tricks that open up a compact space.", 1571460, 1643383, 276724, [
    ["Clear the walkways", "Keep a clear path through the room and choose furniture with visible legs so the floor reads as one surface."],
    ["Use light colours on big surfaces", "Soft whites and warm greys on walls and ceiling reflect light and push the edges of the room back."],
    ["Layer the lighting", "Combine ceiling light with a floor or table lamp so corners do not fall into shadow."],
  ]],
  ["office-partitions", "Offices", "Drywall partitions for growing offices", "Why gypsum partitions are a fast, flexible way to divide a workspace.", 1957477, 271816, 1571468, [
    ["Quick to install", "A drywall partition can be framed, boarded and finished in days, with far less mess than blockwork."],
    ["Sound and privacy", "Adding insulation inside the frame and sealing the edges gives meeting rooms useful sound privacy."],
    ["Easy to change", "When the team grows, partitions can be moved or extended without major building work."],
  ]],
  ["textured-feature-walls", "Finishes", "Textured feature walls done right", "When to use texture, and how to keep it looking clean.", 1080696, 1080721, 1350789, [
    ["Pick one wall", "Texture works best as a focus — behind a bed, a TV or a dining table — not across every wall."],
    ["Prepare the surface", "Texture hides small flaws but not cracks or damp. Repair and prime first."],
    ["Mind the light", "Side light shows texture most. Think about where windows and wall lights sit before choosing the finish."],
  ]],
];

const dates = ["Sep 2026", "Aug 2026", "Jul 2026", "Jun 2026", "May 2026", "Apr 2026"];

export const posts: Post[] = raw.map(([slug, tag, title, excerpt, a, b, c, sections], i) => ({
  slug,
  tag,
  title,
  excerpt,
  date: dates[i],
  image: pexels(a),
  imageB: pexels(b),
  imageC: pexels(c),
  sections: sections.map(([heading, body]) => ({ heading, body })),
}));

export const postHref = (slug: string) => `/journal/${slug}`;

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const postIntro = (p: Post) =>
  `${p.excerpt} At Shadex we see these questions on almost every project, so here is the practical advice we give our own clients.`;

export function relatedPosts(slug: string, count: number) {
  const i = Math.max(0, posts.findIndex((p) => p.slug === slug));
  return Array.from({ length: count }, (_, k) => posts[(i + k + 1) % posts.length]);
}
