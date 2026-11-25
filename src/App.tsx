import React, { useCallback, useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectItem } from './data/studioData';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ShowcaseMarquee } from './components/ShowcaseMarquee';
import { SelectedWorks } from './components/SelectedWorks';
import { ServicesSection } from './components/ServicesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { FooterSection } from './components/FooterSection';
import { ContactOverlay } from './components/ContactOverlay';
import { ProjectModal } from './components/ProjectModal';

export default function App() {
  const [heroReady, setHeroReady] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [archiveOpen, setArchiveOpen] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setHeroReady(true);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  }, []);

  useEffect(() => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNavigate = useCallback((sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#f8eee8] text-black relative overflow-x-clip">
      {/* Opening Two26 Serpentine Stroke Preloader */}
      <Preloader onComplete={handlePreloaderComplete} />

      {/* Fixed Navigation Header */}
      <Navbar
        onOpenContact={() => setContactOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Full Homepage Sections in Exact Reference Order */}
      <main className="w-full">
        {/* Section 1: Hero + Curved Marquee Ribbon */}
        <HeroSection ready={heroReady} />

        {/* Section 2: About Us Pinned Manifesto */}
        <AboutSection />

        {/* Studio Visual Showcase Marquee */}
        <ShowcaseMarquee />

        {/* Section 3: Selected Works (6 Featured Projects + Projects End Teaser) */}
        <SelectedWorks
          onSelectProject={(proj) => {
            setArchiveOpen(false);
            setActiveProject(proj);
          }}
          onSeeAllProjects={() => {
            setActiveProject(null);
            setArchiveOpen(true);
          }}
        />

        {/* Section 4: Services (Winding Scroll-Drawn Path + All 7 Lottie Services) */}
        <ServicesSection />

        {/* Section 5: Testimonials (Orange Stage + Interactive 5-Card Stacked Deck) */}
        <TestimonialsSection />

        {/* Section 6: FAQ (Sticky Cat Left + 10 Animated Chat-Bubble Q&As Right) */}
        <FaqSection />
      </main>

      {/* Section 7: Full-Viewport Orange Contact Footer */}
      <FooterSection
        onOpenContact={() => setContactOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Fullscreen Orange Contact Overlay */}
      <ContactOverlay
        open={contactOpen}
        onClose={() => setContactOpen(false)}
      />

      {/* Interactive Case Study & All Projects Archive Modal */}
      <ProjectModal
        project={activeProject}
        archiveOpen={archiveOpen}
        onClose={() => {
          setActiveProject(null);
          setArchiveOpen(false);
        }}
        onSelectProject={(proj) => {
          setArchiveOpen(false);
          setActiveProject(proj);
        }}
        onOpenContact={() => setContactOpen(true)}
      />
    </div>
  );
}
