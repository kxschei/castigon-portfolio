import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BentoAbout from "@/components/BentoAbout";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certificates from "@/components/Certificates";
import ResumeSection from "@/components/ResumeSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Ambient accent glow behind the whole page (styles: .bg-glow in globals.css) */}
      <div aria-hidden className="bg-glow print:hidden" />
      <Preloader />
      <Navbar />
      <main className="overflow-x-clip">
        <Hero />
        <BentoAbout />
        <Skills />
        <Projects />
        <Experience />
        <Certificates />
        <ResumeSection />
      </main>
      <Footer />
    </>
  );
}
