import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "PC Toplama Sihirbazı",
    description: "Hayalindeki bilgisayarı topla!",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="tr">
        {/* Sadece bu satırı güncelle */}
        <body className={`${inter.className} bg-background text-text-main`}>
        {children}
        </body>
        </html>
    );
}