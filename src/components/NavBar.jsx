import React, { useState, useEffect, useRef } from "react";
import SkillsDropdown from "./SkillsDropdown";

const NavBar = ({ avatar, skills }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowSkills(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowSkills(false);
    }, 100);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const linkClass = `px-3 py-2 rounded-md text-sm font-medium text-white transition-colors duration-300
    hover:underline hover:decoration-white hover:decoration-2 hover:underline-offset-4`;

  return (
    <nav
      className={`fixed w-full z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                src={avatar.fields.file.url}
                alt="Avatar"
                className="h-10 w-10 rounded-full cursor-pointer"
                onClick={scrollToTop}
              />
            </div>
          </div>
          <button
            className="block md:hidden ml-auto p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button
                onClick={() => scrollToSection("about")}
                className={linkClass}
              >
                About Me
              </button>
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button className={linkClass}>Skills</button>
                <SkillsDropdown
                  skills={skills}
                  isVisible={showSkills}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
              <button
                onClick={() => scrollToSection("experiences")}
                className={linkClass}
              >
                Experiences
              </button>

              <button
                onClick={() => scrollToSection("music")}
                className={linkClass}
              >
                Music
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className={linkClass}
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className={linkClass}
              >
                Contact Me
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="block md:hidden bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800">
          <div className="flex flex-col px-4 py-2 space-y-1">
            <button onClick={() => { scrollToSection("about"); setIsMenuOpen(false); }} className={linkClass}>
              About Me
            </button>
            <button onClick={() => { scrollToSection("experiences"); setIsMenuOpen(false); }} className={linkClass}>
              Experiences
            </button>
            <button onClick={() => { scrollToSection("music"); setIsMenuOpen(false); }} className={linkClass}>
              Music
            </button>
            <button onClick={() => { scrollToSection("projects"); setIsMenuOpen(false); }} className={linkClass}>
              Projects
            </button>
            <button onClick={() => { scrollToSection("contact"); setIsMenuOpen(false); }} className={linkClass}>
              Contact Me
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
