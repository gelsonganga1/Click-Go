import Navbar from "./components/Navbar";
import Hero from "./components/hero";
import Features from "./components/Feature";
import HowItWorks from "./components/HowItWork";
import BenefitsSection from "./components/benefits";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <BenefitsSection />
    </main>
  );
}
