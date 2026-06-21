// src/components/Projects.jsx
import React from "react";
import ProjectCard from "./ProjectCard";
import { optimizedUrl } from "../utils/image";

function Projects({ projects, backgroundImage }) {
  if (!projects || projects.length === 0) {
    return <div>No projects available.</div>;
  }

  const backgroundUrl = optimizedUrl(backgroundImage, { w: 1920, q: 60 });
  const backgroundStyle = backgroundUrl
    ? {
        backgroundImage: `url(${backgroundUrl})`,
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
      <div className="absolute inset-0 bg-zinc-950/80"></div>
      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-white">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {projects.map((project) => (
            <ProjectCard key={project.sys.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
