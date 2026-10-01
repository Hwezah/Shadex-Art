export const site = {
  name: "Shadex Art & Interior Design",
  shortName: "Shadex",
  description:
    "An interior design and finishing studio in Kireka. Complete interiors — gypsum ceilings and partitions, painting and finishes, artworks and décor — for homes, offices and shops across Kampala.",
  phone: {
    display: "0702 836 405",
    tel: "tel:+256702836405",
    whatsapp: "https://wa.me/256702836405",
  },
  location: "Kireka, Kampala — Uganda",
  // TODO: replace with the client's real profiles.
  social: {
    instagram: "#",
    facebook: "#",
  },
} as const;

export type NavLink = {
  key: "studio" | "services" | "portfolio" | "reviews" | "journal";
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { key: "studio", label: "Studio", href: "/" },
  { key: "services", label: "Services", href: "/services/interior-design" },
  { key: "portfolio", label: "Portfolio", href: "/portfolio" },
  { key: "reviews", label: "Reviews", href: "/reviews" },
  { key: "journal", label: "Journal", href: "/journal" },
];

export function activeNavKey(pathname: string): NavLink["key"] | null {
  if (pathname === "/") return "studio";
  const seg = pathname.split("/")[1];
  return navLinks.find((l) => l.key === seg)?.key ?? null;
}
