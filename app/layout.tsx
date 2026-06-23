import type { Metadata } from "next";
import "./globals.scss";

// Root layout. Fonts: Fraunces for the listing headline + the dashboard
// hero number (editorial weight); DM Sans for all UI. The per-prospect
// brand accent is applied on the page root, not here.

export const metadata: Metadata = {
  title: "Speed to Lead",
  description:
    "A buyer enquires and gets a real, personalised reply in seconds — not the 15-hour industry average.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* DM Sans = UI everywhere · Fraunces = listing display · Space
            Grotesk + DM Mono = marketing display + labels. */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Mono:wght@400;500&family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
