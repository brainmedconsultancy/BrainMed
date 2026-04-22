import AboutSection from "../components/AboutSection";
import CollegesSection from "../components/CollegesSection";
import ContactSection from "../components/ContactSection";
import CountriesSection from "../components/CountriesSection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import MbbsChatFaqSection from "../components/MbbsChatFaqSection";
import Navbar from "../components/Navbar";
import ServicesSection from "../components/ServicesSection";
import TeamSection from "../components/TeamSection";
import TestimonialsSection from "../components/TestimonialsSection";
import VideoIntroductionSection from "../components/VideoIntroductionSection";

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <CountriesSection />
        {/* <CollegesSection /> */}
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
