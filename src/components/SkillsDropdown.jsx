import React from "react";

const SkillsDropdown = ({ skills, isVisible, onMouseEnter, onMouseLeave }) => {
  if (!isVisible) return null;

  return (
    <div
      className="absolute left-0 mt-2 bg-white rounded-md shadow-lg py-1 z-50 max-h-[80vh] overflow-y-auto w-screen max-w-[90vw] sm:max-w-[95vw] md:max-w-[70vw] lg:max-w-[60vw]"
      style={{ left: "50%", transform: "translateX(-50%)" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-2 p-4">
        {skills.map((skill, index) => (
          <p
            key={index}
            className="text-dark-text whitespace-nowrap group cursor-default"
          >
            <span className="group-hover:text-sky-blue transition-colors duration-200">
              {skill}
            </span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default SkillsDropdown;
