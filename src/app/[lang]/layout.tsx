import { Inter, Cal_Sans, Caveat } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import { locales } from "@/data/dictionaries";
import "../globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const calSans = Cal_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
});

const caveat = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  return (
    <html
      lang={lang}
      className={`${inter.variable} ${calSans.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
          <SmoothScroll>{children}</SmoothScroll>
        </body>
    </html>
  );
}
