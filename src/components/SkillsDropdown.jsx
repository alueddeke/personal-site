import React from "react";

const SkillsDropdown = ({ skills, isVisible, onMouseEnter, onMouseLeave }) => {
  const chunkArray = (arr, size) => {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
  };

  const skillColumns = chunkArray(skills || [], 4);

  if (!isVisible) return null;

  return (
    <div
      className="absolute left-0 mt-2 w-max bg-white rounded-md shadow-lg py-1 z-50"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex">
        {skillColumns.map((column, colIndex) => (
          <div key={colIndex} className="px-4 py-2">
            {column.map((skill, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default SkillsDropdown;
