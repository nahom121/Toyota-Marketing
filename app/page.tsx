import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";

const About = dynamic(() => import("@/components/sections/About"));
const EventDetails = dynamic(() => import("@/components/sections/EventDetails"));
const Registration = dynamic(() => import("@/components/sections/Registration"));
const FAQ = dynamic(() => import("@/components/sections/FAQ"));

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
