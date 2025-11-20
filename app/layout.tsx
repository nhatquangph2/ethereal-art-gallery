import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { ThemeProvider } from "@/lib/theme-context";
import { TestAccountsInit } from "@/components/test-accounts-init";
import { ArtworksInit } from "@/components/artworks-init";
import { Toaster } from "sonner";
import { KeyboardShortcutsProvider } from "@/components/keyboard-shortcuts-provider";
import "@/lib/create-demo-account"; // Auto-create demo account

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Ethereal Art Gallery | Nơi Trú Ẩn Cho Tâm Hồn",
  description:
    "Khám phá nghệ thuật qua trải nghiệm đa giác quan với âm thanh thích ứng và kể chuyện tương tác. Một hành trình nhập vai vào thế giới nghệ thuật Việt Nam.",
  keywords: [
    "art gallery",
    "nghệ thuật",
    "triển lãm",
    "scrollytelling",
    "adaptive audio",
    "immersive experience",
    "Vietnamese art",
  ],
  authors: [{ name: "The Ethereal Art Gallery" }],
  openGraph: {
    title: "The Ethereal Art Gallery",
    description: "Nơi trú ẩn cho tâm hồn - Trải nghiệm nghệ thuật tương tác",
    type: "website",
    locale: "vi_VN",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="lenis">
      <body className={`${cormorant.variable} ${inter.variable} antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            <TestAccountsInit />
            <ArtworksInit />
            <KeyboardShortcutsProvider />
            <Toaster position="top-center" richColors />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
