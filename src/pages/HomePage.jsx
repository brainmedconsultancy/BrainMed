import AboutSection from "../components/AboutSection";
import CollegesSection from "../components/CollegesSection";
import ContactSection from "../components/ContactSection";
import CountriesSection from "../components/CountriesSection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import McaChatFaqSection from "../components/McaChatFaqSection";
import Navbar from "../components/Navbar";
import ServicesSection from "../components/ServicesSection";
import TeamSection from "../components/TeamSection";
import TestimonialsSection from "../components/TestimonialsSection";

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <CountriesSection />
        <CollegesSection />
        <McaChatFaqSection />
        <TestimonialsSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
