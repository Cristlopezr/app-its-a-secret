import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AudioPlayer } from "@/components/AudioPlayer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "It's a Secret",
  description: "A game where you can reveal your secrets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased container mx-auto`}
      >
        <AudioPlayer className="absolute right-20 top-10" />
        {children}
      </body>
    </html>
  );
}
