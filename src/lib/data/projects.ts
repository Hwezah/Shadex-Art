import { pexels } from "@/lib/images";

// Placeholder projects — replace with the client's real work.
const POOL = [
  1571460, 1643383, 1918291, 1457842, 1571463, 1080721, 1669799, 276724, 1571468, 1350789, 1957477,
  1579253, 271816, 1080696, 1571453,
];

export type Project = {
  slug: string;
  title: string;
  type: string;
  location: string;
  year: string;
  service: string;
  summary: string;
  image: string;
  gallery: string[];
};

const raw: [string, string, string, string, string, string, string, number][] = [
  ["naalya-residence", "Naalya Residence", "Private home", "Naalya", "2025", "Gypsum & Ceilings", "A four-bedroom family home given new ceilings, warm lighting and a calm, neutral palette.", 8],
  ["kireka-living-room", "Kireka Living Room", "Private home", "Kireka", "2025", "Painting & Finishes", "A tired living room refreshed with textured feature walls and soft, even colour.", 9],
  ["bweyogerere-office", "Bweyogerere Office", "Corporate office", "Bweyogerere", "2024", "Interior Design", "An open-plan office with drywall partitions, meeting rooms and a bright reception.", 10],
  ["gallery-wall", "Gallery Wall", "Private home", "Namugongo", "2024", "Artworks & Décor", "A hallway gallery of commissioned paintings, framed and hung as one composition.", 11],
  ["master-suite", "Master Suite", "Private home", "Kira", "2024", "Interior Design", "A bedroom and dressing area planned for rest, with a tray ceiling and cove lighting.", 12],
  ["open-plan-kitchen", "Open-plan Kitchen", "Apartment", "Ntinda", "2023", "Painting & Finishes", "Kitchen and dining walls repainted in warm whites with a durable washable finish.", 13],
  ["seeta-apartment", "Seeta Apartment", "Apartment", "Seeta", "2023", "Interior Design", "A compact apartment made to feel larger through layout, light and a simple palette.", 0],
  ["kyaliwajjala-shop", "Kyaliwajjala Boutique", "Retail", "Kyaliwajjala", "2023", "Gypsum & Ceilings", "A boutique with a bulkhead ceiling and spotlights that pull shoppers to the displays.", 1],
];

export const projects: Project[] = raw.map(([slug, title, type, location, year, service, summary, s]) => ({
  slug,
  title,
  type,
  location,
  year,
  service,
  summary,
  image: pexels(POOL[s % POOL.length]),
  gallery: [0, 1, 2, 3, 4].map((i) => pexels(POOL[(s + 1 + i * 3) % POOL.length])),
}));

export const projectHref = (slug: string) => `/portfolio/${slug}`;

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** The next `count` projects after `slug`, wrapping around. */
export function relatedProjects(slug: string, count: number) {
  const i = Math.max(0, projects.findIndex((p) => p.slug === slug));
  return Array.from({ length: count }, (_, k) => projects[(i + k + 1) % projects.length]);
}
