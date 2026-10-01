import { pexels } from "@/lib/images";

export type Service = {
  slug: string;
  title: string;
  hero: string;
  concept: string;
  imgA: string;
  imgB: string;
  wide: string;
  lead: string;
  intro: string;
  conceptTitle: string;
  steps: { title: string; body: string }[];
  commitments: { title: string; body: string; list: string[] }[];
  why: string;
};

export const services: Service[] = [
  {
    slug: "interior-design",
    title: "Interior Design",
    hero: pexels(276724),
    concept: pexels(1571460),
    imgA: pexels(1918291),
    imgB: pexels(1643383),
    wide: pexels(1457842),
    lead: "Complete interiors for homes, offices and shops — layout, ceilings, colour, furniture and art planned as one.",
    intro:
      "Good interior design starts with how you live and work. We plan each room around light, movement and storage, then bring the finishes together so the space feels calm and complete.",
    conceptTitle: "From first sketch to finished room",
    steps: [
      { title: "Brief & site visit", body: "We measure the space, talk through your needs and agree a budget." },
      { title: "Layout & mood", body: "Floor plans, ceiling design, colours and materials for you to review." },
      { title: "Build & style", body: "Our team installs, paints and furnishes, then styles each room with art." },
    ],
    commitments: [
      { title: "Planned for you", body: "Every design starts from your brief, not a template.", list: ["Space planning", "Colour schemes", "Furniture layouts"] },
      { title: "One team", body: "Design and installation handled by the same crew.", list: ["Gypsum & ceilings", "Painting", "Art & décor"] },
      { title: "Clear costs", body: "Itemised quotations with no surprises later.", list: ["Free site visit", "Line-by-line quotes", "Agreed timelines"] },
    ],
    why: "We bring design, gypsum work, painting and art under one roof, so nothing is lost between trades. You deal with one team, see a clear plan before work starts, and get a finished space that is ready to use on handover day.",
  },
  {
    slug: "gypsum-ceilings",
    title: "Gypsum & Ceilings",
    hero: pexels(1571463),
    concept: pexels(1571468),
    imgA: pexels(271816),
    imgB: pexels(1350789),
    wide: pexels(1957477),
    lead: "Suspended ceilings, bulkheads, cornices and drywall partitions — designed with your lighting and installed level and clean.",
    intro:
      "A good ceiling changes the whole room. We design gypsum ceilings together with the lighting, so recessed lights, cove lighting and fittings sit exactly where they should.",
    conceptTitle: "Clean lines, built to last",
    steps: [
      { title: "Measure & design", body: "We check room heights and plan the ceiling shape and light positions." },
      { title: "Framing & boarding", body: "Metal framing and quality gypsum boards, fixed straight and level." },
      { title: "Finishing", body: "Joints taped, skimmed and sanded smooth, ready for paint." },
    ],
    commitments: [
      { title: "Ceilings", body: "Flat, tray and bulkhead designs for any room.", list: ["Suspended ceilings", "Tray & bulkhead", "Cornices"] },
      { title: "Partitions", body: "Drywall walls to divide offices and homes quickly.", list: ["Office partitions", "Room dividers", "TV & feature walls"] },
      { title: "Lighting-ready", body: "Ceilings planned around the lights you want.", list: ["Recessed spots", "Cove / strip lighting", "Pendant points"] },
    ],
    why: "Gypsum is where Shadex started. Our fitters take care over levels, joints and corners, and we work tidily so your home or office can stay in use while we finish.",
  },
  {
    slug: "artworks-decor",
    title: "Artworks & Décor",
    hero: pexels(1669799),
    concept: pexels(1579253),
    imgA: pexels(1080696),
    imgB: pexels(1918291),
    wide: pexels(1643383),
    lead: "Commissioned paintings, framed pieces and décor chosen to suit your room — and hung at the right height.",
    intro:
      "Art is what makes a space feel personal. We help you choose or commission pieces that fit the colours, size and mood of each room, then frame and install them properly.",
    conceptTitle: "From idea to finished piece",
    steps: [
      { title: "Understand the room", body: "We look at wall space, colours and light to guide size and style." },
      { title: "Choose or commission", body: "Select from ready pieces or have an original painted for you." },
      { title: "Frame & hang", body: "Framed, positioned and hung securely at the right height." },
    ],
    commitments: [
      { title: "Original art", body: "Paintings made for your space.", list: ["Commissioned paintings", "Murals", "Canvas prints"] },
      { title: "Framing", body: "Frames that suit the piece and the room.", list: ["Custom frames", "Mounting", "Glass & finishes"] },
      { title: "Styling", body: "Décor that pulls the room together.", list: ["Gallery walls", "Mirrors", "Accessories"] },
    ],
    why: "We treat art as part of the design, not an afterthought. Because we also plan the walls and lighting, every piece is placed where it looks its best.",
  },
  {
    slug: "painting-finishes",
    title: "Painting & Finishes",
    hero: pexels(1080721),
    concept: pexels(1350789),
    imgA: pexels(1571460),
    imgB: pexels(1457842),
    wide: pexels(1571468),
    lead: "Interior and exterior painting, feature walls and textured finishes — with proper preparation first.",
    intro:
      "A great paint job is mostly preparation. We fill, sand and prime before the first coat, then finish with clean edges and even colour that lasts.",
    conceptTitle: "Careful prep, even finish",
    steps: [
      { title: "Colour advice", body: "We test colours on your walls in your light before you decide." },
      { title: "Preparation", body: "Cracks filled, surfaces sanded and primed, floors and furniture covered." },
      { title: "Painting & clean-up", body: "Two or more coats, sharp edges, and a clean site at the end." },
    ],
    commitments: [
      { title: "Interior", body: "Walls, ceilings and woodwork.", list: ["Emulsion & silk", "Ceilings", "Doors & trim"] },
      { title: "Feature finishes", body: "Walls with texture and character.", list: ["Textured walls", "Accent walls", "Decorative effects"] },
      { title: "Exterior", body: "Weather-resistant paint for outside walls.", list: ["Weatherguard paint", "Gates & grills", "Repainting"] },
    ],
    why: "We use good paint, don't skip preparation and protect your space while we work. The result is a clean, even finish that keeps looking good.",
  },
];

export const serviceHref = (slug: string) => `/services/${slug}`;

export const getService = (slug: string) => services.find((s) => s.slug === slug);
