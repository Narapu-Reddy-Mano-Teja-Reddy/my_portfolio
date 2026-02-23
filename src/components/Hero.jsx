import React, { useState, useEffect } from "react";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { motion } from "framer-motion";
import { personalInfo } from "../constants";

/* ── Animated mobile hero fallback (shows when 3D canvas is skipped) ── */
const MobileHeroVisual = () => (
  <div className="flex-1 flex items-center justify-center mt-8">
    <div className="relative w-48 h-48">
      {/* Outer rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border-2 border-violet-500 border-dashed opacity-60"
      />
      {/* Middle ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-4 rounded-full border-2 border-cyan-400 border-dotted opacity-50"
      />
      {/* Pulsing center */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-8 rounded-full green-pink-gradient flex items-center justify-center shadow-lg shadow-violet-500/40"
      >
        {/* AI icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="w-12 h-12"
        >
          <path d="M12 2a2 2 0 012 2v1a7 7 0 017 7v1h-2v-1a5 5 0 00-5-5h-1V6a2 2 0 01-2-2zm0 4H8a5 5 0 00-5 5v1H1v-1a7 7 0 017-7h4zM3 14v1a5 5 0 005 5h1v1a2 2 0 01-2 2 2 2 0 01-2-2v-1a7 7 0 01-7-7v-1h2zm18 0h2v1a7 7 0 01-7 7v1a2 2 0 01-2 2 2 2 0 01-2-2v-1h1a5 5 0 005-5v-1zm-9 2a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </motion.div>
      {/* Floating dots */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.25 }}
          className="absolute w-2 h-2 rounded-full bg-violet-400"
          style={{
            top: `${50 - 42 * Math.cos((deg * Math.PI) / 180)}%`,
            left: `${50 + 42 * Math.sin((deg * Math.PI) / 180)}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  </div>
);

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      {isMobile ? (
        /* ─── Mobile Layout: stacked column ─── */
        <div
          className={`${styles.paddingX} h-full flex flex-col justify-center items-start pt-20 pb-10 max-w-7xl mx-auto`}
        >
          {/* Accent line + text */}
          <div className="flex flex-row items-center gap-4 mb-6">
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-violet-500" />
              <div className="w-0.5 h-20 violet-gradient" />
            </div>
            <div>
              <h1 className="text-white font-black text-[36px] leading-tight">
                Hi, I'm{" "}
                <span className="text-violet-400">{personalInfo.name}</span>
              </h1>
              <p className="text-secondary text-[14px] mt-2 leading-relaxed">
                Building AI-powered digital products &amp; websites that scale
                globally.
              </p>
            </div>
          </div>

          {/* Animated visual */}
          <MobileHeroVisual />
        </div>
      ) : (
        /* ─── Desktop Layout: original overlay on top of 3D canvas ─── */
        <>
          <div
            className={`${styles.paddingX} absolute inset-0 flex flex-row items-center justify-center gap-5 max-w-7xl mx-auto`}
          >
            <div className="flex flex-col justify-center items-center mt-5">
              <div className="w-5 h-5 rounded-full bg-electric-purple" />
              <div className="w-1 sm:h-80 h-40 violet-gradient" />
            </div>
            <div>
              <h1 className={`${styles.heroHeadText} text-white`}>
                Hi, I'm{" "}
                <span className="text-electric-purple">{personalInfo.name}</span>
              </h1>
              <p className={`${styles.heroSubText} text-white-100 mt-2`}>
                Building AI-powered digital products and{" "}
                <br className="sm:block hidden" />
                websites that scale globally.
              </p>
            </div>
          </div>
          <ComputersCanvas />
        </>
      )}

      {/* Scroll indicator — always visible */}
      <div className="absolute xs:bottom-2 bottom-8 w-full flex justify-center items-center z-10">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
