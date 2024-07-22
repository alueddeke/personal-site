import React, { useState, useEffect, useRef } from "react";
import SkillsDropdown from "./SkillsDropdown";

const NavBar = ({ avatar, skills }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
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

  const linkClass = `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 
    ${isScrolled ? "text-dark-text" : "text-off-white"} 
    hover:underline hover:decoration-sky-blue hover:decoration-2 hover:underline-offset-4`;

  return (
    <nav
      className={`fixed w-full z-50 transition-colors duration-300 ${
        isScrolled ? "bg-off-white" : "bg-transparent"
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
    </nav>
  );
};

export default NavBar;
