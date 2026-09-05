export type NavLink = { label: string; href: string };

export type Dictionary = {
  site: {
    name: string;
    fullName: string;
    tagline: string;
    email: string;
    location: string;
    copyright: string;
    nav: { badge: string; links: NavLink[] };
    footer: {
      navigationLabel: string;
      socialLabel: string;
      legalsLabel: string;
      backToTop: string;
      navigation: NavLink[];
      social: NavLink[];
      legals: NavLink[];
    };
  };
  hero: {
    badge: string;
    headlineParts: {
      line1: [string, string];
      line2: [string, string];
      line3: [string, string, string];
    };
    subtitle: string;
    cta: { label: string; href: string };
  };
  ticker: string[];
  about: {
    label: string;
    revealText: string;
    splitAt: number;
    skills: string[];
  };
  credibility: {
    label: string;
    heading: string;
    stats: { value: string; label: string }[];
    items: { id: number; title: string; quote: string }[];
  };
  works: {
    label: string;
    heading: string;
    labels: { year: string; role: string; services: string };
    items: {
      id: number;
      title: string;
      year: string;
      role: string;
      services: string[];
      description: string;
      slug: string;
    }[];
  };
  services: {
    label: string;
    heading: string;
    tabs: { id: string; label: string; description: string; features: string[] }[];
  };
  team: {
    label: string;
    preHeading: string;
    heading: string;
    bio: string;
    timeline: { role: string; period: string }[];
  };
  engagement: {
    label: string;
    heading: string;
    plans: {
      id: string;
      name: string;
      description: string;
      delivery: string;
      highlightLabel: string;
      highlight: string;
      features: string[];
      cta: string;
      highlighted: boolean;
    }[];
  };
  faq: {
    label: string;
    heading: string;
    subheading: string;
    items: { id: number; question: string; answer: string }[];
  };
  contact: {
    label: string;
    heading: string;
    subheading: string;
    email: string;
    whatsapp: { display: string; href: string };
    ctas: { label: string; href: string }[];
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submitLabel: string;
    };
  };
};
