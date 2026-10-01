export const site = {
  name: "Shadex Art & Interior Design",
  shortName: "Shadex",
  description:
    "An Art and Interior Design Studio in Kireka. Complete interiors — gypsum ceilings and partitions, painting and finishes, artworks and décor — for homes, offices and shops across Kampala.",
  phone: {
    display: "0702 836 405",
    tel: "tel:+256702836405",
    whatsapp: `https://wa.me/256702836405?text=${encodeURIComponent(
      "Hello Shadex Studio! I'd like to ask about a project.",
    )}`,
  },
  location: "Kireka, Kampala — Uganda",
  map: {
    // Keyless Google Maps embed + directions for the studio area.
    // TODO: swap the query for the studio's exact address or plus code.
    embed: "https://www.google.com/maps?q=Kireka%2C%20Kampala%2C%20Uganda&z=14&output=embed",
    directions: "https://www.google.com/maps/dir/?api=1&destination=Kireka%2C%20Kampala%2C%20Uganda",
  },
  // TODO: replace with the client's real profiles.
  social: {
    instagram: "#",
    facebook: "#",
  },
} as const;

export type NavLink = {
  key: "studio" | "services" | "portfolio" | "reviews" | "journal" | "contact";
  label: string;
  href: string;
};

export const contactHref = "/contact";

export const navLinks: NavLink[] = [
  { key: "studio", label: "Studio", href: "/" },
  { key: "services", label: "Services", href: "/services/interior-design" },
  { key: "portfolio", label: "Portfolio", href: "/portfolio" },
  { key: "reviews", label: "Reviews", href: "/reviews" },
  { key: "contact", label: "Contact", href: contactHref },
];

/** Secondary links: shown in the side panel and footer, not the header. */
export const journalLink: NavLink = { key: "journal", label: "Journal", href: "/journal" };

/** Footer carries everything. */
export const footerLinks: NavLink[] = [...navLinks.slice(0, -1), journalLink, navLinks[navLinks.length - 1]];

export function activeNavKey(pathname: string): NavLink["key"] | null {
  if (pathname === "/") return "studio";
  const seg = pathname.split("/")[1];
  return [...navLinks, journalLink].find((l) => l.key === seg)?.key ?? null;
}
