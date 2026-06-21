import React from "react";
import ReactMarkdown from "react-markdown";

const customRenderer = {
  a: ({ node, ...props }) => (
    <a
      {...props}
      className="text-white underline hover:text-zinc-300 transition-colors duration-300"
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.children}
    </a>
  ),
  ul: ({ node, ...props }) => (
    <ul className="list-disc list-inside mt-2 space-y-1" {...props} />
  ),
  li: ({ node, ...props }) => <li className="text-zinc-400" {...props} />,
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleString("default", { month: "long", year: "numeric" });
};

const scrollToProjects = () => {
  const el = document.getElementById("projects");
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const Experiences = ({ experiences }) => {
  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-zinc-950 border-t border-zinc-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          Experience
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {experiences.map((experience, index) => {
            const company = experience.fields.company || "";
            // SongScope experience links to the live project/demo in Projects.
            const linksToProjects = company.toLowerCase().includes("songscope");
            return (
              <div
                key={index}
                onClick={linksToProjects ? scrollToProjects : undefined}
                className={`bg-zinc-900 border border-zinc-800 p-6 rounded-lg shadow-lg ${
                  linksToProjects
                    ? "cursor-pointer hover:border-zinc-600 transition-colors"
                    : ""
                }`}
              >
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {experience.fields.title}
                </h3>
                <p className="text-zinc-400 mb-2">{company}</p>
                <p className="text-sm text-zinc-500">
                  {formatDate(experience.fields.startDate)}
                  {experience.fields.endDate &&
                    ` - ${formatDate(experience.fields.endDate)}`}
                  {!experience.fields.endDate &&
                    experience.fields.isOngoing &&
                    " - Present"}
                </p>
                {experience.fields.description && (
                  <div className="mt-4 text-zinc-400">
                    <ReactMarkdown components={customRenderer}>
                      {experience.fields.description}
                    </ReactMarkdown>
                  </div>
                )}
                {linksToProjects && (
                  <p className="mt-4 text-sm font-medium text-white">
                    → See the live project &amp; demo
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experiences;
