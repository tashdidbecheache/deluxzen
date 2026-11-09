export const WHATSAPP_URL =
  "https://wa.me/8801316986654?text=Hi%20Deluxzen%2C%20I%20want%20a%20website%20for%20my%20business.";
export const PHONE_TEL = "tel:+8801316986654";
export const PHONE_LABEL = "+880 1316 986654";
export const EMAIL = "hello@deluxen.studio";

export const ACCENT = "#F81048";

export const NAV_ITEMS = [
  { label: "Work", href: "#work", icon: "layout-grid" },
  { label: "Before & after", href: "#before-after", icon: "columns-2" },
  { label: "Industries", href: "#industries", icon: "building-2" },
  { label: "Services", href: "#services", icon: "layers" },
  { label: "Pricing", href: "#packages", icon: "tag" },
  { label: "Reviews", href: "#testimonials", icon: "star" },
  { label: "Contact", href: "#contact", icon: "message-circle" },
  { label: "FAQ", href: "#faq", icon: "circle-help" },
] as const;

const stripItems = [
  "Hospitals",
  "Clinics",
  "Diagnostic Centres",
  "Gyms",
  "Fitness Studios",
  "Corporate Companies",
  "Real Estate",
  "Restaurants",
  "Schools",
  "Hotels",
  "Retail",
  "Startups",
];
export const INDUSTRY_STRIP = [...stripItems, ...stripItems];

export type WorkSite = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  href?: string;
  description: string;
};

export const WORK: WorkSite[] = [
  { id: "botengineers", title: "Bot Café", subtitle: "Robotics co-working space · Bangladesh", image: "/assets/work-botengineers.png", href: "https://www.botengineersbd.com/bot-cafe", description: "Store, Bot Café workspace bookings, academy and 3D printing services under one site." },
  { id: "magnolia", title: "Magnolia Properties", subtitle: "Real estate developer · Dhaka", image: "/assets/work-magnolia-home.png", href: "https://magnoliaproperties.com/", description: "Project showcase, property search and enquiry flow for premium apartments." },
  { id: "donefind", title: "Donefind", subtitle: "Commercial cleaning matching · US, UK, AU, NZ", image: "/assets/work-donefind.png", href: "https://donefind.com/", description: "Lead-generation site that matches businesses with local cleaning companies." },
  { id: "mongoltori", title: "BRACU Mongol-Tori", subtitle: "Mars rover team · BRAC University", image: "/assets/work-mongoltori.png", href: "https://bracu-mongoltori.com/", description: "Team site for rovers, competitions, research and sponsors, with a live video feed." },
  { id: "botengineers-shop", title: "Bot Engineers Shop", subtitle: "Robotics component store · Bangladesh", image: "/assets/work-botengineers-shop.png", href: "https://www.botengineersbd.com/", description: "Component catalogue with category browsing, search and member-only checkout." },
  { id: "kazi-afridi", title: "Kazi Sharfaraz Afridi", subtitle: "Visual storyteller portfolio · Sweden", image: "/assets/work-kazi-afridi.png", description: "Personal portfolio for a Jönköping-based visual storyteller, with a bold type-led hero and full-bleed imagery." },
  { id: "sitexzen-one", title: "Sitexzen One", subtitle: "AI business agents SaaS · UK", image: "/assets/work-sitexzen-one.png", href: "https://one.sitexzen.com/", description: "Product site for four AI agents that handle calls, chat, bookings and reviews." },
  { id: "appbaksho", title: "Appbaksho", subtitle: "Software and web development studio · Bangladesh", image: "/assets/work-appbaksho.png", href: "https://appbaksho.com/", description: "Studio site for web apps, SaaS and automation work, with services, process, tech stack and proven performance numbers." },
];

const indReds = ["#F81048", "#9E0A2E", "#D10A3B", "#5C0318", "#E3123F", "#7A0620", "#C8073A", "#B8002E"];

