import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { Media } from "@/components/motion/media";
import { Reveal } from "@/components/motion/reveal";
import { ArrowLink } from "@/components/ui/arrow-link";
import { PostCard } from "@/components/post-card";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { getPost, postIntro, posts, relatedPosts } from "@/lib/data/posts";
import { site } from "@/lib/data/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const p = getPost((await params).slug);
  return p ? { title: p.title, description: p.excerpt } : {};
}

function Section({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="flex flex-col gap-3">
      <Reveal as="h2" className="text-xl font-normal">
        {heading}
      </Reveal>
      <Reveal as="p" className="text-[15px] leading-[1.8] text-pretty text-body-strong">
        {body}
      </Reveal>
    </div>
  );
}

export default async function ArticlePage({ params }: PageProps<"/journal/[slug]">) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const [s0, s1, s2] = p.sections;

  return (
    <>
      <article className="mx-auto flex max-w-[760px] flex-col gap-[clamp(28px,3vw,40px)] px-[clamp(20px,3vw,40px)] pt-[clamp(40px,5vw,72px)] pb-[clamp(56px,7vw,96px)]">
        <header className="flex flex-col items-center gap-3.5 text-center">
          <span className="text-[11px] tracking-[0.18em] text-muted uppercase">
            {p.tag} · {p.date}
          </span>
          <Reveal as="h1" className="text-[clamp(30px,3.2vw,44px)] leading-[1.15] text-balance">
            {p.title}
          </Reveal>
        </header>
        <Media src={p.image} alt={p.title} className="aspect-[3/2]" sizes="(min-width: 800px) 760px, 100vw" preload />
        <Reveal
          as="p"
          className="text-base leading-[1.8] text-pretty first-letter:float-left first-letter:mt-1 first-letter:mr-2.5 first-letter:text-[62px] first-letter:leading-[0.9] first-letter:font-normal"
        >
          {postIntro(p)}
        </Reveal>
        {s0 && <Section {...s0} />}
        <div className="grid grid-cols-2 gap-[clamp(10px,1.2vw,16px)]">
          <Media src={p.imageB} className="aspect-[3/4]" sizes="(min-width: 800px) 380px, 50vw" />
          <Media src={p.image} className="aspect-[3/4]" sizes="(min-width: 800px) 380px, 50vw" index={1} />
        </div>
        {s1 && <Section {...s1} />}
        <Media src={p.imageC} className="aspect-[16/10]" sizes="(min-width: 800px) 760px, 100vw" />
        {s2 && <Section {...s2} />}
        <aside className="flex flex-col items-center gap-3.5 bg-alt p-7 text-center">
          <span className="text-[15px] font-normal">Planning a project like this?</span>
          <WhatsAppLink className="inline-flex items-center gap-1.5 border-b border-ink pb-0.5 text-[13px]">
            Talk to Shadex on {site.phone.display} <ArrowRight size={15} strokeWidth={1.5} aria-hidden />
          </WhatsAppLink>
        </aside>
      </article>

      <section className="border-t border-line">
        <div className="shell pt-[clamp(48px,6vw,80px)] pb-[clamp(64px,8vw,120px)]">
          <div className="mb-8 flex items-end justify-between gap-5 max-sm:flex-col max-sm:items-center">
            <Reveal as="h2" className="text-[clamp(24px,2.2vw,32px)]">
              Related
            </Reveal>
            <ArrowLink href="/journal" className="text-[13px]">
              All articles
            </ArrowLink>
          </div>
          <div className="grid grid-cols-1 items-start gap-[clamp(12px,1.5vw,20px)] md:grid-cols-3">
            {relatedPosts(p.slug, 3).map((r, i) => (
              <PostCard
                key={r.slug}
                post={r}
                ratio="aspect-[4/5]"
                sizes="(min-width: 761px) 33vw, 100vw"
                index={i}
                showDate={false}
                titleSize="text-base"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
