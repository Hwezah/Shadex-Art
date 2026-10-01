import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MenuProvider } from "@/context/menu-context";
import { site } from "@/lib/data/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: { default: site.name, template: `%s — ${site.name}` },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>
        <noscript>
          {/* Reveal animations start hidden; show everything when JS is off. */}
          <style>{`[data-reveal],[data-reveal-image]{opacity:1!important;transform:none!important;clip-path:none!important}[data-curtain]{display:none!important}`}</style>
        </noscript>
        <MenuProvider>
          {/* overflow-x: clip (not hidden) so sticky columns keep working. */}
          <div className="overflow-x-clip">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </MenuProvider>
      </body>
    </html>
  );
}
