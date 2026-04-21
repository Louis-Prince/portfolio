import HeroSection from '@/components/portfolio/HeroSection';
import AboutSection from '@/components/portfolio/AboutSection';
import ContactSection from '@/components/portfolio/ContactSection';
import VirtualSecretary from '@/components/portfolio/VirtualSecretary';

export default function Index() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <ContactSection />
      <VirtualSecretary />
    </main>
  );
}