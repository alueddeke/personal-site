// src/components/Projects.jsx
import React from "react";
import ProjectCard from "./ProjectCard";

function Projects({ projects, backgroundImage }) {
  if (!projects || projects.length === 0) {
    return <div>No projects available.</div>;
  }

  const backgroundStyle = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage.fields.file.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : {};

  return (
    <section className="projects-section relative min-h-screen py-20 overflow-hidden">
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-md scale-110"
          style={backgroundStyle}
        ></div>
      )}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-white">
          Web Development Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.sys.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
