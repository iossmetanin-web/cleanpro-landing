import type { Metadata } from "next";
import { Manrope, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CleanPro — Экологичная клининговая компания",
  description: "Профессиональная уборка с использованием экологичных средств. Безопасно для вас, ваших детей и домашних животных.",
  keywords: ["клининг", "уборка", "экологичный клининг", "генеральная уборка", "уборка квартир", "Москва"],
  authors: [{ name: "CleanPro" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "CleanPro — Экологичная клининговая компания",
    description: "Профессиональная уборка с использованием экологичных средств",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${playfair.variable} ${jetbrainsMono.variable} antialiased`}
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
