import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[60vh] flex-col items-start justify-center gap-6 py-[clamp(80px,9vw,140px)] max-sm:items-center max-sm:text-center">
      <span className="eyebrow text-muted">404</span>
      <h1 className="text-[clamp(34px,3.6vw,52px)] leading-[1.1]">This room doesn&apos;t exist.</h1>
      <p className="max-w-[440px] text-sm leading-[1.75] text-body">
        The page you were looking for has moved or was never built. Try the studio or our recent work.
      </p>
      <div className="flex flex-wrap gap-3 max-sm:justify-center">
        <Button asChild variant="solid" size="md">
          <Link href="/">Back to the studio</Link>
        </Button>
        <Button asChild variant="outline" size="md">
          <Link href="/portfolio">See the portfolio</Link>
        </Button>
      </div>
    </section>
  );
}
