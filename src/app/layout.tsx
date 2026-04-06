import type { Metadata } from "next";
import React from "react";
import { Cormorant_Garamond, Nunito_Sans } from "next/font/google";

import { SiteContact } from "../components/SiteContact";
import { cssVars } from "../styles/tokens";

import "./globals.css";

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--app-font-heading",
  display: "swap",
});

const bodyFont = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
  const appCssVars = { ...cssVars } as React.CSSProperties;

  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`} style={appCssVars}>
      <body suppressHydrationWarning>
        {children}
        <SiteContact />
      </body>
    </html>
  );
}

