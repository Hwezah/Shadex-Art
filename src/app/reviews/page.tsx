import type { Metadata } from "next";
import { Quote } from "lucide-react";
import { Media } from "@/components/motion/media";
import { Reveal } from "@/components/motion/reveal";
import { pexels } from "@/lib/images";
import { reviews } from "@/lib/data/reviews";

export const metadata: Metadata = {
  title: "Reviews",
  description: "What our clients say about working with Shadex.",
};

const QuoteMark = () => <Quote size={26} strokeWidth={1.2} aria-hidden className="text-ink" />;

export default function ReviewsPage() {
  return (
    <>
      <section className="shell grid grid-cols-1 items-center gap-[clamp(32px,4vw,56px)] pt-[clamp(24px,3vw,40px)] pb-[clamp(64px,8vw,120px)] md:grid-cols-2">
        <div className="flex flex-col gap-[22px] max-sm:items-center max-sm:text-center">
          <Reveal as="h1" className="text-[clamp(34px,3.6vw,52px)] leading-[1.1] tracking-[-0.01em]">
            Reviews
          </Reveal>
          <Reveal as="p" index={1} className="max-w-[440px] text-sm leading-[1.75] text-pretty text-body">
            What our clients say about working with Shadex — from single-room makeovers to full homes and offices.
          </Reveal>
        </div>
        <Media src={pexels(1669799)} alt="Living room with artwork" className="aspect-square" sizes="(min-width: 761px) 50vw, 100vw" preload />
      </section>

      {reviews.map((r) =>
        r.image ? (
          <section key={r.who} className="bg-alt">
            <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-[clamp(32px,5vw,80px)] px-[clamp(20px,3vw,40px)] py-[clamp(64px,8vw,110px)] md:grid-cols-2">
              <Media
                src={r.image}
                alt=""
                className="aspect-[3/4] w-full max-w-[360px] justify-self-center max-sm:max-w-full"
                sizes="(min-width: 761px) 360px, 100vw"
              />
              <figure className="flex flex-col gap-[22px]">
                <QuoteMark />
                <Reveal as="p" className="text-[clamp(15px,1.3vw,17px)] leading-[1.8] text-pretty">
                  {r.text}
                </Reveal>
                <figcaption className="text-[13px] text-muted">{r.who}</figcaption>
              </figure>
            </div>
          </section>
        ) : (
          <section key={r.who}>
            <figure className="mx-auto flex max-w-[760px] flex-col items-center gap-6 px-[clamp(20px,3vw,40px)] py-[clamp(64px,8vw,110px)] text-center">
              <QuoteMark />
              <Reveal as="p" className="text-[clamp(15px,1.3vw,18px)] leading-[1.8] text-pretty">
                {r.text}
              </Reveal>
              <figcaption className="text-[13px] text-muted">{r.who}</figcaption>
            </figure>
          </section>
        ),
      )}
    </>
  );
}
