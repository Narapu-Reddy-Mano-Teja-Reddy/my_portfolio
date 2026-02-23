import React, { useState } from "react";
import { technologies } from "../constants";
import { BallCanvas } from "./canvas";

const Tech = () => {
  const [tooltipTexts, setTooltipTexts] = useState({});

  const handleMouseEnter = (index, name) => {
    setTooltipTexts({ [index]: name });
  };

  const handleMouseLeave = () => {
    setTooltipTexts({});
  };

  const handleTap = (index, name) => {
    setTooltipTexts((prev) =>
      prev[index] ? {} : { [index]: name }
    );
  };

  return (
    <div className="flex flex-row flex-wrap justify-center gap-8 sm:gap-10">
      {technologies.map((technology, index) => (
        <div
          className="w-20 h-20 sm:w-28 sm:h-28 mb-2 relative"
          key={technology.name}
          onMouseEnter={() => handleMouseEnter(index, technology.name)}
          onMouseLeave={handleMouseLeave}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleTap(index, technology.name);
          }}
        >
          <BallCanvas icon={technology.icon} />

          {tooltipTexts[index] && (
            <div className="absolute bg-black bg-opacity-80 text-white px-2 py-1 rounded text-xs sm:text-sm z-10 bottom-[105%] left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              {tooltipTexts[index]}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Tech;
