import type { Metadata } from "next";
import { Gaegu, Nunito } from "next/font/google";
import "./globals.css";

const gaegu = Gaegu({
  subsets: ["latin"],
  variable: "--font-gaegu",
  weight: ["400", "700"],
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Study OS",
  description: "Your AI-powered study planning companion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${gaegu.variable} ${nunito.variable} h-full`}>
      <body className="min-h-full bg-linen">{children}</body>
    </html>
  );
}
