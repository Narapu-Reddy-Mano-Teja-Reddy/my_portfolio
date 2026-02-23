import React, { useState, useEffect } from "react";
import { styles } from "../styles";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { close, logo, menu } from "../assets";
import {
  navLinks,
  navigationPaths,
  personalInfo,
  publicUrls,
} from "../constants";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // After navigating to home with a hash, scroll to the section
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, [location]);

  const handleSectionClick = (link) => {
    setActive(link.title);
    setToggle(false);
    if (location.pathname !== "/") {
      // Navigate home first, then scroll to section via hash
      navigate(`/#${link.id}`);
    } else {
      // Already on home — just scroll
      const el = document.getElementById(link.id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = () => {
    setActive("");
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isPageLink = (id) => id === "projects" || id === "certifications";

  return (
    <nav
      className={`${styles.paddingX} py-5 w-full flex items-center fixed top-0 z-20 bg-primary`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-2 bg-transparent border-none outline-none cursor-pointer"
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold">{personalInfo.name}</p>
        </button>

        {/* Desktop nav */}
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${active === link.title ? "text-white" : "text-secondary"
                } text-[18px] font-medium cursor-pointer hover:text-white`}
            >
              {isPageLink(link.id) ? (
                <Link
                  to={`/${link.id}`}
                  onClick={() => { setActive(link.title); setToggle(false); }}
                >
                  {link.title}
                </Link>
              ) : (
                <button
                  onClick={() => handleSectionClick(link)}
                  className="bg-transparent border-none outline-none cursor-pointer text-inherit text-[18px] font-medium hover:text-white"
                >
                  {link.title}
                </button>
              )}
            </li>
          ))}

          <li className="text-secondary text-[18px] font-medium cursor-pointer hover:text-white">
            <a
              href={publicUrls.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${!toggle ? "hidden" : "flex"
              } absolute top-20 right-0 black-gradient mx-4 my-2 p-6 rounded-xl z-10 min-w-[140px]`}
          >
            <ul className="list-none flex flex-col gap-4 justify-end items-start">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${active === link.title ? "text-white" : "text-secondary"
                    } text-[18px] font-medium cursor-pointer hover:text-white`}
                >
                  {isPageLink(link.id) ? (
                    <Link
                      to={`/${link.id}`}
                      onClick={() => { setActive(link.title); setToggle(false); }}
                    >
                      {link.title}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleSectionClick(link)}
                      className="bg-transparent border-none outline-none cursor-pointer text-inherit text-[18px] font-medium hover:text-white"
                    >
                      {link.title}
                    </button>
                  )}
                </li>
              ))}

              <li className="text-secondary text-[18px] font-medium cursor-pointer hover:text-white">
                <a
                  href={publicUrls.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
