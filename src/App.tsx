import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { AboutSection } from './components/AboutSection';
import { WorkSection } from './components/WorkSection';
import { ProjectModal } from './components/ProjectModal';
import { AdCreativesArchive } from './components/AdCreativesArchive';
import { ContactSection } from './components/ContactSection';
import { PdfRequestModal } from './components/PdfRequestModal';
import { PdfDeckViewerModal } from './components/PdfDeckViewerModal';
import { Project } from './types';
import { PROJECTS } from './data/portfolioData';

function MainPortfolioContent() {
  const { palette } = useTheme();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [pdfDeckOpen, setPdfDeckOpen] = useState(false);
  const [pdfDeckInitialPage, setPdfDeckInitialPage] = useState<number>(1);

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenPdfDeck = (page: number = 1) => {
    setPdfDeckInitialPage(page);
    setPdfDeckOpen(true);
  };

  const handleSelectProjectById = (id: string) => {
    const found = PROJECTS.find((p) => p.id === id);
    if (found) {
      setSelectedProject(found);
    }
  };

  return (
    <div
      className="min-h-screen w-full transition-colors duration-300 flex flex-col selection:bg-white selection:text-black font-sans"
      style={{
        backgroundColor: palette.bg,
        color: palette.text,
      }}
    >
      {/* Top Navbar with PDF Presentation & PDF Download */}
      <Navbar
        onOpenPdfModal={() => setPdfModalOpen(true)}
        onOpenPdfDeck={() => handleOpenPdfDeck(1)}
      />

      {/* Hero Section */}
      <Hero
        onScrollToSection={handleScrollToSection}
        onOpenPdfDeck={() => handleOpenPdfDeck(1)}
      />

      {/* Infinite Rolling Marquee */}
      <Marquee />

      {/* About Section matching PDF Page 2 Profile & Gauge Bars */}
      <AboutSection onSelectProjectById={handleSelectProjectById} />

      {/* Selected Work Section */}
      <WorkSection
        onSelectProject={(project) => setSelectedProject(project)}
        onScrollToAds={() => handleScrollToSection('ads')}
      />

      {/* Performance Ad Creatives Archive */}
      <AdCreativesArchive />

      {/* Expanding Contact Footer */}
      <ContactSection onOpenPdfModal={() => setPdfModalOpen(true)} />

      {/* Project Case Study Lightbox Modal with PDF P.3-15 showcases */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(p) => setSelectedProject(p)}
        onOpenPdfDeck={handleOpenPdfDeck}
      />

      {/* PDF Portfolio Request Modal */}
      <PdfRequestModal
        isOpen={pdfModalOpen}
        onClose={() => setPdfModalOpen(false)}
      />

      {/* 15-Page PDF Deck Presentation Viewer Modal */}
      <PdfDeckViewerModal
        isOpen={pdfDeckOpen}
        initialPage={pdfDeckInitialPage}
        onClose={() => setPdfDeckOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainPortfolioContent />
    </ThemeProvider>
  );
}