const indData = [
  { name: "Healthcare", who: "Hospitals, clinics, diagnostic centres", desc: "Doctor profiles, department pages, online appointment booking and test price lists. Patients find the right doctor and book in minutes.", tags: ["Appointment booking", "Doctor profiles", "Emergency contacts"], img: "/assets/photos/healthcare-ward.jpg" },
  { name: "Fitness", who: "Gyms, yoga and fitness studios", desc: "Class schedules, membership plans, trainer profiles and free-trial sign-ups that bring new members through the door.", tags: ["Membership plans", "Class timetable", "Free trial form"], img: "/assets/photos/gym.jpg" },
  { name: "Corporate", who: "Corporate companies", desc: "A company profile that wins tenders, partners and talent: services, leadership, certifications, careers and news.", tags: ["Company profile", "Careers page", "Investor and client trust"], img: "/assets/photos/office.jpg" },
  { name: "Real estate", who: "Developers, agents, brokerages", desc: "Project pages, property listings, approvals on display and site-visit booking for buyers who need to trust before they invest.", tags: ["Project showcase", "Listings", "Site-visit booking"], img: "/assets/photos/gulshan-lakeview.jpg" },
  { name: "Restaurants", who: "Restaurants and cafés", desc: "Mouth-watering menus, table reservations and links to your delivery apps.", tags: ["Online menu", "Reservations", "Google Maps"], img: "/assets/photos/restaurant.jpg" },
  { name: "Education", who: "Schools, colleges, coaching centres", desc: "Admission information, courses, faculty, notices and enquiry forms parents can use from their phone.", tags: ["Admissions", "Course pages", "Notice board"], img: "/assets/photos/school.jpg" },
  { name: "Hotels", who: "Hotels and travel", desc: "Room galleries, amenities, offers and direct booking enquiries, so guests book with you, not through a middleman.", tags: ["Room showcase", "Direct booking", "Reviews"], img: "/assets/photos/hotel.jpg" },
  { name: "Retail", who: "Retail and e-commerce", desc: "Online stores with secure payments (bKash, SSLCommerz, Stripe), delivery tracking and an easy product editor.", tags: ["Online store", "Secure payments", "Order management"], img: "/assets/photos/retail.jpg" },
];

export type Spread = {
  id: string;
  label: string;
  alt: string;
  image: string;
  paper: string;
  notes: { x: number; y: number; w: number; rotate: number; bg: string; color: string; title: string; kicker: string; body: string }[];
  tags: string[];
  tagsAt: { x: number; y: number; w: number; rotate: number };
};

export const IND_SPREADS: Spread[] = indData.map((d, i) => ({
  id: "ind-" + i,
  label: d.name,
  alt: d.name + ": " + d.who,
  image: d.img,
  paper: "#1A0509",
  notes: [{ x: 4.5, y: 7, w: 36, rotate: i % 2 ? 1.5 : -1.8, bg: indReds[i % indReds.length], color: "#FFFFFF", title: d.name, kicker: d.who, body: d.desc }],
  tags: d.tags,
  tagsAt: { x: 56, y: 76, w: 40, rotate: i % 2 ? -1.2 : 1.2 },
}));

export const INCLUDED = [
  "Mobile-first design that looks perfect on every phone",
  "Loads in under 2 seconds",
  "WhatsApp chat & AI chat button",
  "Contact and enquiry forms",
  "Google Maps and business location",
  "Professional SEO setup for Google",
  "Free SSL security certificate (https)",
  "English and Bangla (or any language you need)",
  "30 days of free support after launch",
];

export const COMMITMENTS = [
  { pre: "< ", v: 2, suf: "s", label: "Load time on every page we ship", tone: "r" },
  { pre: "", v: 24, suf: "h", label: "Reply time to every enquiry", tone: "b" },
  { pre: "", v: 3, suf: " wks", label: "From first call to launch", tone: "w" },
  { pre: "", v: 100, suf: "%", label: "You own your website, domain and content", tone: "b" },
] as const;

