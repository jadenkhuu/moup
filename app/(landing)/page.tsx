import { TopNav } from "./_components/TopNav";
import { Hero } from "./_components/Hero";
import { WhyBroken } from "./_components/WhyBroken";
import { HowItWorks } from "./_components/HowItWorks";
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
      <Features />
      <CTA />
      <Footer />
    </>
  );
}
