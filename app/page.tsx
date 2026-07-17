import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import EventDetails from "@/components/sections/EventDetails";
import Registration from "@/components/sections/Registration";
import FAQ from "@/components/sections/FAQ";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <EventDetails />
        <Registration />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
