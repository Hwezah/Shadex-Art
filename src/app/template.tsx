import { PageIntro } from "@/components/motion/intro";

// Templates remount on every navigation, so the curtain replays per page.
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageIntro>{children}</PageIntro>;
}
