import type { Metadata } from "next";
import "./globals.css";
import Analytics from "@/components/Analytics";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Auto-Co — Your AI team builds products while you sleep",
  description:
    "14 AI agents — CEO, CTO, engineer, marketer, and more — autonomously build, deploy, and grow your digital product. No code required.",
  metadataBase: new URL("https://runautoco.com"),
  robots: { index: true, follow: true },
  openGraph: {
    title: "Auto-Co — Your AI team builds products while you sleep",
    description:
      "14 AI agents. 24/7 autonomous loop. Zero daily supervision. Watch your AI company ship.",
    type: "website",
    url: "https://runautoco.com",
    images: [{ url: "https://runautoco.com/screenshots/demo-full.png", width: 1400, height: 900 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Auto-Co — Your AI team builds products while you sleep",
    description: "14 AI agents. 24/7 autonomous loop. Zero daily supervision.",
    images: ["https://runautoco.com/screenshots/demo-full.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-black text-white antialiased">
        <Analytics />
        <Nav />
        {children}
      </body>
    </html>
  );
}
