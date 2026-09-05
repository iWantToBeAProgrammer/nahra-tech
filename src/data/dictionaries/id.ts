import type { Dictionary } from "./types";

export const id: Dictionary = {
  site: {
    name: "Nahra",
    fullName: "Nahra Tech",
    tagline: "Partner Engineering Eksternal",
    email: "hello@nahra.tech",
    location: "Jakarta",
    copyright: "© 2026 Nahra Tech. Seluruh hak cipta dilindungi.",
    nav: {
      badge: "Partner Engineering Eksternal — Berdiri 2023",
      links: [
        { label: "Portofolio", href: "#work" },
        { label: "Yang Kami Bangun", href: "#services" },
        { label: "Cara Kerja", href: "#engagement" },
        { label: "Partner Agensi", href: "#partners" },
        { label: "Tim Kami", href: "#team" },
        { label: "Kontak", href: "#contact" },
      ],
    },
    footer: {
      navigationLabel: "Navigasi",
      socialLabel: "Sosial",
      legalsLabel: "Legal",
      backToTop: "Ke Atas ↑",
      navigation: [
        { label: "Portofolio", href: "#work" },
        { label: "Yang Kami Bangun", href: "#services" },
        { label: "Cara Kerja", href: "#engagement" },
        { label: "Partner Agensi", href: "#partners" },
        { label: "Tim Kami", href: "#team" },
        { label: "Kontak", href: "#contact" },
      ],
      social: [
        { label: "LinkedIn", href: "#" },
        { label: "GitHub", href: "#" },
        { label: "X (Twitter)", href: "#" },
      ],
      legals: [
        { label: "Kebijakan Privasi", href: "#" },
        { label: "Syarat & Ketentuan", href: "#" },
      ],
    },
  },

  hero: {
    badge: "Partner Engineering Eksternal — Berdiri 2023",
    headlineParts: {
      line1: ["Bangun Software", "yang Bisnis Anda Butuhkan"],
      line2: ["Tanpa Harus", "Membangun Tim Engineering"],
      line3: ["Sendiri.", "Dengan", "Nahra."],
    },
    subtitle:
      "Nahra menjadi tim engineering eksternal untuk bisnis yang sedang berkembang — membangun software custom, mengotomasi proses yang masih manual, dan mengembangkan sistem yang terus mengikuti bisnis Anda.",
    cta: { label: "Ceritakan Kebutuhan Anda", href: "#contact" },
  },

  ticker: [
    "Software Custom",
    "Otomasi Bisnis",
    "AI yang Praktis",
    "Sistem & Integrasi",
    "Kemitraan Berkelanjutan",
    "Sejak 2023",
  ],

  about: {
    label: "Masalah yang Kami Selesaikan",
    revealText:
      "Bisnis yang tumbuh biasanya membawa proses yang semakin kompleks — spreadsheet yang semakin banyak, tools yang tidak saling terhubung, sistem lama yang mulai membatasi, dan pekerjaan manual yang terus memakan waktu. Kami mengubah proses tersebut menjadi software yang bekerja untuk bisnis Anda, tanpa Anda harus membangun divisi engineering sendiri.",
    splitAt: 26,
    skills: [
      "Platform Software Custom",
      "AI & Otomasi",
      "Sistem & Integrasi",
      "Tools & Dashboard Internal",
      "Produk SaaS",
      "Engineering Berkelanjutan",
    ],
  },

  credibility: {
    label: "(Mengapa Bisnis Memilih Nahra)",
    heading: "Testimoni",
    stats: [
      {
        value: "2023",
        label:
          "Mulai membangun dan menjalankan produk software secara langsung",
      },
      {
        value: "5",
        label:
          "Engineer & desainer senior yang bekerja langsung dalam eksekusi",
      },
      {
        value: "6+",
        label:
          "Produk telah dirilis, dari SaaS dan marketplace hingga sistem bisnis",
      },
    ],
    items: [
      {
        id: 1,
        title: "Bangun Tim Engineering Tanpa Merekrut Satu per Satu",
        quote:
          "Anda mendapatkan kapasitas engineering yang bisa langsung bekerja tanpa harus melewati proses hiring, onboarding, dan membangun struktur tim dari nol.",
      },
      {
        id: 2,
        title: "Mulai dari Masalah Bisnis, Bukan Teknologi",
        quote:
          "Kami memahami bagaimana bisnis Anda bekerja terlebih dahulu, lalu menentukan apa yang perlu dibangun, diintegrasikan, atau diotomatisasi.",
      },
      {
        id: 3,
        title: "Software Tidak Berhenti di Hari Peluncuran",
        quote:
          "Setelah rilis, kami tetap terlibat untuk memperbaiki, mengembangkan, memonitor, dan menyesuaikan software seiring kebutuhan bisnis Anda berubah.",
      },
    ],
  },

  works: {
    label: "(Portofolio)",
    heading: "Produk Terbaru",
    labels: {
      year: "Tahun",
      role: "Peran",
      services: "Teknologi & Capability",
    },
    items: [
      {
        id: 1,
        title: "BSJ7 Shop",
        year: "2025",
        role: "Headless E-Commerce & Marketplace",
        services: ["Next.js", "Multi-Vendor", "Search API"],
        description:
          "Platform marketplace multi-vendor di Malaysia yang menyatukan pencarian dan transaksi dari berbagai toko terverifikasi dalam satu pengalaman.",
        slug: "bsj7-shop",
      },
      {
        id: 2,
        title: "Barcode Gokart",
        year: "2025",
        role: "Online Reservation & Booking System",
        services: ["Next.js", "Midtrans Payment", "24/7 Booking"],
        description:
          "Website dan sistem reservasi online 24/7 untuk sirkuit go-kart indoor premium di Jakarta, memungkinkan pelanggan melakukan booking tanpa proses manual.",
        slug: "barcode-gokart",
      },
      {
        id: 3,
        title: "Jomterbang",
        year: "2025",
        role: "Travel Marketplace & Aggregator API",
        services: ["Next.js", "Umrah Travel", "Package Aggregator"],
        description:
          "Platform aggregator travel umrah di Malaysia yang menghubungkan berbagai agensi resmi dengan calon jemaah melalui satu sistem.",
        slug: "jomterbang",
      },
      {
        id: 4,
        title: "Vidiolab AI",
        year: "2026",
        role: "Multimodal AI SaaS Architecture",
        services: ["Next.js", "AI Video Models", "Stripe & Xendit"],
        description:
          "Platform SaaS AI video yang mengintegrasikan empat mesin AI generatif dalam satu produk dan pengalaman langganan.",
        slug: "vidiolab-ai",
      },
      {
        id: 5,
        title: "Omnichannel CRM",
        year: "2026",
        role: "SaaS Dashboard & Messaging API",
        services: ["Next.js", "WhatsApp API", "CRM Automation"],
        description:
          "Sistem CRM omnichannel untuk mengelola kontak, broadcast, automasi WhatsApp, dan bot AI dalam satu dashboard.",
        slug: "omnichannel-crm",
      },
    ],
  },

  services: {
    label: "(Yang Kami Bangun)",
    heading: "Dari Masalah Operasional Menjadi Software",
    tabs: [
      {
        id: "software",
        label: "Platform & Software Custom",
        description:
          "Ketika proses bisnis sudah terlalu kompleks untuk dikelola dengan tools yang ada, kami membangun software yang dirancang mengikuti cara bisnis Anda bekerja.",
        features: [
          "Portal Web & Klien",
          "Sistem Bisnis Internal",
          "Platform SaaS",
          "Dashboard & Reporting",
        ],
      },
      {
        id: "ai",
        label: "AI & Otomasi Bisnis",
        description:
          "Kami menggunakan AI untuk mengurangi pekerjaan repetitif dan mempercepat proses yang sebelumnya membutuhkan banyak waktu manusia.",
        features: [
          "Otomasi Workflow",
          "Pemrosesan Dokumen",
          "Knowledge Base Internal",
          "Customer Support Berbasis AI",
        ],
      },
      {
        id: "systems",
        label: "Sistem & Integrasi",
        description:
          "Kami menghubungkan tools yang sudah Anda gunakan dan menggantikan proses yang masih bergantung pada Excel, WhatsApp, atau sistem lama dengan workflow yang lebih terintegrasi.",
        features: [
          "Integrasi API & Pihak Ketiga",
          "Otomasi Proses Manual",
          "Data Pipeline",
          "Modernisasi Sistem Lama",
        ],
      },
      {
        id: "partnership",
        label: "Engineering Berkelanjutan",
        description:
          "Setelah software berjalan, kebutuhan bisnis tidak berhenti. Kami tetap tersedia untuk pengembangan fitur, perbaikan, monitoring, dan kebutuhan engineering berikutnya.",
        features: [
          "Pengembangan Fitur",
          "Monitoring & Maintenance",
          "Dukungan Prioritas",
          "Perencanaan Roadmap",
        ],
      },
    ],
  },

  team: {
    label: "(Tim Kami)",
    preHeading: "Meet Nahra",
    heading: "Langsung Bekerja dengan Orang yang Membangun Software Anda",
    bio: "Nahra adalah tim lima engineer dan desainer senior yang sejak 2023 bekerja sebagai partner engineering untuk bisnis yang berkembang dan agensi. Kami bekerja langsung dengan orang yang memahami masalahnya, mengambil tanggung jawab atas eksekusi, dan tetap terlibat setelah software dirilis.",
    timeline: [
      { role: "Berdiri", period: "2023" },
      { role: "Jumlah Tim", period: "5 Orang" },
      { role: "Produk Dirilis", period: "6+" },
      {
        role: "Fokus Utama",
        period: "Software Custom, AI & Otomasi, Integrasi Sistem",
      },
    ],
  },

  engagement: {
    label: "(Cara Kami Bekerja)",
    heading: "Satu Tim Engineering. Sesuai Kebutuhan Anda.",
    plans: [
      {
        id: "project",
        name: "Bangun",
        description:
          "Untuk bisnis yang membutuhkan platform, sistem internal, atau produk baru dengan tujuan dan scope yang jelas.",
        delivery: "Berbasis Proyek",
        highlightLabel: "Sangat cocok untuk",
        highlight: "Produk baru, platform, dan rebuild sistem",
        features: [
          "Scope & timeline yang jelas",
          "Akses langsung ke tim eksekusi",
          "Dikerjakan oleh praktisi senior",
          "Pendampingan hingga rilis",
        ],
        cta: "Diskusikan Proyek Anda",
        highlighted: false,
      },
      {
        id: "retainer",
        name: "Kembangkan",
        description:
          "Untuk bisnis yang sudah memiliki software dan membutuhkan engineering capacity secara berkelanjutan untuk terus berkembang.",
        delivery: "Kemitraan Bulanan",
        highlightLabel: "Sangat cocok untuk",
        highlight: "Platform aktif & kebutuhan engineering berkelanjutan",
        features: [
          "Pengembangan fitur baru",
          "Monitoring & maintenance",
          "Dukungan prioritas",
          "Scope fleksibel mengikuti roadmap",
        ],
        cta: "Diskusikan Kebutuhan Anda",
        highlighted: true,
      },
      {
        id: "agency",
        name: "Partner",
        description:
          "Untuk agensi yang ingin menerima proyek software tanpa harus membangun tim engineering sendiri. Anda tetap memegang client relationship — kami menangani eksekusinya.",
        delivery: "Per-proyek atau berkelanjutan",
        highlightLabel: "Sangat cocok untuk",
        highlight: "Agensi tanpa engineering team internal",
        features: [
          "Eksekusi engineering white-label",
          "Anda tetap menjadi contact person klien",
          "Scope fleksibel sesuai proyek",
          "Confidential secara default",
        ],
        cta: "Jadi Partner Engineering",
        highlighted: false,
      },
    ],
  },

  faq: {
    label: "(FAQ)",
    heading: "Pertanyaan yang Sering Ditanyakan",
    subheading:
      "Hal yang perlu Anda ketahui sebelum membangun software bersama Nahra.",
    items: [
      {
        id: 1,
        question: "Kenapa menggunakan external engineering team?",
        answer:
          "Karena Anda bisa mendapatkan kapasitas engineering senior tanpa harus membangun seluruh fungsi engineering sendiri — mulai dari hiring dan onboarding hingga pengelolaan tim dan pengembangan berkelanjutan.",
      },
      {
        id: 2,
        question:
          "Apakah Nahra cocok untuk bisnis yang sudah memiliki tim internal?",
        answer:
          "Ya. Kami juga dapat berfungsi sebagai extension team untuk membantu internal team mempercepat pengembangan, mengerjakan proyek tertentu, atau menangani kebutuhan engineering yang belum tercakup.",
      },
      {
        id: 3,
        question: "Apakah Nahra hanya mengerjakan website?",
        answer:
          "Fokus kami adalah software yang benar-benar digunakan untuk menjalankan atau mengembangkan bisnis — seperti sistem internal, customer portal, SaaS, dashboard, workflow automation, AI tools, dan integrasi antar sistem.",
      },
      {
        id: 4,
        question: "Bagaimana AI digunakan dalam proyek?",
        answer:
          "Kami menggunakan AI ketika memang bisa mengurangi pekerjaan manual, mempercepat proses, atau meningkatkan kemampuan sistem. Contohnya pemrosesan dokumen, knowledge internal, customer support, dan workflow automation.",
      },
      {
        id: 5,
        question: "Apakah Nahra tetap membantu setelah software dirilis?",
        answer:
          "Ya. Kami dapat terus terlibat dalam bentuk maintenance, monitoring, pengembangan fitur, integrasi, dan roadmap engineering berikutnya seiring kebutuhan bisnis berkembang.",
      },
      {
        id: 6,
        question: "Bagaimana cara memulai?",
        answer:
          "Ceritakan bisnis Anda, masalah yang sedang dihadapi, atau software yang ingin dibangun. Kami akan mulai dengan memahami konteks dan kebutuhan sebelum menentukan solusi yang paling masuk akal.",
      },
      {
        id: 7,
        question:
          "Kami agensi. Apakah bisa menggunakan Nahra secara white-label?",
        answer:
          "Bisa. Kami bekerja di belakang layar sebagai partner engineering Anda. Anda tetap memegang hubungan dengan klien, sementara kami menangani seluruh kebutuhan teknis sesuai scope yang disepakati.",
      },
    ],
  },

  contact: {
    label: "Mari Mulai",
    heading: "Ceritakan Masalah yang Ingin Anda Selesaikan.",
    subheading:
      "Tidak harus sudah tahu software apa yang harus dibangun. Ceritakan bagaimana bisnis Anda berjalan dan apa yang sedang menghambatnya — kami akan membantu menentukan apa yang perlu dibangun, diotomasi, atau diperbaiki.",
    email: "hello@nahra.tech",
    whatsapp: {
      display: "+62 812-0000-0000",
      href: "https://wa.me/6281200000000",
    },
    ctas: [
      { label: "Diskusi dengan Engineer", href: "mailto:hello@nahra.tech" },
      { label: "Diskusi via WhatsApp", href: "https://wa.me/6281200000000" },
    ],
    form: {
      nameLabel: "Nama Anda",
      namePlaceholder: "Masukkan nama Anda",
      emailLabel: "Email Anda",
      emailPlaceholder: "Masukkan email Anda",
      messageLabel: "Deskripsi Proyek",
      messagePlaceholder: "Ketik di sini...",
      submitLabel: "Kirim Sekarang",
    },
  },
};
