import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import WhyChooseMe from "@/components/sections/WhyChooseMe";
import Vehicles from "@/components/sections/Vehicles";
import Testimonials from "@/components/sections/Testimonials";
import LifetimeWarranty from "@/components/sections/LifetimeWarranty";
import TradeIn from "@/components/sections/TradeIn";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import ExitIntentPopup from "@/components/ExitIntentPopup";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <WhyChooseMe />
        <Vehicles />
        <LifetimeWarranty />
        <Testimonials />
        <TradeIn />
        <About />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
      <ExitIntentPopup />
    </>
  );
}
