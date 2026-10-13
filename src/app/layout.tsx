import type { Metadata } from "next";
import { Manrope, DM_Sans } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/home/home-sections";
import SiteHeader from "@/components/layout/site-header";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bima Wicksn — Wedding Photographer & Filmmaker",
    template: "%s | Bima Wicksn",
  },
  description:
    "Wedding photography and cinematic films documenting honest emotions, meaningful connections, and the stories that make every love unique.",
  applicationName: "Bima Wicksn",
  openGraph: {
    title: "Bima Wicksn — Wedding Photographer & Filmmaker",
    description:
      "Honest moments. Meaningful stories. Wedding photography and films crafted with intention.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" id="top"><SiteHeader variant="subpage" />{children}<SiteFooter /></body>
    </html>
  );
}
