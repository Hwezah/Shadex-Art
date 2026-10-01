import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { PostCard } from "@/components/post-card";
import { posts } from "@/lib/data/posts";

export const metadata: Metadata = {
  title: "Journal",
  description: "News, ideas and practical tips on ceilings, colour, art and interiors from Shadex.",
};

export default function JournalPage() {
  const [lead, second, ...rest] = posts;

  return (
    <>
      <section className="shell pt-[clamp(40px,5vw,72px)] pb-[clamp(32px,4vw,48px)]">
        <Reveal as="h1" className="text-[clamp(30px,3.2vw,46px)] leading-[1.2] tracking-[-0.01em] max-sm:text-center">
          News, ideas
          <br />
          and practical tips
        </Reveal>
      </section>

      <section className="shell flex flex-wrap items-start gap-[clamp(12px,1.5vw,20px)] pb-[clamp(56px,7vw,96px)]">
        <PostCard post={lead} ratio="aspect-[16/10]" sizes="(min-width: 1001px) 66vw, 100vw" titleSize="text-xl" className="flex-[2_1_520px]" />
        <PostCard post={second} ratio="aspect-[4/5]" sizes="(min-width: 1001px) 33vw, 100vw" index={1} className="flex-[1_1_300px]" />
      </section>

      <section className="shell pb-[clamp(80px,9vw,140px)]">
        <div className="grid grid-cols-1 items-start gap-x-[clamp(12px,1.5vw,20px)] gap-y-[clamp(40px,4vw,56px)] sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((p, i) => (
            <PostCard key={p.slug} post={p} ratio="aspect-[3/4]" sizes="(min-width: 1001px) 25vw, (min-width: 601px) 50vw, 100vw" index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
