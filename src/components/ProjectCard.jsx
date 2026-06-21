import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { optimizedUrl } from "../utils/image";

function ProjectCard({ project }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const hasUrl = Boolean(project.fields.projectUrl);
  const description = project.fields.description || "";
  // One-line impact = first sentence of the description.
  const impact = description.split(/\.\s/)[0].replace(/\.$/, "") + ".";

  const customRenderer = {
    a: ({ node, ...props }) => (
      <a
        {...props}
        className="text-white underline hover:text-zinc-300 transition-colors duration-300"
        onClick={(e) => e.stopPropagation()}
        target="_blank"
        rel="noopener noreferrer"
      >
        here
      </a>
    ),
    ul: ({ node, ...props }) => (
      <ul className="list-disc list-inside mt-2 space-y-1" {...props} />
    ),
    li: ({ node, ...props }) => <li className="text-zinc-400" {...props} />,
  };

  const cardContent = (
    <>
      <div className="p-5">
        {/* name */}
        <h3 className="text-xl font-semibold mb-2 text-white">
          {project.fields.title}
        </h3>
        {/* one-line impact */}
        <p className="text-zinc-400 mb-4 leading-relaxed">{impact}</p>
        {/* stack tags */}
        {project.fields.technologies && (
          <div className="mb-4 flex flex-wrap gap-2">
            {project.fields.technologies.map((tech, index) => (
              <span
                key={index}
                className="inline-block bg-zinc-800 border border-zinc-700 rounded-full px-3 py-1 text-xs font-medium text-zinc-200"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
      {/* image */}
      <div className="relative h-56 bg-zinc-800">
        {project.fields.thumbnail && project.fields.thumbnail.fields && (
          <img
            src={optimizedUrl(project.fields.thumbnail, { w: 800 })}
            alt={project.fields.title || "Project thumbnail"}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        )}
        {hasUrl && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-lg font-semibold">
              View Project
            </span>
          </div>
        )}
      </div>
      {/* expandable full description */}
      <div className="p-5">
        <div
          className={`text-zinc-400 ${isExpanded ? "" : "line-clamp-2"}`}
          onClick={toggleDescription}
        >
          <ReactMarkdown components={customRenderer}>
            {description}
          </ReactMarkdown>
        </div>
        <button
          onClick={toggleDescription}
          className="mt-3 text-sm text-white hover:text-zinc-300 transition-colors"
        >
          {isExpanded ? "Show less" : "Read more"}
        </button>
      </div>
    </>
  );

  const cardClasses = `project-card bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-[1.02] hover:border-zinc-600 block ${
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
