import React from "react";
import { motion } from "framer-motion";
import { personalInfo, publicUrls } from "../constants";

const HireMe = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="fixed left-4 bottom-4 z-50 flex flex-col items-center gap-4"
    >
      {/* Social Icons */}
      <div className="flex flex-col gap-3">
        {Object.keys(publicUrls.socialProfiles).map((key) => (
          <div
            key={key}
            onClick={() => window.open(publicUrls.socialProfiles[key].link, "_blank")}
            className="w-10 h-10 cursor-pointer hover:scale-110 transition-transform duration-300 bg-black-100 rounded-full p-2 border border-secondary"
          >
            <img
              src={publicUrls.socialProfiles[key].icon}
              alt={key}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>

      {/* Hire Me Button */}
      <div className="w-24 h-24 relative cursor-pointer" onClick={() => window.open(`mailto:${personalInfo.email}`)}>
        <div className="border-t-4 border-white border-solid rounded-full animate-spin absolute inset-0"></div>
        <div className="flex justify-center items-center absolute inset-2 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full shadow-lg shadow-violet-500/50">
          <span className="text-white text-[14px] font-bold text-center leading-tight">Hire<br />Me</span>
        </div>
      </div>
    </motion.div>
  );
};

export default HireMe;
