import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Media } from "@/components/motion/media";
import { Reveal } from "@/components/motion/reveal";
import { ArrowLink } from "@/components/ui/arrow-link";
import { getProject, projectHref, projects, relatedProjects } from "@/lib/data/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? { title: p.title, description: p.summary } : {};
}

const RELATED_RATIOS = ["aspect-[3/4]", "aspect-square", "aspect-[3/4]", "aspect-[4/3]"];

export default async function ProjectPage({ params }: PageProps<"/portfolio/[slug]">) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const [g0, g1, g2, g3, g4] = p.gallery;
  const meta = [
    { k: "Client", v: p.type },
    { k: "Location", v: p.location },
    { k: "Year", v: p.year },
    { k: "Service", v: p.service },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[clamp(420px,62vw,860px)]">
        <Media src={p.image} alt={p.title} className="absolute inset-0" sizes="100vw" preload />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(20,18,16,0.5)_0%,rgba(20,18,16,0)_40%)]"
        />
        <div className="shell relative flex flex-col gap-3 py-[clamp(28px,4vw,56px)] text-white max-sm:items-center max-sm:text-center">
          <Link href="/portfolio" className="inline-flex items-center gap-1.5 self-start text-xs tracking-[0.18em] uppercase max-sm:self-center">
            <ArrowLeft size={15} strokeWidth={1.5} aria-hidden /> Portfolio
          </Link>
          <Reveal as="h1" className="text-[clamp(34px,4vw,60px)] leading-[1.1]">
            {p.title}
          </Reveal>
        </div>
      </section>

      {/* Meta */}
      <section className="border-b border-line">
        <dl className="shell grid grid-cols-2 gap-5 py-[clamp(28px,3vw,40px)] lg:grid-cols-4">
          {meta.map((m) => (
            <div key={m.k} className="flex flex-col gap-1.5 text-sm">
              <dt className="text-[11px] tracking-[0.2em] text-muted uppercase">{m.k}</dt>
              <dd className="font-normal">{m.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Story */}
      <section className="shell py-[clamp(56px,7vw,100px)]">
        <div className="mb-[clamp(56px,7vw,100px)] grid grid-cols-1 items-end gap-[clamp(12px,1.5vw,20px)] sm:grid-cols-[1fr_2fr]">
          <Media src={g0} className="aspect-[3/4]" sizes="(min-width: 601px) 33vw, 100vw" />
          <Media src={g1} className="aspect-[16/10]" sizes="(min-width: 601px) 66vw, 100vw" index={1} />
        </div>
        <div className="grid grid-cols-1 gap-[clamp(28px,5vw,80px)] md:grid-cols-2">
          <Reveal
            as="h2"
            className="max-w-[460px] text-[clamp(24px,2.4vw,34px)] leading-[1.3] text-balance max-sm:mx-auto max-sm:text-center"
          >
            {p.summary}
          </Reveal>
          <div className="flex flex-col gap-[18px] text-sm leading-[1.8] text-body max-sm:items-center max-sm:text-center">
            <span className="text-[11px] tracking-[0.2em] text-muted uppercase">The brief</span>
            <Reveal as="p" className="text-pretty">
              The client wanted a space that felt calm, practical and easy to keep. We began with a site visit to
              understand how each room was used, then planned the ceilings, lighting and colour together so every part
              of the design worked as one.
            </Reveal>
            <span className="mt-2.5 text-[11px] tracking-[0.2em] text-muted uppercase">Our work</span>
            <Reveal as="p" className="text-pretty">
              Shadex handled the full scope — gypsum work, painting and finishes, and final styling with art and décor —
              delivered by one team on an agreed schedule.
            </Reveal>
          </div>
        </div>
      </section>

      <section className="shell flex flex-col gap-[clamp(40px,5vw,80px)] pb-[clamp(56px,7vw,100px)]">
        <div className="grid grid-cols-1 items-start gap-[clamp(12px,1.5vw,20px)] sm:grid-cols-[2fr_1fr]">
          <Media src={g2} className="aspect-[3/2]" sizes="(min-width: 601px) 66vw, 100vw" />
          <Media src={g3} className="aspect-[4/5]" sizes="(min-width: 601px) 33vw, 100vw" index={1} />
        </div>
        <div className="grid grid-cols-1 items-center gap-[clamp(28px,5vw,80px)] md:grid-cols-2">
          <Reveal as="p" className="max-w-[360px] text-sm leading-[1.8] text-pretty text-body-strong max-sm:mx-auto max-sm:text-center">
            Natural textures, clean ceiling lines and a soft, even palette bring the rooms together. Light moves easily
            through the space, and each finish was chosen to be durable as well as beautiful.
          </Reveal>
          <Media src={g4} className="aspect-[4/3]" sizes="(min-width: 761px) 50vw, 100vw" />
        </div>
      </section>

      {/* Related */}
      <section className="border-t border-line">
        <div className="shell pt-[clamp(48px,6vw,80px)] pb-[clamp(64px,8vw,120px)]">
          <div className="mb-8 flex items-end justify-between gap-5 max-sm:flex-col max-sm:items-center">
            <Reveal as="h2" className="text-[clamp(24px,2.2vw,32px)]">
              Related work
            </Reveal>
            <ArrowLink href="/portfolio" className="text-[13px]">
              All projects
            </ArrowLink>
          </div>
          <div className="grid grid-cols-2 items-start gap-[clamp(12px,1.5vw,20px)] lg:grid-cols-4">
            {relatedProjects(p.slug, 4).map((r, i) => (
              <Link key={r.slug} href={projectHref(r.slug)} className="flex flex-col gap-3 max-sm:items-center">
                <Media src={r.image} alt={r.title} className={`w-full ${RELATED_RATIOS[i]}`} sizes="(min-width: 1001px) 25vw, 50vw" index={i} />
                <span className="text-[13px] font-normal">{r.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
