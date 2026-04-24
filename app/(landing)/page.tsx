import { TopNav } from "./_components/TopNav";
import { Hero } from "./_components/Hero";
import { WhyBroken } from "./_components/WhyBroken";
import { HowItWorks } from "./_components/HowItWorks";
import { Demo } from "./_components/Demo";
import { Features } from "./_components/Features";
import { CTA } from "./_components/CTA";
import { Footer } from "./_components/Footer";

export default function LandingPage() {
  return (
    <>
      <TopNav />
      <Hero />
      <WhyBroken />
      <HowItWorks />
      <Demo />
      <Features />
      <CTA />
      <Footer />
    </>
  );
}
