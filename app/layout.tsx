import React from "react"
import type { Metadata, Viewport } from "next";
import { Sora, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hina Mushtaq | Environmental Scientist & Creative Designer",
  description:
    "Portfolio of Hina Mushtaq - Environmental Sciences professional combining scientific research with creative design solutions for a sustainable future.",
  keywords: [
    "Hina",
    "Mushtaq",
    "Hina Mushtaq",
    "Hina Mushtaq Portfolio",
    "environmental science",
    "environmental scientist",
    "sustainability",
    "safety environment",
    "creative design",
    "UI/UX",
    "graphic design",
    "ecology",
    "GIS specialist",
    "hina",
    "mushtaq",
    "hi",
    "science",
    "sciences",
    "environment",
    "envoirnment",
    "envoirnmental scientist",
    "safety envoirnment",
    "environmental",
    "creative",
    "designer",
    "portfolio",
  ],
  authors: [{ name: "Hina Mushtaq" }],
  generator: "v0.app",
  verification: {
    google: "iGqAcQ8xIOqn6MlWwPv7tnn0I9nCZQCDZv0Jgn-O064",
  },
  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#4a7c59" },
    { media: "(prefers-color-scheme: dark)", color: "#1a2e1f" },
  ],
  width: "device-width",
  initialScale: 1,
};

import { ThemeProvider } from "@/components/theme-provider";
import { ScrollProvider } from "@/components/scroll-provider";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${sora.variable} ${spaceGrotesk.variable} font-sans antialiased overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollProvider>
            {children}
            <WhatsAppButton />
          </ScrollProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
