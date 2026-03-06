import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import GetStarted from "@/components/GetStarted";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Pricing />
      <GetStarted />
      <Footer />
    </main>
  );
}
