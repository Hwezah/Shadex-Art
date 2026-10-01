import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { projectHref, projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Homes, offices and shops across Kampala designed and finished by Shadex.",
};

/** Alternating ratios give the grid its masonry feel. */
const RATIOS = ["aspect-[3/4]", "aspect-[4/3]", "aspect-[3/4]", "aspect-square", "aspect-[4/3]", "aspect-[3/4]", "aspect-square", "aspect-[3/4]"];

export default function PortfolioPage() {
  return (
    <>
      <section className="shell flex flex-col gap-[22px] pt-[clamp(40px,5vw,72px)] pb-[clamp(40px,5vw,64px)] max-sm:items-center max-sm:text-center">
        <Reveal as="h1" className="text-[clamp(34px,3.6vw,52px)] leading-[1.1] tracking-[-0.01em]">
          Our portfolio
        </Reveal>
        <Reveal as="p" index={1} className="max-w-[460px] text-sm leading-[1.75] text-pretty text-body">
          Homes, offices and shops across Kampala. Each project is shaped around the people who use it — from the
          ceiling and walls to the art that finishes the room.
        </Reveal>
      </section>

      <section className="shell pb-[clamp(80px,9vw,140px)]">
        <div className="grid grid-cols-1 items-start gap-x-[clamp(12px,1.5vw,20px)] gap-y-[clamp(40px,4vw,64px)] sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p, i) => (
            <Link key={p.slug} href={projectHref(p.slug)} className="group flex flex-col gap-3">
              <div className={`relative overflow-hidden ${RATIOS[i % RATIOS.length]}`}>
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(min-width: 1001px) 25vw, (min-width: 601px) 50vw, 100vw"
                  preload={i < 4}
                  className="object-cover transition-transform duration-600 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex justify-between gap-3 text-[13px] max-sm:flex-col max-sm:items-center max-sm:gap-1">
                <span className="font-normal">{p.title}</span>
                <span className="text-muted">{p.service}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
