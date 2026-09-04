import type { Dictionary } from "./types";

export const en: Dictionary = {
  site: {
    name: "Nahra",
    fullName: "Nahra Tech",
    tagline: "External Engineering Partner",
    email: "hello@nahra.tech",
    location: "Remote-first",
    copyright: "© 2026 Nahra Tech. All rights reserved.",
    nav: {
      badge: "External Engineering Partner — Est. 2023",
      links: [
        { label: "Work", href: "#work" },
        { label: "What We Build", href: "#services" },
        { label: "How We Work", href: "#engagement" },
        { label: "Agency Partners", href: "#partners" },
        { label: "Team", href: "#team" },
        { label: "Contact", href: "#contact" },
      ],
    },
    footer: {
      navigationLabel: "Navigation",
      socialLabel: "Social",
      legalsLabel: "Legals",
      backToTop: "Back ↑",
      navigation: [
        { label: "Work", href: "#work" },
        { label: "What We Build", href: "#services" },
        { label: "How We Work", href: "#engagement" },
        { label: "Agency Partners", href: "#partners" },
        { label: "Team", href: "#team" },
        { label: "Contact", href: "#contact" },
      ],
      social: [
        { label: "LinkedIn", href: "#" },
        { label: "GitHub", href: "#" },
        { label: "X (Twitter)", href: "#" },
      ],
      legals: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
      ],
    },
  },

  hero: {
    badge: "External Engineering Partner — Est. 2023",
    headlineParts: {
      line1: ["Build Software", "Your Business Needs"],
      line2: ["Without Having To", "Build an Engineering Team"],
      line3: ["Yourself.", "With", "Nahra."],
    },
    subtitle:
      "Nahra works as an external engineering team for growing businesses — building custom software, automating what's still manual, and evolving systems that keep up with your business.",
    cta: { label: "Tell Us What You Need", href: "#contact" },
  },

  ticker: [
    "Custom Software",
    "Business Automation",
    "Practical AI",
    "Systems & Integrations",
    "Ongoing Partnership",
    "Since 2023",
  ],

  about: {
    label: "Problems We Solve",
    revealText:
      "Growing businesses tend to outgrow their processes — more spreadsheets, tools that don't talk to each other, legacy systems that start holding you back, and manual work that keeps eating up time. We turn all of that into software that works for your business, without you having to build an engineering department of your own.",
    splitAt: 5,
    skills: [
      "Custom Software Platforms",
      "AI & Automation",
      "Systems & Integrations",
      "Internal Tools & Dashboards",
      "SaaS Products",
      "Ongoing Engineering",
    ],
  },

  credibility: {
    label: "(Why Businesses Choose Nahra)",
    heading: "Not Just Another Dev Vendor",
    stats: [
      {
        value: "2023",
        label: "Building and running software products hands-on since day one",
      },
      {
        value: "5",
        label: "Senior engineers & designers doing the actual execution",
      },
      {
        value: "6+",
        label: "Products shipped — from SaaS and marketplaces to business systems",
      },
    ],
    items: [
      {
        id: 1,
        title: "An Engineering Team, Without the Hiring",
        quote:
          "You get engineering capacity that can start working right away — no hiring process, no onboarding, no building a team structure from scratch.",
      },
      {
        id: 2,
        title: "We Start With the Business Problem, Not the Tech",
        quote:
          "We start by understanding how your business actually works, then figure out what needs to be built, integrated, or automated.",
      },
      {
        id: 3,
        title: "Software Doesn't Stop at Launch Day",
        quote:
          "After launch, we stay involved — fixing, building on, monitoring, and adjusting the software as your business needs change.",
      },
    ],
  },

  works: {
    label: "(Selected Work)",
    heading: "Products We've Shipped",
    labels: { year: "Year", role: "Role", services: "Tech & Capabilities" },
    items: [
      {
        id: 1,
        title: "BSJ7 Shop",
        year: "2025",
        role: "Headless E-Commerce & Marketplace",
        services: ["Next.js", "Multi-Vendor", "Search API"],
        description:
          "A multi-vendor marketplace platform in Malaysia that brings search and checkout across verified stores into a single experience.",
        slug: "bsj7-shop",
      },
      {
        id: 2,
        title: "Barcode Gokart",
        year: "2025",
        role: "Online Reservation & Booking System",
        services: ["Next.js", "Midtrans Payment", "24/7 Booking"],
        description:
          "A website and 24/7 online reservation system for a premium indoor go-kart circuit in Jakarta, letting customers book without any manual back-and-forth.",
        slug: "barcode-gokart",
      },
      {
        id: 3,
        title: "Jomterbang",
        year: "2025",
        role: "Travel Marketplace & Aggregator API",
        services: ["Next.js", "Umrah Travel", "Package Aggregator"],
        description:
          "An Umrah travel aggregator platform in Malaysia connecting licensed travel agencies with prospective pilgrims through a single system.",
        slug: "jomterbang",
      },
      {
        id: 4,
        title: "Vidiolab AI",
        year: "2026",
        role: "Multimodal AI SaaS Architecture",
        services: ["Next.js", "AI Video Models", "Stripe & Xendit"],
        description:
          "An AI video SaaS platform integrating four generative AI engines into a single product and subscription experience.",
        slug: "vidiolab-ai",
      },
      {
        id: 5,
        title: "Omnichannel CRM",
        year: "2026",
        role: "SaaS Dashboard & Messaging API",
        services: ["Next.js", "WhatsApp API", "CRM Automation"],
        description:
          "An omnichannel CRM system for managing contacts, broadcasts, WhatsApp automation, and AI bots from a single dashboard.",
        slug: "omnichannel-crm",
      },
    ],
  },

  services: {
    label: "(What We Build)",
    heading: "From Operational Problems to Software",
    tabs: [
      {
        id: "software",
        label: "Custom Platforms & Software",
        description:
          "When your processes have outgrown the tools you're using, we build software designed around how your business actually works.",
        features: ["Web & Client Portals", "Internal Business Systems", "SaaS Platforms", "Dashboards & Reporting"],
      },
      {
        id: "ai",
        label: "AI & Business Automation",
        description:
          "We use AI to cut down repetitive work and speed up processes that used to take a lot of human time.",
        features: ["Workflow Automation", "Document Processing", "Internal Knowledge Base", "AI-Powered Customer Support"],
      },
      {
        id: "systems",
        label: "Systems & Integrations",
        description:
          "We connect the tools you already use and replace processes still stuck on Excel, WhatsApp, or legacy systems with one integrated workflow.",
        features: ["API & Third-Party Integrations", "Manual Process Automation", "Data Pipelines", "Legacy System Modernization"],
      },
      {
        id: "partnership",
        label: "Ongoing Engineering",
        description:
          "Once your software is live, your business keeps moving. We stay available for new features, fixes, monitoring, and whatever engineering comes next.",
        features: ["Feature Development", "Monitoring & Maintenance", "Priority Support", "Roadmap Planning"],
      },
    ],
  },

  team: {
    label: "(Our Team)",
    preHeading: "Meet Nahra",
    heading: "Work Directly With the People Building Your Software",
    bio: "Nahra is a team of five senior engineers and designers who've worked as an engineering partner for growing businesses and agencies since 2023. We work directly with the people who understand the problem, own the execution, and stay involved after the software ships.",
    timeline: [
      { role: "Founded", period: "2023" },
      { role: "Team Size", period: "5 People" },
      { role: "Products Shipped", period: "6+" },
      { role: "Focus", period: "Custom Software, AI & Automation, Systems Integration" },
    ],
  },

  engagement: {
    label: "(How We Work)",
    heading: "One Engineering Team. Shaped Around What You Need.",
    plans: [
      {
        id: "project",
        name: "Build",
        description:
          "For businesses that need a new platform, internal system, or product with a clear goal and scope.",
        delivery: "Project-Based",
        highlightLabel: "Best for",
        highlight: "New products, platforms, and system rebuilds",
        features: [
          "Clear scope & timeline",
          "Direct access to the execution team",
          "Done by senior practitioners",
          "Support all the way to launch",
        ],
        cta: "Discuss Your Project",
        highlighted: false,
      },
      {
        id: "retainer",
        name: "Grow",
        description:
          "For businesses that already have software and need ongoing engineering capacity to keep growing it.",
        delivery: "Monthly Partnership",
        highlightLabel: "Best for",
        highlight: "Live platforms & ongoing engineering needs",
        features: [
          "New feature development",
          "Monitoring & maintenance",
          "Priority support",
          "Flexible scope that follows your roadmap",
        ],
        cta: "Discuss Your Needs",
        highlighted: true,
      },
      {
        id: "agency",
        name: "Partner",
        description:
          "For agencies that want to take on software projects without building their own engineering team. You keep the client relationship — we handle the execution.",
        delivery: "Per-Project or Ongoing",
        highlightLabel: "Best for",
        highlight: "Agencies without an in-house engineering team",
        features: [
          "White-label engineering execution",
          "You stay the client's point of contact",
          "Flexible scope per project",
          "Confidential by default",
        ],
        cta: "Become an Engineering Partner",
        highlighted: false,
      },
    ],
  },

  faq: {
    label: "(FAQ)",
    heading: "Frequently Asked Questions",
    subheading: "What you should know before building software with Nahra.",
    items: [
      {
        id: 1,
        question: "Why use an external engineering team?",
        answer:
          "Because you get senior engineering capacity without having to build the whole engineering function yourself — from hiring and onboarding to managing the team and its ongoing development.",
      },
      {
        id: 2,
        question: "Is Nahra a good fit for businesses that already have an internal team?",
        answer:
          "Yes. We can also work as an extension of your internal team — helping speed up development, taking on specific projects, or covering engineering needs your team doesn't have capacity for.",
      },
      {
        id: 3,
        question: "Does Nahra only build websites?",
        answer:
          "Our focus is software that's actually used to run or grow a business — internal systems, customer portals, SaaS, dashboards, workflow automation, AI tools, and integrations between systems.",
      },
      {
        id: 4,
        question: "How is AI used in projects?",
        answer:
          "We use AI where it genuinely reduces manual work, speeds up a process, or extends what a system can do — document processing, internal knowledge, customer support, and workflow automation, for example.",
      },
      {
        id: 5,
        question: "Does Nahra stick around after the software launches?",
        answer:
          "Yes. We can stay involved through maintenance, monitoring, feature development, integrations, and whatever's next on the engineering roadmap as your business needs change.",
      },
      {
        id: 6,
        question: "How do we get started?",
        answer:
          "Tell us about your business, the problem you're facing, or the software you want to build. We'll start by understanding the context and the need before landing on the solution that makes the most sense.",
      },
      {
        id: 7,
        question: "We're an agency. Can we work with Nahra white-label?",
        answer:
          "Yes. We work behind the scenes as your engineering partner. You keep the relationship with your client, while we handle all the technical work within the agreed scope.",
      },
    ],
  },

  contact: {
    label: "Let's Get Started",
    heading: "Tell Us the Problem You Want to Solve.",
    subheading:
      "You don't need to already know what software to build. Tell us how your business runs and what's slowing it down — we'll help figure out what needs building, automating, or fixing.",
    email: "hello@nahra.tech",
    whatsapp: { display: "+62 812-0000-0000", href: "https://wa.me/6281200000000" },
    ctas: [
      { label: "Talk to an Engineer", href: "mailto:hello@nahra.tech" },
      { label: "Discuss via WhatsApp", href: "https://wa.me/6281200000000" },
    ],
  },
};
