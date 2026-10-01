import Link from "next/link";
import { Media } from "@/components/motion/media";
import { postHref, type Post } from "@/lib/data/posts";
import { cn } from "@/lib/utils";

type PostCardProps = {
  post: Post;
  ratio: string;
  sizes: string;
  index?: number;
  showDate?: boolean;
  titleSize?: string;
  className?: string;
};

export function PostCard({ post, ratio, sizes, index, showDate = true, titleSize = "text-[17px]", className }: PostCardProps) {
  return (
    <Link href={postHref(post.slug)} className={cn("flex min-w-0 flex-col gap-3.5 max-sm:items-center max-sm:text-center", className)}>
      <Media src={post.image} alt={post.title} className={cn("w-full", ratio)} sizes={sizes} index={index} />
      <span className="text-[11px] tracking-[0.16em] text-muted uppercase">
        {post.tag}
        {showDate && ` · ${post.date}`}
      </span>
      <span className={cn("font-normal", titleSize)}>{post.title}</span>
      <span className="max-w-[520px] text-[13.5px] leading-[1.6] text-body">{post.excerpt}</span>
    </Link>
  );
}
