import PageEffects from "@/components/PageEffects";
import SmoothScroll from "@/components/SmoothScroll";
import BeforeAfterSection from "@/components/sections/BeforeAfterSection";
import Closing from "@/components/sections/Closing";
import Contact from "@/components/sections/Contact";
import Faq from "@/components/sections/Faq";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Included from "@/components/sections/Included";
import Industries from "@/components/sections/Industries";
import Overlays from "@/components/sections/Overlays";
import Packages from "@/components/sections/Packages";
import Promo from "@/components/sections/Promo";
import Reach from "@/components/sections/Reach";
import Services from "@/components/sections/Services";
import Stack from "@/components/sections/Stack";
import Testimonials from "@/components/sections/Testimonials";
import Work from "@/components/sections/Work";
import { JSON_LD } from "@/lib/data";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <Header />
      <main data-screen-label="Home" className="min-h-screen bg-bg text-ink">
        <Hero />
        <Reach />
        <Work />
        <BeforeAfterSection />
        <Promo />
        <Industries />
        <Services />
        <Included />
        <Stack />
        <Packages />
        <Testimonials />
        <Contact />
        <Faq />
        <Closing />
      </main>
      <Overlays />
      <PageEffects />
      <SmoothScroll />
    </>
  );
}
