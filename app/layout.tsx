import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Free QR Code Generator - Create Custom QR Codes Instantly",
  description:
    "Generate beautiful, custom QR codes for free with no watermarks or limitations. Instant, client-side generation with full customization options.",
  keywords: [
    "qr code",
    "qr generator",
    "free qr code",
    "custom qr code",
    "qr code maker",
    "generate qr code",
  ],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Free QR Code Generator",
    description:
      "Create custom QR codes instantly, completely free with no watermarks",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free QR Code Generator",
    description: "Create custom QR codes instantly, completely free",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <div className="bg-gradient-noise" />
        {children}
      </body>
    </html>
  );
}
