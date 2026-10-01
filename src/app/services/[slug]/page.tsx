import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Media } from "@/components/motion/media";
import { Reveal } from "@/components/motion/reveal";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Button } from "@/components/ui/button";
import { getService, serviceHref, services } from "@/lib/data/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const s = getService((await params).slug);
  return s ? { title: s.title, description: s.lead } : {};
}

const section = "py-[clamp(64px,8vw,120px)]";

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const p = getService((await params).slug);
  if (!p) notFound();
  const others = services.filter((s) => s.slug !== p.slug);

  return (
    <>
      {/* Hero */}
      <section className="shell grid grid-cols-1 items-center gap-[clamp(32px,4vw,56px)] pt-[clamp(24px,3vw,40px)] pb-[clamp(64px,8vw,120px)] md:grid-cols-2">
        <div className="flex flex-col gap-6 max-sm:items-center max-sm:text-center">
          <span className="eyebrow text-muted">Services</span>
          <Reveal as="h1" className="text-[clamp(34px,3.6vw,52px)] leading-[1.1] tracking-[-0.01em]">
            {p.title}
          </Reveal>
          <Reveal as="p" index={1} className="max-w-[440px] text-sm leading-[1.75] text-pretty text-body">
            {p.lead}
          </Reveal>
        </div>
        <Media src={p.hero} alt={p.title} className="aspect-square" sizes="(min-width: 761px) 50vw, 100vw" preload />
      </section>

      {/* Intro */}
      <section className="shell pb-[clamp(64px,8vw,120px)]">
        <Reveal
          as="p"
          className="mx-auto max-w-[620px] text-[clamp(17px,1.5vw,21px)] leading-[1.6] text-pretty max-sm:text-center"
        >
          {p.intro}
        </Reveal>
      </section>

      {/* How we work */}
      <section className="bg-alt">
        <div className={`shell grid grid-cols-1 items-start gap-[clamp(32px,5vw,80px)] md:grid-cols-2 ${section}`}>
          <div className="md:sticky md:top-[100px]">
            <Media src={p.concept} alt={p.title} className="aspect-[4/5]" sizes="(min-width: 761px) 50vw, 100vw" />
          </div>
          <div className="flex flex-col gap-[clamp(36px,4vw,56px)] max-sm:items-center">
            <div className="flex flex-col gap-[18px] max-sm:items-center max-sm:text-center">
              <span className="eyebrow text-muted">How we work</span>
              <Reveal as="h2" className="max-w-[460px] text-[clamp(26px,2.6vw,36px)] leading-[1.3]">
                {p.conceptTitle}
              </Reveal>
            </div>
            <ol className="flex w-full flex-col">
              {p.steps.map((s, i) => (
                <li key={s.title} className="flex flex-col gap-2.5 border-t border-line-step py-6">
                  <span className="flex gap-4 text-[15px] font-normal">
                    {/* Fixed-width numeral column keeps titles aligned (01 is narrower than 02/03). */}
                    <span className="w-[18px] shrink-0 font-light text-accent tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.title}
                  </span>
                  <span className="max-w-[460px] pl-[34px] text-[13.5px] leading-[1.65] text-body">{s.body}</span>
                </li>
              ))}
            </ol>
            <Button asChild variant="outline" size="md" solo className="self-start">
              <Link href="#contact">Get a quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Images + commitment */}
      <section className={`shell ${section}`}>
        <div className="mb-[clamp(56px,7vw,100px)] grid grid-cols-1 items-end gap-[clamp(12px,1.5vw,20px)] sm:grid-cols-[1fr_2fr]">
          <Media src={p.imgA} className="aspect-[3/4]" sizes="(min-width: 601px) 33vw, 100vw" />
          <Media src={p.imgB} className="aspect-[16/10]" sizes="(min-width: 601px) 66vw, 100vw" index={1} />
        </div>
        <div className="flex flex-col gap-[clamp(32px,4vw,48px)]">
          <Reveal as="h2" className="text-[clamp(26px,2.6vw,36px)] leading-[1.3] max-sm:text-center">
            Our commitment
            <br />
            to quality
          </Reveal>
          <div className="grid grid-cols-1 gap-[clamp(24px,3vw,48px)] md:grid-cols-3">
            {p.commitments.map((c, i) => (
              <div key={c.title} className="flex flex-col gap-3.5 border-t border-line-step pt-[22px]">
                <span className="text-[15px] font-normal">{c.title}</span>
                <Reveal as="p" index={i} className="text-[13.5px] leading-[1.65] text-body">
                  {c.body}
                </Reveal>
                <ul className="flex flex-col gap-1.5 text-[13px] text-body-strong">
                  {c.list.map((li) => (
                    <li key={li} className="flex gap-2.5">
                      <span className="text-accent" aria-hidden>
                        —
                      </span>
                      {li}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Media src={p.wide} className="h-[clamp(320px,42vw,620px)]" sizes="100vw" />

      {/* Why */}
      <section className="shell grid grid-cols-1 gap-[clamp(24px,4vw,56px)] pt-[clamp(64px,8vw,120px)] md:grid-cols-2">
        <div className="flex flex-col gap-[22px] max-sm:items-center max-sm:text-center">
          <Reveal as="h2" className="text-[clamp(26px,2.6vw,36px)] leading-[1.3]">
            Why clients choose Shadex
          </Reveal>
          <ArrowLink href="#contact" className="text-[13px]">
            Contact us
          </ArrowLink>
        </div>
        <Reveal as="p" index={1} className="text-sm leading-[1.8] text-pretty text-body max-sm:text-center">
          {p.why}
        </Reveal>
      </section>

      {/* Explore more */}
      <section className={`shell ${section}`}>
        <Reveal
          as="h2"
          className="mb-[clamp(28px,3vw,40px)] border-t border-line pt-[clamp(40px,5vw,64px)] text-[clamp(24px,2.2vw,32px)] leading-[1.3] max-sm:text-center"
        >
          Explore more from
          <br />
          Shadex Studio
        </Reveal>
        <div className="grid grid-cols-1 items-start gap-[clamp(12px,1.5vw,20px)] md:grid-cols-3">
          {others.map((o, i) => (
            <Link key={o.slug} href={serviceHref(o.slug)} className="group flex flex-col gap-3 max-sm:items-center">
              <Media src={o.hero} alt={o.title} className="aspect-[4/5] w-full" sizes="(min-width: 761px) 33vw, 100vw" index={i} />
              <span className="inline-flex items-center gap-1.5 text-[13px] font-normal">
                {o.title} <ArrowRight size={15} strokeWidth={1.5} aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
