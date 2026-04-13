import type { Metadata } from "next";
import React from "react";
import { Playfair_Display, Raleway } from "next/font/google";

import { SiteContact } from "../components/SiteContact";
import { cssVars } from "../styles/tokens";

import "./globals.css";

/** Display + “text” serif headers both use Playfair Display (single bundle). */
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: "normal",
  variable: "--app-font-heading",
  display: "swap",
});

const bodyFont = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--app-font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Brent Budolfson | Product Designer & Director",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const appCssVars = {
    ...cssVars,
    "--app-font-heading-text": "var(--app-font-heading)",
  } as React.CSSProperties;

  return (
    <html lang="en" className={`${playfairDisplay.variable} ${bodyFont.variable}`} style={appCssVars}>
      <body suppressHydrationWarning>
        {children}
        <SiteContact />
      </body>
    </html>
  );
}

