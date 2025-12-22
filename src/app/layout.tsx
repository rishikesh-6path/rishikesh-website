import type { Metadata } from "next";
import { Space_Grotesk, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { MoodProvider } from "@/contexts/MoodContext";
import { MoodApplicator } from "@/components/providers/MoodApplicator";
import BackgroundTexture from "@/components/ui/BackgroundTexture";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Rishikesh Swaminathan — Creator",
  description:
    "ML Engineer, Cinematographer, and Builder based in Chennai. Creating at the intersection of code and cinema.",
  keywords: [
    "Rishikesh Swaminathan",
    "ML Engineer",
    "Cinematographer",
    "Chennai",
    "Creator",
    "Developer",
    "Filmmaker",
  ],
  authors: [{ name: "Rishikesh Swaminathan" }],
  openGraph: {
    title: "Rishikesh Swaminathan — Creator",
    description: "Creating at the intersection of code and cinema.",
    url: "https://rishikesh.dev",
    siteName: "Rishikesh Swaminathan",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rishikesh Swaminathan — Creator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishikesh Swaminathan — Creator",
    description: "Creating at the intersection of code and cinema.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${playfair.variable}`}
    >
      <body className="bg-background text-foreground font-body antialiased">
        <MoodProvider>
          <MoodApplicator>
            <BackgroundTexture />
            <div className="grain-overlay" />
            {children}
          </MoodApplicator>
        </MoodProvider>
      </body>
    </html>
  );
}
