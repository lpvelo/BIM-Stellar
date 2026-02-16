import { locales } from "@/i18n/config";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BIM - Stellar POC",
  description: "Stellar swap POC - XLM / USDC",
  icons: {
    icon: "/favicon.ico",
  },
};

type LayoutProps = { children: React.ReactNode };

export default async function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body
        className="font-sans antialiased bg-background"
        style={{
          backgroundColor: "#141414",
          backgroundImage: "url(/assets/images/backgrounds/background.webp)",
          backgroundRepeat: "no-repeat",
        }}
      >
        {children}
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
