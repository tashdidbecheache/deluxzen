import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter, Inter_Tight, Pixelify_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400", "500", "600"] });
const interTight = Inter_Tight({ variable: "--font-tight", subsets: ["latin"], weight: ["500", "600", "700"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"], weight: ["500"] });
const bebas = Bebas_Neue({ variable: "--font-bebas", subsets: ["latin"], weight: "400" });
const pixelify = Pixelify_Sans({ variable: "--font-pixel", subsets: ["latin"], weight: ["400", "600"] });

const description =
  "Deluxzen is a portfolio website design agency. We design and build fast, custom portfolio websites for businesses, creators and professionals in the UK, USA, Canada and Sweden. Packages from $100.";

export const metadata: Metadata = {
  metadataBase: new URL("https://deluxen.studio"),
  title: "Deluxzen | Portfolio Website Design Agency for Brands & Professionals",
  description,
  keywords: [
    "portfolio website design",
    "portfolio website agency",
    "custom portfolio website",
    "portfolio website for business",
    "personal portfolio website",
    "portfolio web design UK",
    "portfolio website USA",
    "portfolio website Canada",
    "portfolio website Sweden",
    "web design agency Bangladesh",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  openGraph: {
    type: "website",
    siteName: "Deluxzen",
    title: "Deluxzen | Portfolio Website Design Agency",
    description: "Custom, fast portfolio websites for businesses, creators and professionals. Designed with intent, never a template. Packages from $100.",
    url: "/",
    images: ["/assets/video/deluxzen-promo-poster.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deluxzen | Portfolio Website Design Agency",
    description: "Custom, fast portfolio websites for businesses, creators and professionals. Packages from $100.",
  },
};

export const viewport: Viewport = { themeColor: "#0A0305" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${interTight.variable} ${spaceGrotesk.variable} ${bebas.variable} ${pixelify.variable}`}>{children}</body>
    </html>
  );
}
