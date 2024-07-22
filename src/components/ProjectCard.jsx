// src/components/ProjectCard.jsx
import React, { useState } from "react";

function ProjectCard({ project }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = (e) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  const hasUrl = Boolean(project.fields.projectUrl);

  const cardContent = (
    <>
      <div className="relative h-64">
        {project.fields.thumbnail && project.fields.thumbnail.fields && (
          <img
            src={project.fields.thumbnail.fields.file.url}
            alt={project.fields.title || "Project thumbnail"}
            className="w-full h-full object-cover"
          />
        )}
        {hasUrl && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-lg font-semibold">
              View Project
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{project.fields.title}</h3>
        <p
          className={`text-gray-600 mb-4 ${isExpanded ? "" : "line-clamp-3"}`}
          onClick={toggleDescription}
        >
          {project.fields.description}
        </p>
        {!isExpanded && (
          <button
            onClick={toggleDescription}
            className="text-sky-blue-500 hover:text-sky-blue-700 mb-4"
          >
            Read More
          </button>
        )}
        {project.fields.technologies && (
          <div className="mb-4">
            {project.fields.technologies.map((tech, index) => (
              <span
                key={index}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        {project.fields.date && (
          <p className="text-sm text-gray-500">
            Completed:{" "}
            {new Date(project.fields.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}
          </p>
        )}
      </div>
    </>
  );

  const cardClasses = `project-card bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 ${
    hasUrl ? "cursor-pointer" : ""
  }`;

  return hasUrl ? (
    <a
      href={project.fields.projectUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClasses}
    >
      {cardContent}
    </a>
  ) : (
    <div className={cardClasses}>{cardContent}</div>
  );
}

export default ProjectCard;
