import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import TickerSection from "@/components/sections/TickerSection";
import AboutSection from "@/components/sections/AboutSection";
import CredibilitySection from "@/components/sections/CredibilitySection";
import WorksSection from "@/components/sections/WorksSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TeamSection from "@/components/sections/TeamSection";
import EngagementSection from "@/components/sections/EngagementSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import { getDictionary, hasLocale } from "@/data/dictionaries";

const descriptions = {
  id: "Nahra adalah tim engineering eksternal untuk bisnis yang bertumbuh dan agensi — membangun software kustom, otomasi AI, dan sistem bisnis tanpa beban membangun divisi engineering internal.",
  en: "Nahra is an external engineering team for growing businesses and agencies — building custom software, AI automation, and business systems without the overhead of an internal engineering department.",
} as const;

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};

  const dict = getDictionary(lang);
  return {
    title: `${dict.site.name} — ${dict.site.tagline}`,
    description: descriptions[lang],
    alternates: {
      languages: { id: "/", en: "/en" },
    },
  };
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return (
    <>
      <Nav dict={dict} lang={lang} />
      <main>
        <HeroSection dict={dict} />
        <TickerSection dict={dict} />
        <AboutSection dict={dict} />
        <CredibilitySection dict={dict} />
        <WorksSection dict={dict} />
        <ServicesSection dict={dict} />
        <TeamSection dict={dict} />
        <EngagementSection dict={dict} />
        <FAQSection dict={dict} />
        <ContactSection dict={dict} />
      </main>
      <Footer dict={dict} />
    </>
  );
}
