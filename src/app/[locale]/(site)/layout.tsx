import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";
import { Libre_Baskerville, Nunito } from "next/font/google";

export const metadata: Metadata = {
  title: "TamazightTreasures",
  description:
    "TamazightTreasures is a collection of Tamazight books, music, and movies.",
};
const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-heading",
});
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
});
export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: {
    locale: string;
  };
}>) {
  return (
    <div
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`bg-website-background text-website-text ${nunito.className} ${libreBaskerville.variable} ${nunito.variable}`}
    >
      <Navbar />
      {children}
      <Toaster />
      <Footer />
    </div>
  );
}