const stackTools = [
  ["Next.js", "React framework / Edge UI", "nextdotjs"],
  ["Payload CMS", "Headless CMS", "payloadcms"],
  ["Node.js", "JavaScript runtime", "nodedotjs"],
  ["NestJS", "Enterprise Node.js", "nestjs"],
  ["PostgreSQL", "Relational database", "postgresql"],
  ["Prisma", "Next-gen ORM", "prisma"],
  ["MongoDB", "NoSQL database", "mongodb"],
  ["Redis", "In-memory caching", "redis"],
  ["Medusa.js", "Open-source commerce", "medusa"],
  ["Python", "Data logic / AI compute", "python"],
  ["Local LLMs", "Private AI agents", "openai"],
  ["GSAP", "High-performance animation", "greensock"],
  ["ROS2", "Robot operating system", "ros"],
].map(([name, eyebrow, slug]) => ({ name, eyebrow, logo: `/assets/icons/si-${slug}-FFFFFF.svg` }));

const repeat = <T,>(arr: T[], n: number) => Array.from({ length: n }, () => arr).flat();
const half = Math.ceil(stackTools.length / 2);
export const STACK_WALL_A = repeat(stackTools.slice(0, half), 6);
export const STACK_WALL_B = repeat(stackTools.slice(half), 6);

export const PACKAGES = [
  {
    name: "Starter", price: "$100", blurb: "For freelancers, creators and personal brands",
    items: ["One-page portfolio", "7–8 sections", "You provide the content", "Contact form & WhatsApp", "Live in 5–7 days"],
    theme: "light", cta: "Get Started",
  },
  {
    name: "Business", price: "$300", blurb: "For small businesses and growing brands",
    items: ["Up to 5 pages", "Up to 30 sections", "Easy content CMS", "Any language you prefer", "Live in 10–15 days"],
    theme: "maroon", cta: "Get Started",
  },
  {
    name: "Professional", price: "$500", blurb: "For studios, agencies and established companies",
    items: ["Up to 8 pages", "Up to 48 sections", "Content editor (CMS)", "Any language you prefer", "WhatsApp & Meta Pixel"],
    theme: "red", cta: "Get Started", badge: "★ Most popular",
  },
  {
    name: "Premium", price: "$1,000", blurb: "For brands that need more than a portfolio",
    items: ["Unlimited pages", "3D motion & interactions", "Storytelling & full SEO", "E-commerce, CMS & HRM", "Live in about a month"],
    theme: "dark", cta: "Get a Custom Quote",
  },
] as const;

const tmClients = ["Happy clients from Deluxzen", "Magnolia Properties", "Sitexzen One", "Appbaksho", "Bot Engineers", "Visyouals"];
export const TM_STRIP = repeat(tmClients, 4);

export type Testimonial = {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  logo: string;
  logoImg?: string;
  logoH?: string;
  logoFont?: string;
  logoWeight?: number;
  logoSize?: string;
  logoTrack?: string;
  logoCase?: "uppercase" | "none";
};

const tmOne: Testimonial[] = [
  { name: "Ahmed Saikat", role: "Magnolia Properties", avatar: "/assets/avatar-ahmed.jpg", logo: "Magnolia", logoImg: "/assets/logo-magnolia.png", logoH: "78px", quote: "Our listings finally look as good as the properties. Buyers land on the site, browse the projects and call us already knowing what they want." },
  { name: "Sifat", role: "Sitexzen One", avatar: "/assets/avatar-sifat.jpg", logo: "Sitexzen", logoImg: "/assets/logo-sitexzen.svg", logoH: "44px", quote: "They took our rough idea and turned it into a clean, fast site in days. Every change we asked for was handled quickly and without fuss." },
  { name: "Muztahid Rahman", role: "Appbaksho", avatar: "/assets/avatar-mujtahid.jpg", logo: "appbaksho", logoImg: "/assets/logo-appbaksho.svg", logoH: "68px", quote: "Deluxzen builds every Appbaksho client site now. The pages load fast, read clearly on phones and are easy for clients to update themselves." },
  { name: "Sanjim Khan", role: "Bot Engineers", avatar: "/assets/avatar-sanjim.jpg", logo: "BOT Engineers", logoImg: "/assets/logo-botengineers.png", logoH: "66px", quote: "Our store has hundreds of components, and customers can find any part in seconds. Orders from the website have become our main channel." },
  { name: "Kazi Sharfaraz Afridi", role: "Visual storyteller, Sweden", avatar: "/assets/avatar-afridi.jpg", logo: "VISYOUALS", logoFont: "var(--font-bebas), sans-serif", logoWeight: 400, logoSize: "34px", logoTrack: ".01em", logoCase: "uppercase", quote: "My portfolio finally feels like my work: quiet, cinematic and fast. Clients in Sweden comment on the site before they mention the photos." },
];
export const TM_ITEMS = [...tmOne, ...tmOne].map((t, i) => ({ ...t, dir: (i % 2 ? "column" : "column-reverse") as "column" | "column-reverse" }));

