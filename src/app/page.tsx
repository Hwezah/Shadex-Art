import { ImageIcon } from "lucide-react";
import Link from "next/link";
import { EASE_SMOOTH } from "@/components/motion/easing";
import { Media } from "@/components/motion/media";
import { Reveal } from "@/components/motion/reveal";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Button } from "@/components/ui/button";
import { pexels } from "@/lib/images";
import { serviceHref } from "@/lib/data/services";
import { areas, team, values } from "@/lib/data/studio";
import { cn } from "@/lib/utils";

const section = "py-[clamp(80px,9vw,140px)]";
const HERO_WIPE = { duration: 2.2, ease: EASE_SMOOTH };

export default function StudioPage() {
  return (
    <>
      {/* Hero — pulled up under the transparent header. */}
      <section className="relative -mt-[84px] mb-[clamp(80px,9vw,140px)] flex h-screen min-h-[600px] items-center overflow-hidden bg-[#2b2622]">
        {/* First load: a finished apartment rises from below while the studio photo
            descends from above — two wipes crossing, same start and timing. */}
        <Media
          src={pexels(1457842)}
          className="absolute inset-0"
          sizes="100vw"
          preload
          parallax={false}
          wipe={{ direction: "up", ...HERO_WIPE }}
        />
        <Media
          src={pexels(10322846)}
          alt="Shadex art studio with a painting on an easel"
          className="absolute inset-0"
          sizes="100vw"
          preload
          wipe={{ direction: "down", ...HERO_WIPE }}
          overlay={
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(18,16,14,0.45)_0%,rgba(18,16,14,0)_22%),linear-gradient(90deg,rgba(18,16,14,0.78)_0%,rgba(18,16,14,0.5)_38%,rgba(18,16,14,0.08)_72%)]"
            />
          }
        />
        <div className="shell relative [text-shadow:0_1px_18px_rgba(18,16,14,0.45)] flex flex-col gap-[clamp(24px,3vw,36px)] pt-[84px] text-white max-sm:items-center max-sm:text-center">
          <span className="text-[11px] tracking-[0.28em] uppercase">Art &amp; Interior Design · Kireka</span>
          <Reveal
            as="h1"
            className="max-w-[760px] text-[clamp(38px,5vw,76px)] leading-[1.05] font-normal tracking-[-0.015em] text-balance"
          >
            Where paintings are made and rooms are finished
          </Reveal>
          <Reveal as="p" index={1} className="max-w-[480px] text-[clamp(15px,1.2vw,17px)] leading-[1.7] text-pretty">
            Our studio paints original artwork and designs complete interiors — gypsum ceilings, walls, colour and décor
            — so every piece and every room is made to belong together.
          </Reveal>
          <div className="mt-2 flex flex-wrap gap-3.5 max-sm:justify-center">
            <Button asChild variant="light" size="lg">
              <Link href="#contact">Book a site visit</Link>
            </Button>
            <Button asChild variant="outline-light" size="lg">
              <Link href={serviceHref("artworks-decor")}>See our artworks</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="shell pb-[clamp(100px,11vw,180px)]">
        <Reveal
          as="p"
          className="mx-auto max-w-[760px] text-[clamp(20px,2vw,28px)] leading-[1.45] font-normal text-pretty max-sm:text-center"
        >
          We start every job by listening — to how you move through your home, what you love and what the room has to
          do. Then we design and build around it, so the result works quietly, looks beautiful &amp; lasts for years.
        </Reveal>
      </section>

      {/* Values */}
      <section className="bg-alt">
        <div className={cn("shell grid grid-cols-1 items-start gap-[clamp(40px,8vw,160px)] md:grid-cols-2", section)}>
          <div className="md:sticky md:top-[100px]">
            <Media src={pexels(1571460)} alt="Living room" className="aspect-[9/10]" sizes="(min-width: 761px) 50vw, 100vw" />
          </div>
          <div className="flex max-w-[520px] flex-col max-sm:mx-auto">
            <span className="eyebrow mb-[22px] tracking-[0.24em] text-body max-sm:text-center">Our values</span>
            <Reveal
              as="h2"
              className="mb-[clamp(64px,8vw,120px)] text-[clamp(26px,2.6vw,38px)] leading-[1.28] font-normal text-balance max-sm:text-center"
            >
              Built on purpose, delivered with pride. Honesty in every finish.
            </Reveal>
            {values.map((v) => (
              <div key={v.title} className="flex flex-col">
                <svg width="64" height="40" viewBox="0 0 64 40" fill="none" stroke="currentColor" strokeWidth="1.2" className="mb-7" aria-hidden>
                  <path d={v.icon} />
                </svg>
                <div className="mb-7 h-px bg-line-grey" />
                <Reveal as="h3" className="mb-3.5 text-lg font-normal">
                  {v.title}
                </Reveal>
                <Reveal as="p" className="mb-[clamp(64px,7vw,110px)] max-w-[380px] text-sm leading-[1.7] text-body">
                  {v.body}
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two captioned images */}
      <section
        className={cn(
          "shell grid grid-cols-1 items-start gap-[clamp(20px,8vw,140px)] sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]",
          section,
        )}
      >
        <div className="flex flex-col gap-[22px] pt-[clamp(12px,2vw,32px)] max-sm:items-center">
          <Media src={pexels(1571463)} alt="Gypsum ceiling" className="aspect-[7/10] w-full" sizes="(min-width: 601px) 33vw, 100vw" />
          <span className="eyebrow tracking-[0.24em]">Ceilings, walls &amp; finishes</span>
        </div>
        <div className="flex flex-col gap-[22px] max-sm:items-center">
          <Media
            src={pexels(1669799)}
            alt="Artwork in a living room"
            className="aspect-[3/2] w-full"
            sizes="(min-width: 601px) 66vw, 100vw"
            index={1}
          />
          <span className="eyebrow tracking-[0.24em]">Art &amp; décor, chosen for each room</span>
        </div>
      </section>

      {/* Approach */}
      <section className="shell grid grid-cols-1 items-start gap-[clamp(32px,6vw,120px)] py-[clamp(60px,8vw,140px)] md:grid-cols-2">
        <div className="flex flex-col gap-8 max-sm:items-center max-sm:text-center">
          <Reveal as="h2" className="text-[clamp(28px,2.8vw,42px)] leading-[1.2] font-normal">
            How we work. From idea to finished room.
          </Reveal>
          <ArrowLink href="#contact" underline>
            Contact us
          </ArrowLink>
        </div>
        <Reveal as="p" index={1} className="text-[15px] leading-[1.75] text-pretty text-body max-sm:text-center">
          We take care of the whole job — first sketch to final coat. Our team plans the layout and ceilings, sources
          the materials, fits the gypsum, paints and finishes, then styles each room with furniture and art. You get one
          point of contact, a schedule you can rely on and a quotation you can read line by line, whether it is one room
          or a whole building.
        </Reveal>
      </section>

      {/* Full-bleed band with drafting lines */}
      <section className="relative h-[clamp(360px,52vw,760px)] overflow-hidden">
        <Media src={pexels(1643383)} alt="Finished living room" className="absolute inset-0" sizes="100vw" />
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <span className="absolute inset-y-0 left-[10%] w-px bg-white/28" />
          <span className="absolute inset-y-0 right-[10%] w-px bg-white/28" />
          <span className="absolute inset-x-0 top-[12%] h-px bg-white/28" />
          <span className="absolute inset-x-0 bottom-[12%] h-px bg-white/28" />
        </div>
      </section>

      {/* Team */}
      <section className={cn("shell grid grid-cols-1 items-start gap-[clamp(40px,8vw,160px)] md:grid-cols-2", section)}>
        <div className="grid grid-cols-2 gap-x-[clamp(14px,1.8vw,26px)] gap-y-[clamp(16px,2vw,28px)]">
          {team.map((t, i) => (
            <div key={i} className="flex flex-col gap-3.5">
              {t.photo ? (
                <Media src={t.photo} alt={`${t.name}, ${t.role}`} className="aspect-[5/6] grayscale" sizes="25vw" index={i} />
              ) : (
                <div className="flex aspect-[5/6] items-center justify-center bg-alt text-line-step" aria-hidden>
                  <ImageIcon size={28} strokeWidth={1.2} />
                </div>
              )}
              <span className="text-[13.5px] text-body max-sm:text-center">
                {t.name} / {t.role}
              </span>
            </div>
          ))}
        </div>
        <div className="flex max-w-[520px] flex-col gap-[22px] md:sticky md:top-[100px] max-sm:mx-auto max-sm:items-center max-sm:text-center">
          <span className="eyebrow tracking-[0.24em] text-body">The team</span>
          <Reveal as="h2" className="mb-[18px] text-[clamp(26px,2.6vw,38px)] leading-[1.28] font-normal">
            The hands behind every Shadex room
          </Reveal>
          <Reveal as="p" className="text-[15px] leading-[1.75] text-pretty text-body">
            Designers, gypsum fitters, painters and artists working as one crew. Each brings a different skill; together
            we plan carefully, work tidily and finish properly — and we treat every home or office as if it were our own.
          </Reveal>
        </div>
      </section>

      {/* Where we work */}
      <section className="bg-alt">
        <div className={cn("shell", section)}>
          <span className="eyebrow mb-[22px] block tracking-[0.24em] text-body max-sm:text-center">Where we work</span>
          <Reveal
            as="h2"
            className="mb-[clamp(56px,7vw,100px)] max-w-[420px] text-[clamp(26px,2.6vw,38px)] leading-[1.28] font-normal max-sm:mx-auto max-sm:text-center"
          >
            Rooted in Kireka, working across Kampala
          </Reveal>
          <div className="grid grid-cols-1 gap-[clamp(40px,8vw,160px)] md:grid-cols-2">
            <div className="flex flex-col justify-between gap-12 max-sm:items-center max-sm:text-center">
              <Reveal as="p" className="max-w-[440px] text-[14.5px] leading-[1.75] text-body">
                Homes, apartments, offices, shops and restaurants. If you are unsure whether we cover your area, call us
                — we are happy to arrange a free site visit.
              </Reveal>
              <ArrowLink href="#contact" underline>
                Contact us
              </ArrowLink>
            </div>
            <dl className="flex flex-col">
              {areas.map((a) => (
                <div
                  key={a.k}
                  className="grid grid-cols-[minmax(90px,1fr)_2.4fr] items-baseline gap-5 border-b border-line-grey py-[22px]"
                >
                  <dt className="text-[11px] tracking-[0.2em] uppercase">{a.k}</dt>
                  <dd className="text-base font-normal">{a.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
