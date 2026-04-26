import AboutSection from "../components/sections/AboutSection";
import CallbackPopup from "../components/modals/CallbackPopup";
import ContactSection from "../components/sections/ContactSection";
import CountriesSection from "../components/sections/CountriesSection";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/sections/HeroSection";
import MbbsChatFaqSection from "../components/sections/MbbsChatFaqSection";
import Navbar from "../components/layout/Navbar";
import ServicesSection from "../components/sections/ServicesSection";
import TeamSection from "../components/sections/TeamSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import VideoIntroductionSection from "../components/sections/VideoIntroductionSection";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function HomePage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [hash]);

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <CallbackPopup />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <CountriesSection />
        <VideoIntroductionSection instagramReelUrl="https://www.instagram.com/reel/DLzrLKURCKN/" />
        <TestimonialsSection />
        <MbbsChatFaqSection />
        <ContactSection />
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
}