export const FAQS = [
  { q: "How much does a portfolio website cost?", a: "It depends on the number of pages and features. Our packages start from $100. Send us a message and you'll get a fixed quote within 24 hours. No hidden costs." },
  { q: "What is a portfolio website, and who needs one?", a: "A portfolio website shows your best work, explains what you do and makes it easy for the right people to contact you. Businesses, studios, creators, consultants and professionals use one to win clients, investors and jobs." },
  { q: "Will my portfolio website show up on Google?", a: "Every Deluxzen website comes with professional SEO setup: page titles, descriptions, a sitemap, fast loading and mobile-first design, so Google can find and understand it. Rankings also depend on your content and competition, so we never promise a position." },
  { q: "How long does it take?", a: "Between 1 and 3 weeks, depending on the package and how quickly we receive your content." },
  { q: "Do I need to provide the content and photos?", a: "Share what you have. We help write the text and can arrange photography or suitable images." },
  { q: "Who owns the website?", a: "You do. The domain, website and content are all in your name." },
  { q: "Can patients, members or customers book online?", a: "Yes. We add appointment booking, class sign-ups, reservations or enquiry forms that go straight to your WhatsApp or email." },
  { q: "Will my website work on mobile phones?", a: "Yes. Every website is designed for mobile first, because most of your visitors will arrive on a phone." },
  { q: "Do you work with clients outside Bangladesh?", a: "Yes. We work with businesses in the UK, the USA, Canada and Sweden, and schedule calls in your timezone." },
  { q: "What happens after launch?", a: "You get 30 days of free support. After that, you can choose a monthly care plan for updates, security and SEO." },
  { q: "Who is behind Deluxzen?", a: "Deluxzen is a brand of Sitexzen Ltd, registered in England & Wales (Company No. 16554216). Our design studio is in Dhaka, and the same senior team handles every build." },
];

export const HERO_ASCII = { renderMode: "dither", bgMode: "none", mono: "#F81048", cellSize: 9, contrast: 158, density: 20, animated: true, animStyle: "pulse" };
export const CTA_ASCII = { ...HERO_ASCII, mono: "#0A0305" };

export const JSON_LD = [
  { "@context": "https://schema.org", "@type": "ProfessionalService", "@id": "https://deluxen.studio/#agency", name: "Deluxzen", description: "Portfolio website design agency. Custom, fast portfolio websites for businesses, creators and professionals.", url: "https://deluxen.studio/", email: "hello@deluxen.studio", telephone: "+8801316986654", priceRange: "$100 - $1,000", areaServed: ["United Kingdom", "United States", "Canada", "Sweden"], parentOrganization: { "@type": "Organization", name: "Sitexzen Ltd", identifier: "16554216" }, knowsAbout: ["Portfolio website design", "Web design", "Web development", "Search engine optimisation"], hasOfferCatalog: { "@type": "OfferCatalog", name: "Portfolio website packages", itemListElement: PACKAGES.map((p) => ({ "@type": "Offer", name: p.name, price: p.price.replace(/[$,]/g, ""), priceCurrency: "USD", itemOffered: { "@type": "Service", name: p.name + " portfolio website" } })) } },
  { "@context": "https://schema.org", "@type": "WebSite", "@id": "https://deluxen.studio/#website", name: "Deluxzen", url: "https://deluxen.studio/", publisher: { "@id": "https://deluxen.studio/#agency" } },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
];
