import { site } from "@/lib/data/site";

/**
 * Opens a WhatsApp chat with Shadex: the app on phones (via wa.me's
 * universal link), WhatsApp Web/Desktop on computers. Opens in a new tab so
 * the handoff isn't swallowed by in-app browsers and the site stays open.
 */
export function WhatsAppLink({ children, ...props }: React.ComponentProps<"a">) {
  return (
    <a href={site.phone.whatsapp} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}
