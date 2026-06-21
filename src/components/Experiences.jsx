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

const Experiences = ({ experiences }) => {
  if (!experiences || experiences.length === 0) {
    return null;
  }

  // Sort experiences
  const sortedExperiences = [...experiences].sort((a, b) => {
    if (a.fields.isOngoing) return -1; // Ongoing experience comes first
    if (b.fields.isOngoing) return 1; // Ongoing experience comes first

    // Compare start dates
    const dateA = new Date(a.fields.startDate);
    const dateB = new Date(b.fields.startDate);
    return dateB - dateA; // Most recent first
  });

  return (
    <section className="py-16 bg-zinc-950 border-t border-zinc-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          Experience
        </h2>
        <div className="space-y-8 max-w-3xl mx-auto">
          {sortedExperiences.map((experience, index) => (
            <div
              key={index}
              className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2 text-white">
                {experience.fields.title}
              </h3>
              <p className="text-zinc-400 mb-2">{experience.fields.company}</p>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;
