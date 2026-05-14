import type { Metadata } from "next";
import React from "react";
import { EB_Garamond, Lato } from "next/font/google";

import { SiteContact } from "../components/SiteContact";
import { cssVars } from "../styles/tokens";

import "./globals.css";

/** Display + serif subheads: EB Garamond (closest to “condensed” on Google Fonts is the standard family). */
const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: "normal",
  variable: "--app-font-heading",
  display: "swap",
});

const bodyFont = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  style: "normal",
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
    <html lang="en" className={`${ebGaramond.variable} ${bodyFont.variable}`} style={appCssVars}>
      <body suppressHydrationWarning>
        {children}
        <SiteContact />
      </body>
    </html>
  );
}

