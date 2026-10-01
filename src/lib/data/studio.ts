import { site } from "./site";

export const values = [
  { icon: "M2 22 L26 22 M26 22 A14 14 0 1 1 40 34 L58 38", title: "Made to last", body: "Good materials, fitted properly — ceilings stay level and paint stays fresh for years." },
  { icon: "M2 36 L62 36 M12 36 A20 20 0 0 1 52 36 M32 36 L32 6", title: "Practical beauty", body: "Rooms planned around daily life: light, storage and easy movement come first." },
  { icon: "M4 38 L26 22 A14 14 0 1 1 40 20 L60 20", title: "You lead, we guide", body: "We listen first, share clear options and keep you informed at every stage." },
  { icon: "M2 36 L62 36 M14 36 A18 18 0 0 1 50 36 M32 36 L32 4 M32 36 L60 24", title: "Careful craft", body: "Straight lines, clean edges and tidy sites. The small details are the job." },
];

// TODO: real names and photos from the client (photo: path under /public/team).
export const team: { name: string; role: string; photo?: string }[] = [
  { name: "Name", role: "Founder & lead designer" },
  { name: "Name", role: "Gypsum supervisor" },
  { name: "Name", role: "Painting lead" },
  { name: "Name", role: "Artist & stylist" },
];

export const areas = [
  { k: "Studio", v: "Kireka, Kampala" },
  { k: "Nearby", v: "Namugongo, Bweyogerere, Kira, Naalya" },
  { k: "City", v: "Kampala and surrounding areas" },
  { k: "Clients", v: "Homes, offices, shops, restaurants" },
  { k: "Call", v: site.phone.display },
];
