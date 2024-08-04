import React from "react";

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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">My Experiences</h2>
        <div className="space-y-8">
          {sortedExperiences.map((experience, index) => (
            <div key={index} className="bg-light-gray p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">
                {experience.fields.title}
              </h3>
              <p className="text-gray-600 mb-2">{experience.fields.company}</p>
              <p className="text-sm text-gray-500">
                {formatDate(experience.fields.startDate)}
                {experience.fields.endDate &&
                  ` - ${formatDate(experience.fields.endDate)}`}
                {!experience.fields.endDate &&
                  experience.fields.isOngoing &&
                  " - Present"}
              </p>
              {experience.fields.description && (
                <p className="mt-4 text-gray-700">
                  {experience.fields.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;
