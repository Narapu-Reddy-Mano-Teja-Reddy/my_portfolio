import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Tech from "./components/Tech";
import Works from "./components/Works";
import Contact from "./components/Contact";
import { StarsCanvas } from "./components/canvas";
import HireMe from "./components/HireMe";
import Intro from "./components/Intro";
import CustomCursor from "./components/CustomCursor";
import ProjectsPage from "./components/ProjectsPage";
import CertificationsPage from "./components/CertificationsPage";
import Chatbot from "./components/Chatbot";
import Preloader from "./components/Preloader";
import { publicUrls } from "./constants";

const MainContent = () => (
  <div className="relative z-0 bg-primary">
    <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
      <Navbar />
      <Hero />
    </div>
    <About />
    <Experience />
    <Tech />
    <Works />
    <div className="relative z-0">
      <Contact />
      <StarsCanvas />
    </div>
  </div>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(false);

  return (
    <BrowserRouter>
      {/* Custom Global Cursor - Removed as per request */}
      {/* <CustomCursor /> */}

      {/* Preloader */}
      <AnimatePresence mode='wait'>
        {isLoading && (
          <Preloader
            onComplete={() => {
              setIsLoading(false);
              setShowIntro(true);
            }}
          />
        )}
      </AnimatePresence>

      {/* Intro Overlay */}
      {(!isLoading && showIntro) && <Intro onComplete={() => setShowIntro(false)} />}

      {/* Chatbot */}
      {!isLoading && !showIntro && <Chatbot />}

      {/* Global Hire Me Button */}
      {!isLoading && !showIntro && <HireMe />}

      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/projects" element={<> <Navbar /> <ProjectsPage /> </>} />
        <Route path="/certifications" element={<> <Navbar /> <CertificationsPage /> </>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
