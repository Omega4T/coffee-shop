
import SmoothScroller from "@/components/SmoothScroller";
import Navbar from "@/components/NavbarSection";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MenuSection from "@/components/MenuSection";
import GallerySection from "@/components/GallerySection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-white font-sans">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <GallerySection />
      <LocationSection />
      <Footer />
      <SmoothScroller />
    </main>
  );
}
